import React from "react";
import SectionHeader from "./components/SectionHeader";

const AwardsDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Awards and Achievements"} />
      <div className="text-md">
        {resumeInfo.awards.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AwardsDetails;
