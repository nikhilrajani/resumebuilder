import React from "react";
import SectionHeader from "./components/SectionHeader";
import PORCard from "./components/PORCard";

const PORDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-[-5px]">
      <SectionHeader title={"Positions of Responsibility"} />
      <div className="flex flex-col gap-2">
        {resumeInfo.por &&
          resumeInfo.por.map((post, index) => (
            <PORCard post={post} key={index} />
          ))}
      </div>
    </div>
  );
};

export default PORDetails;
