import React from "react";
import SectionHeader from "./components/SectionHeader";

const AwardsDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-[-5px]">
      <SectionHeader title={"Awards and Achievements"} />
      <div className="text-md">
        <div
          dangerouslySetInnerHTML={{ __html: resumeInfo.awards }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default AwardsDetails;
