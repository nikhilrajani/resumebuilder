import React from "react";
import SectionHeader from "./components/SectionHeader";

const SkillsDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-[-5px]">
      <SectionHeader title={"Skills and Expertise"} />
      <div className="text-md">
        <div
          dangerouslySetInnerHTML={{ __html: resumeInfo.skills }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default SkillsDetails;
