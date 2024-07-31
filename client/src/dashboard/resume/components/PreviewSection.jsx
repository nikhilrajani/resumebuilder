import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetails from "./preview/PersonalDetails";
import EducationDetails from "./preview/EducationDetails";
import InternshipDetails from "./preview/InternshipDetails";
import ProjectDetails from "./preview/ProjectDetails";
import CompetitionDetails from "./preview/CompetitionDetails";
import AwardsDetails from "./preview/AwardsDetails";
import SkillsDetails from "./preview/SkillsDetails";
import PORDetails from "./preview/PORDetails";
import CourseworkDetails from "./preview/CourseworkDetails";
import ExtraCurriculurDetails from "./preview/ExtraCurriculurDetails";

const PreviewSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="shadow-lg h-full p-7 border-t-[5px]">
      {/* Personal Details */}
      <PersonalDetails resumeInfo={resumeInfo} />
      {/* Education */}
      <EducationDetails resumeInfo={resumeInfo} />
      {/* Internships */}
      <InternshipDetails resumeInfo={resumeInfo} />
      {/* Projects */}
      <ProjectDetails resumeInfo={resumeInfo} />
      {/* Competition/Conference */}
      <CompetitionDetails resumeInfo={resumeInfo} />
      {/* Awards and Achievements */}
      <AwardsDetails resumeInfo={resumeInfo} />
      {/* Skills and Expertise */}
      <SkillsDetails resumeInfo={resumeInfo} />
      {/* Coursework */}
      <CourseworkDetails resumeInfo={resumeInfo} />
      {/* POR */}
      <PORDetails resumeInfo={resumeInfo} />
      {/* Extra Curricular */}
      <ExtraCurriculurDetails resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewSection;
