import React from "react";
import SectionHeader from "./components/SectionHeader";

const CompetitionDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-[-5px]">
      <SectionHeader title={"Competition/Conference"} />
      <div className="text-md">
        <div
          dangerouslySetInnerHTML={{ __html: resumeInfo.competitions }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default CompetitionDetails;
