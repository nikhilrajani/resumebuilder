import express from "express";
import connectToMongoDB from "./db.js";
import "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import Resume from "./models/resume.js";
configDotenv();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectToMongoDB();
const port = process.env.port;

app.get("/api", (req, res) => {
  res.json({ message: "Data Recieved Successfully!" });
});

app.post("/api/addResume", async (req, res) => {
  const { resumeId, title, email } = req.body;
  await Resume.create({
    resumeId,
    title,
    email,
  });

  res.json({ message: "Resume Added!" });
  res.status(200);
});

app.get("/api/getResumes", async (req, res) => {
  const email = req.query.email;
  const userResumes = await Resume.find({ email });
  console.log(userResumes);

  res.json({ resumes: userResumes });
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
