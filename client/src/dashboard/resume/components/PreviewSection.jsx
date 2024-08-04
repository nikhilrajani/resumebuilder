import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect } from "react";
import PersonalDetails from "./preview/PersonalDetails";
import EducationDetails from "./preview/EducationDetails";
import InternshipDetails from "./preview/InternshipDetails";
import ProjectDetails from "./preview/ProjectDetails";
import CompetitionDetails from "./preview/CompetitionDetails";
import AwardsDetails from "./preview/AwardsDetails";
import SkillsDetails from "./preview/SkillsDetails";
import PORDetails from "./preview/PORDetails";
import CourseworkDetails from "./preview/CourseworkDetails";
import ExtraCurricularDetails from "./preview/ExtraCurricularDetails";

const PreviewSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const sections = {
    Internships: <InternshipDetails resumeInfo={resumeInfo} />,
    Projects: <ProjectDetails resumeInfo={resumeInfo} />,
    Competitions: <CompetitionDetails resumeInfo={resumeInfo} />,
    Awards: <AwardsDetails resumeInfo={resumeInfo} />,
    Skills: <SkillsDetails resumeInfo={resumeInfo} />,
    Coursework: <CourseworkDetails resumeInfo={resumeInfo} />,
    POR: <PORDetails resumeInfo={resumeInfo} />,
    "Extra Curricular": <ExtraCurricularDetails resumeInfo={resumeInfo} />,
  };

  return (
    <div>
      {/* Personal Details */}
      <PersonalDetails resumeInfo={resumeInfo} />
      {/* Education */}
      <EducationDetails resumeInfo={resumeInfo} />

      {/* sections */}
      {resumeInfo.sequence.map((item, index) => {
        const renderSection = sections[item];
        return <div key={index}>{renderSection}</div>;
      })}

      {/* Internships */}
      {/* <InternshipDetails resumeInfo={resumeInfo} /> */}
      {/* Projects */}
      {/* <ProjectDetails resumeInfo={resumeInfo} /> */}
      {/* Competition/Conference */}
      {/* <CompetitionDetails resumeInfo={resumeInfo} /> */}
      {/* Awards and Achievements */}
      {/* <AwardsDetails resumeInfo={resumeInfo} /> */}
      {/* Skills and Expertise */}
      {/* <SkillsDetails resumeInfo={resumeInfo} /> */}
      {/* Coursework */}
      {/* <CourseworkDetails resumeInfo={resumeInfo} /> */}
      {/* POR */}
      {/* <PORDetails resumeInfo={resumeInfo} /> */}
      {/* Extra Curricular */}
      {/* <ExtraCurricularDetails resumeInfo={resumeInfo} /> */}
    </div>
  );
};

export default PreviewSection;
