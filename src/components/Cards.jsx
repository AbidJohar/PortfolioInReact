/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ProjectsList } from "../data/ProjectsList";
import { useNavigate } from "react-router-dom";

function Cards({showAllProjects}) {
  const navigate = useNavigate();
  const projectsToDisplay = showAllProjects ? ProjectsList.projects :  ProjectsList.projects.slice(0, 6);

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {projectsToDisplay.map((project, index) => (
        <div
          key={index}
          className="group relative h-full bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl border border-gray-600 p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          onClick={() => handleCardClick(index)}
        >
          <div className="flex flex-col h-full justify-between">
            {/* Card Content */}
            <div>
              <h2 className="font-poppins text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {project.name}
              </h2>
              <p className="font-poppins text-sm text-gray-300 line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action (Always at Bottom) */}
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-semibold text-sm group-hover:underline">
                View Details
              </span>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
}

export default Cards;