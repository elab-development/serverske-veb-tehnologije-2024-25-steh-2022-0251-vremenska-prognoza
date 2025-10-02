import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { DateFormatter } from "@/models/date-formatter";
import { ToastClass } from "@/models/toast-class";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface DataForecast {
  name: string;
  main: {
    [key: string]: number;
  };
  dt: number;
  wind: {
    [key: string]: number;
  };
  weather: {
    [key: string]: string;
  }[];
  coord: {
    lat: number;
    lon: number;
  };
  threeHourForecasts: any;
  temp_max: number;
  temp_min: number;
  day: Date;
}

type FullForecast = {
  now?: DataForecast | undefined;
  fiveDays?: DataForecast[] | undefined;
  name?: string;
};

const useForecast = () => {
  const [location, setLocation] = useState<string>("belgrade");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forecast, setForecast] = useState<FullForecast | undefined>({
    now: undefined,
    fiveDays: undefined,
    name: undefined,
  });
  const [dateTime, setDateTime] = useState<string>();

  useEffect(() => {
    let shouldChangeData = true;
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchFullForecast = async () => {
      setIsLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`,
          {
            signal,
          },
        )
        .then((res) => {
          const data = res.data;
          const fiveDaysForecast: DataForecast[] = [];
          const localTime = new Date();
          const localOffset = localTime.getTimezoneOffset() * 60000;
          const utcTime = localTime.getTime() + localOffset;
          const timezoneOffset = data.city.timezone * 1000;
          const formattedDestinationTime = new DateFormatter(
            new Date(utcTime + timezoneOffset),
          ).formatWithTime();

          for (let i = 0; i < 5; i++) {
            const dayForecast = data.list.slice(i * 8, (i + 1) * 8);
            fiveDaysForecast.push({
              ...data.list[i],
              threeHourForecasts: dayForecast,
              temp_max: Math.max(
                ...dayForecast.map((item: any) => item.main.temp_max),
              ),
              temp_min: Math.min(
                ...dayForecast.map((item: any) => item.main.temp_min),
              ),
              day: new Date(utcTime + timezoneOffset + i * 86400000),
            });
          }
          if (shouldChangeData) {
            setDateTime(formattedDestinationTime);
            setForecast({
              now: data.list[0],
              fiveDays: fiveDaysForecast,
              name: data.city.name,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          if (signal.aborted) {
            console.log("Request was aborted");
            return;
          }
          toast(
            ToastClass.create("destructive")
              .setTitle("Uh oh! Something went wrong.")
              .setDescription("Please check your location and try again.")
              .setAction(
                <ToastAction altText="Try again">Try again</ToastAction>,
              ),
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchFullForecast();

    return () => {
      shouldChangeData = false;
      controller.abort();
    };
  }, [location]);

  return { forecast, dateTime, isLoading, location, setLocation };
};

const forecastContext = createContext<
  ReturnType<typeof useForecast> | undefined
>(undefined);

export const ForecastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const forecast = useForecast();
  return (
    <forecastContext.Provider value={forecast}>
      {children}
    </forecastContext.Provider>
  );
};

export const useForecastContext = () => {
  const context = useContext(forecastContext);
  if (!context) {
    throw new Error("useForecast must be used within a ForecastProvider");
  }
  return context;
};
