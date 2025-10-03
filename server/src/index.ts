import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { auth } from "./controller/auth";
import errorHandler from "./middleware/error";
import favoritesRoutes from "./routes/favorites";
import newsRoutes from "./routes/news";
import passwordRoutes from "./routes/password";
import weatherRoutes from "./routes/weather";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/password", passwordRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
