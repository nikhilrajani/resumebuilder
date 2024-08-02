import React from "react";
import SectionHeader from "./components/SectionHeader";

const CompetitionDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Competition/Conference"} />
      <div className="text-md">
        {resumeInfo.competitions &&
          resumeInfo.competitions
            .split("\n")
            .map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </div>
  );
};

export default CompetitionDetails;
