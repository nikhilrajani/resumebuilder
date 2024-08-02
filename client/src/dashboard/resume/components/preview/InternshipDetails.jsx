import React from "react";
import SectionHeader from "./components/SectionHeader";
import InternshipCard from "./components/InternshipCard";

const InternshipDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Internships"} />
      <div className="flex flex-col gap-2">
        {resumeInfo.internships &&
          resumeInfo?.internships.map((internship, index) => (
            <InternshipCard internship={internship} key={index} />
          ))}
      </div>
    </div>
  );
};

export default InternshipDetails;
