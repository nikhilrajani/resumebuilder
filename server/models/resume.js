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
  firstName: {
    type: String,
    default: "",
  },
  middleName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  rollNo: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  education: [
    {
      id: {
        type: String,
        required: true,
      },
      institute: {
        type: String,
        required: true,
      },
      graduationYear: {
        type: String,
        default: "",
      },
      currentlyStudying: {
        type: Boolean,
        default: false,
      },
      degree: {
        type: String,
        default: "",
      },
      major: {
        type: String,
        default: "",
      },
      performance: {
        type: String,
        default: "",
      },
    },
  ],
  internships: [
    {
      id: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      workplace: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        default: "",
      },
      currentlyWorking: {
        type: Boolean,
        default: false,
      },
      workSummary: {
        type: String,
        required: true,
      },
    },
  ],
  projects: [
    {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      guidance: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        default: "",
      },
      currentlyWorking: {
        type: Boolean,
        default: false,
      },
      projectSummary: {
        type: String,
        required: true,
      },
    },
  ],
  competitions: {
    type: String,
    default: "",
  },
  awards: {
    type: String,
    default: "",
  },
  skills: {
    type: String,
    default: "",
  },
  coursework: {
    type: String,
    default: "",
  },
  por: [
    {
      id: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        default: "",
      },
      currentlyHolding: {
        type: Boolean,
        default: false,
      },
      workSummary: {
        type: String,
        required: true,
      },
    },
  ],
  extraCurricular: {
    type: String,
    default: "",
  },
  sequence: [
    {
      type: String,
      required: true,
    },
  ],
});

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;
