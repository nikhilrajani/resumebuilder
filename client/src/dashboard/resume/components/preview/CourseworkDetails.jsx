import React from "react";
import SectionHeader from "./components/SectionHeader";

const CourseworkDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Coursework Information"} />
      <div>{resumeInfo.coursework}</div>
    </div>
  );
};

export default CourseworkDetails;
