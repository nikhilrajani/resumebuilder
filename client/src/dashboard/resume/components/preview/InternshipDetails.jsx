import React from "react";
import SectionHeader from "./components/SectionHeader";
import InternshipCard from "./components/InternshipCard";

const InternshipDetails = ({ resumeInfo }) => {
  return (
    <div>
      <SectionHeader title={"Internships"} />
      <div className="flex flex-col">
        {resumeInfo.internships &&
          resumeInfo?.internships.map((internship, index) => {
            return (
              <div>
                <InternshipCard internship={internship} key={index} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default InternshipDetails;
