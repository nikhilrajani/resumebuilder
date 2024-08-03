import React from "react";
import SectionHeader from "./components/SectionHeader";

const ExtraCurriculurDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-[-5px]">
      <SectionHeader title={"Extra Curricular Activities"} />
      <div className="text-md">
        <div
          dangerouslySetInnerHTML={{ __html: resumeInfo.extraCurricular }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default ExtraCurriculurDetails;
