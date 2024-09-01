import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-fit">
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
        <div
          dangerouslySetInnerHTML={{ __html: project.projectSummary }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
