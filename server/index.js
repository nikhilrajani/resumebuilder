import express from "express";
import connectToMongoDB from "./db.js";
import "dotenv";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
connectToMongoDB();
const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
