import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between font-bold text-md">
        <div>
          {project.title} | {project.guidance}
        </div>
        <div>
          {project.startDate} -{" "}
          {!project.currentlyWorking ? `${project.endDate}` : "Present"}
        </div>
      </div>
      <div className="text-md">
        {project.projectSummary.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
