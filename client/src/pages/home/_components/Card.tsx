import { DataForecast } from "@/hooks/useForecast";

const Card = ({ day, index }: { day: DataForecast; index: number }) => {
  return (
    <div
      key={index}
      className="flex w-full min-w-max flex-col items-center rounded-xl border px-4 py-4 sm:px-0"
    >
      <p>{day.day.toLocaleDateString("en-US", { weekday: "short" })}</p>
      <img
        className="mt-1"
        width={50}
        height={50}
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        alt="Weather icon"
      />

      <p className="flex items-center gap-1 text-sm">
        {day.temp_max.toFixed()}°
        <span className="text-foreground/50">{day.temp_min.toFixed()}°</span>
      </p>
    </div>
  );
};

export default Card;
