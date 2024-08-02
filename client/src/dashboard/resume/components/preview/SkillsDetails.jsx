import React from "react";
import SectionHeader from "./components/SectionHeader";

const SkillsDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Skills and Expertise"} />
      <div className="text-md">
        {resumeInfo.skills &&
          resumeInfo.skills
            .split("\n")
            .map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </div>
  );
};

export default SkillsDetails;
