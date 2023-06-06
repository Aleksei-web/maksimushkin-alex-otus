import express from "express";
import cors from "cors";
import { db } from "./db";
import * as dotenv from "dotenv";
import router from "./routes/quiz";

const PORT = 5555;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

db.connect(() => {
  console.log("DB connected");
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});