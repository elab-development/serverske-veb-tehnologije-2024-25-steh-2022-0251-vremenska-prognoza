import { Toaster } from "@/components/ui/toaster";
import { useForecastContext } from "@/hooks/useForecast";
import { useRef } from "react";
import Card from "./Card";
import HeroLoading from "./HeroLoading";
import HeroSearch from "./HeroSearch";

const Hero = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setLocation, forecast, dateTime, isLoading } = useForecastContext();
  const forecastData = forecast?.now;
  const forecast5days = forecast?.fiveDays;
  return (
    <div className="mx-auto max-w-[600px]">
      <HeroSearch setLocation={setLocation} inputRef={inputRef} />
      {isLoading ? (
        <HeroLoading />
      ) : (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold">{forecast?.name}</h2>
          <hr className="my-4" />
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
            <div className="order-2 flex items-center gap-2 sm:order-1">
              <img
                className="sm:mt-1"
                height={100}
                width={100}
                src={`http://openweathermap.org/img/wn/${forecastData?.weather[0]?.icon}@2x.png`}
                alt="Weather icon"
                decoding="async"
              />
              {forecastData && (
                <div className="flex items-start gap-6">
                  <p className="flex items-start text-5xl font-semibold">
                    {forecastData?.main.temp.toFixed()}
                    <span className="text-base">°C</span>
                  </p>
                  <div className="flex flex-col text-foreground/50">
                    <p className="text-sm">
                      Humidity: {forecastData?.main.humidity}%
                    </p>{" "}
                    <p className="text-sm">
                      Feels like: {forecastData?.main.feels_like}°C
                    </p>
                    <p className="text-sm">
                      Wind: {forecastData?.wind.speed} km/h
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="order-1 flex flex-col justify-center sm:order-2">
              <p className="text-2xl">Weather</p>
              <p className="text-sm text-foreground/50">{dateTime}</p>
              <p className="text-sm capitalize text-foreground/50">
                {forecastData?.weather[0].description}
              </p>
            </div>
          </div>
          <h2 className="mt-10 text-xl font-semibold">
            5-Day Weather Forecast
          </h2>
          <hr className="my-4 border-accent/20" />
          <div className="scrollbar flex w-full gap-4 overflow-x-auto">
            {forecast5days?.map((day, index) => {
              return <Card key={index} day={day} index={index} />;
            })}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Hero;
