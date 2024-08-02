import React from "react";
import SectionHeader from "./components/SectionHeader";

const ExtraCurriculurDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Extra Curricular Activities"} />
      {resumeInfo.extraCurricular &&
        resumeInfo.extraCurricular
          .split("\n")
          .map((line, index) => <p key={index}>{line}</p>)}
    </div>
  );
};

export default ExtraCurriculurDetails;
