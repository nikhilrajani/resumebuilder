import React from "react";
import SectionHeader from "./components/SectionHeader";

const ExtraCurriculurDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Extra Curriculur Activities"} />
      <div>
        {resumeInfo.extraCurriculur.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default ExtraCurriculurDetails;
