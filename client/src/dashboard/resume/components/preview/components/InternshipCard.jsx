import React from "react";

const InternshipCard = ({ internship }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between font-bold text-md">
        <div>
          {internship.role} | {internship.companyName} | {internship.workplace}
        </div>
        <div>
          {internship.startDate} -{" "}
          {!internship.currentlyWorking ? `${internship.endDate}` : "Present"}
        </div>
      </div>
      <div className="text-md">
        {internship.workSummary.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default InternshipCard;
