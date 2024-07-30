import { mongoose } from "mongoose";

const resumeSchema = new mongoose.Schema({
  resumeId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;
