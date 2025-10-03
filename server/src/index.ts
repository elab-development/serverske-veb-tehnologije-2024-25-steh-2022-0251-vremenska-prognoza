import cors from "cors";
import dotenv from "dotenv";
import express from "express";
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

app.use(express.json());
app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
