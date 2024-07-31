import React from "react";

const PersonalDetails = ({ resumeInfo }) => {
  return (
    <div className="pb-3">
      <h2 className="font-bold text-lg text-center uppercase">
        {resumeInfo?.firstName} {resumeInfo?.middleName} {resumeInfo?.lastName}{" "}
        | {resumeInfo?.rollNo}
      </h2>
      <h2 className="text-md text-center uppercase">
        {resumeInfo?.education[0].major}
      </h2>
      <p className="text-center text-md">
        {resumeInfo?.phone} {resumeInfo?.email} {resumeInfo?.linkedin}{" "}
        {resumeInfo?.github}
      </p>
    </div>
  );
};

export default PersonalDetails;
