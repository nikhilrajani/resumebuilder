import React from "react";
import SectionHeader from "./components/SectionHeader";

const CourseworkDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-[-5px]">
      <SectionHeader title={"Coursework Information"} />
      <div className="text-md">
        <div
          dangerouslySetInnerHTML={{ __html: resumeInfo.coursework }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default CourseworkDetails;
