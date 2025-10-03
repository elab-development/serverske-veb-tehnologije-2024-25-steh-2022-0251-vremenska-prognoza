import axios from "axios";
import { NextFunction, Request, Response } from "express";

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const location = req.query.location as string;

  if (!location) {
    return res.status(400).send({ error: "Location is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.WEATHER_API}`
    );
    const data = response.data;
    res.send(data);
  } catch (error) {
    next(error);
  }
};
