import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCard = ({ resume }) => {
  return (
    <Link
      to={"/dashboard/resume/" + resume.resumeId + "/edit"}
      className="mt-10"
    >
      <div className="">
        <div className="bg-gradient-to-b from-primary via-purple-400 to-red-400 p-14 flex items-center justify-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary">
          <Notebook />
        </div>
      </div>
      <h2 className="text-center my-1">{resume.title}</h2>
    </Link>
  );
};

export default ResumeCard;
