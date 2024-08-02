import React from "react";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";

const ProjectDetails = ({ resumeInfo }) => {
  return (
    <div className="mt-1">
      <SectionHeader title={"Projects"} />
      <div className="flex flex-col gap-2">
        {resumeInfo.projects &&
          resumeInfo?.projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
