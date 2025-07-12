/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectsList } from "../data/ProjectsList";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = ProjectsList.projects[projectId];

  const hasImages = project?.images && project.images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[80%] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:underline flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </button>

        {/* Project Header */}
        <h1 className="font-poppins text-3xl lg:text-4xl font-bold text-white mb-6">
          {project.name}
        </h1>

        {/* Project Image Slider */}
          <h2 className="text-2xl font-semibold text-white mb-4">Project Pages</h2>
        {hasImages && (
          <div className="relative w-full h-64 sm:h-full mb-8 rounded-lg overflow-hidden shadow-lg">

            <img
              src={project.images[currentIndex]}
              alt={`${project.name} screenshot ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-2 rounded-full hover:bg-opacity-70"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-2 rounded-full hover:bg-opacity-70"
            >
              ▶
            </button>
          </div>
        )}

        {/* Project Description */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
          <p className="font-poppins text-gray-300 leading-relaxed text-justify whitespace-pre-line break-words">
            {project.description}
          </p>
        </div>

        {/* Technologies Used */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Features */}
        {project.features && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Repository Link */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Project Repository</h2>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            Visit on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
