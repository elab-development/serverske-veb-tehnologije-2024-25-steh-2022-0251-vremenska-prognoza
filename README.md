# WeatherApp - STEH

WeatherApp is a modern web application that provides users with accurate and up-to-date weather information.

The application allows users to quickly and easily get detailed forecasts, including temperature, humidity, pressure, and other relevant meteorological data, as well as a 5-day forecast.

In addition to weather forecasts, the application includes a page with the latest news from the world of meteorology, allowing users to stay informed about the latest events and research. Each news item has its own detailed page where users can read more about selected topics.

Users also have the option to personalize the appearance of the application by choosing between light and dark themes, providing a better user experience.

The [OpenWeatherMap](https://openweathermap.org) API was used to create this application.

## Local Development Setup

1. Clone the repository

```bash
git clone https://github.com/elab-development/serverske-veb-tehnologije-2024-25-steh-2022-0251-vremenska-prognoza.git

cd serverske-veb-tehnologije-2024-25-steh-2022-0251-vremenska-prognoza
```

2. Install dependencies

```bash
pnpm install
```

3. Configure environment variables

```shell
# client/.env
BETTER_AUTH_SECRET=better_auth_secret
BETTER_AUTH_URL=http://localhost:5173
VITE_SERVER_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
VITE_CLOUDINARY_PRESET=cloudinary_preset
VITE_CLOUDINARY_URL=cloudinary_url
```

```shell
# server/.env
WEATHER_API=weather_api
BETTER_AUTH_SECRET=better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
DATABASE_HOST=localhost
DATABASE_USER=db_user
DATABASE_NAME=db_name
DATABASE_PASSWORD=db_password
DATABASE_URL=db_url
PORT=3000
ETHEREAL_USERNAME=ethereal_username
ETHEREAL_PASSWORD=ethereal_password
```

4. Start the development servers

```bash
cd server
pnpm dev
```

```bash
cd client
pnpm dev
```
