import React from "react";
import SectionHeader from "./components/SectionHeader";

const EducationDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Education"} />
      <table className="w-full">
        <thead className="font-bold">
          <tr className="flex justify-between items-start">
            <div className="flex flex-row gap-5 w-full">
              <td>Year</td>
              <td>Degree/Exam</td>
            </div>
            <div className="flex justify-between items-start w-full">
              <td>Institute</td>
              <td>CGPA/Marks</td>
            </div>
          </tr>
        </thead>
        <tbody>
          {resumeInfo?.education.map((education, index) => (
            <tr key={index} className="flex justify-between">
              <div className="flex flex-row gap-5 w-full">
                <td>{education.graduationYear}</td>
                <td>{education.degree}</td>
              </div>
              <div className="flex justify-between items-start w-full">
                <td>{education.institute}</td>
                <td>{education.performance}</td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EducationDetails;
