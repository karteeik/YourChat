import express from "express";
import { botMessage } from "../controllers/bot.controller.js";

export const router = express.Router();

router.post("/message", botMessage);
