import express from "express";
import dotenv from "dotenv";
import { router as botRoute } from "./routes/bot.route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/bot/v1", botRoute);

export default app;
