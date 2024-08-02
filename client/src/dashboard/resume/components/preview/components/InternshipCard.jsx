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
        <div
          dangerouslySetInnerHTML={{ __html: internship.workSummary }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default InternshipCard;
