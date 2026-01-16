import express from "express";
import cors from "cors";
import { getItems, SSE } from "./controller/controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", SSE);

app.get("/items",getItems)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
export default app;
