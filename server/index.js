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
const port = process.env.PORT;

app.get("/api", (req, res) => {
  res.json({ message: "Data Recieved Successfully!" });
});

app.post("/api/addResume", async (req, res) => {
  const { resumeId, title, email } = req.body;
  const firstEducation = {
    id: 1,
    institute: "IIT Kharagpur",
    graduationYear: "",
    currentlyStudying: false,
    degree: "",
    major: "",
    performance: "",
  };
  const education = [];
  education.push(firstEducation);

  const sequence = [
    "Internships",
    "Projects",
    "Competitions",
    "Awards",
    "Skills",
    "Coursework",
    "POR",
    "Extra Curricular",
  ];

  await Resume.create({
    resumeId,
    title,
    email,
    education,
    sequence,
  });

  res.json({ message: "Resume Added!" });
  res.status(200);
});

app.get("/api/getResumes", async (req, res) => {
  const email = req.query.email;
  const userResumes = await Resume.find({ email });

  res.json({ resumes: userResumes });
  res.status(200);
});

app.get("/api/getResume", async (req, res) => {
  const resumeId = req.query.resumeId;
  const resumesFound = await Resume.find({ resumeId });
  const resumeFound = resumesFound[0];

  res.json({ resume: resumeFound });
  res.status(200);
});

app.put("/api/saveResume", async (req, res) => {
  const { resume } = req.body;

  await Resume.replaceOne({ resumeId: resume.resumeId }, resume);

  res.json({ message: "Resume Updated!" });
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
