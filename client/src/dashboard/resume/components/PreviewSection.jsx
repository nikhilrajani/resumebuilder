import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetails from "./preview/PersonalDetails";
import EducationDetails from "./preview/EducationDetails";
import InternshipDetails from "./preview/InternshipDetails";

const PreviewSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="shadow-lg h-full py-14 px-7 border-t-[5px]">
      {/* Personal Details */}
      <PersonalDetails resumeInfo={resumeInfo} />
      {/* Education */}
      <EducationDetails resumeInfo={resumeInfo} />
      {/* Internships */}
      <InternshipDetails resumeInfo={resumeInfo} />
      {/* Projects */}
      {/* Competition/Conference */}
      {/* Awards and Achievements */}
      {/* Skills and Expertise */}
      {/* Coursework */}
      {/* POR */}
      {/* Extra Curricular */}
    </div>
  );
};

export default PreviewSection;
