/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectsList } from "../data/ProjectsList";
import { motion, AnimatePresence } from "framer-motion";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = ProjectsList.projects[projectId];

  const hasImages = project?.images && project.images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen items-center justify-center bg-gray-900"
      >
        <div className="text-center">
          <h2 className="font-poppins mb-6 text-3xl font-bold text-white">
            Project Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" bg-gray-900 px-4 py-16 sm:px-6 lg:px-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-400 transition-colors hover:text-blue-300"
        >
          <svg
            className="mr-2 h-6 w-6"
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
        </motion.button>

        {/* Project Header */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-poppins mb-8 text-2xl font-bold text-white lg:text-4xl"
        >
          {project.name}
        </motion.h1>

        {/* Image Carousel */}
        {hasImages && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-effect relative mb-8 overflow-hidden rounded-xl border-2 border-blue-600 shadow-sm"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={project.images[currentIndex]}
                alt={`${project.name} screenshot ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-[400px]  object-contain lg:h-[550px]"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(37, 99, 235, 0.7)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="glow-button rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
              >
                ◀ Prev
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(37, 99, 235, 0.7)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="glow-button rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
              >
                Next ▶
              </motion.button>
            </div>
            <div className="absolute inset-x-0 top-0 flex justify-center p-4">
              <div className="flex space-x-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      currentIndex === index
                        ? "glow-dot bg-blue-400"
                        : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 rounded-xl bg-gray-800 p-8 shadow-lg"
        >
          <h2 className="font-poppins mb-4 text-2xl font-semibold text-white">
            Project Overview
          </h2>
          <p className="font-poppins text-justify leading-relaxed text-gray-300">
            {project.description}
          </p>
        </motion.div>

        {/* Technologies Used */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 rounded-xl bg-gray-800 p-8 shadow-lg"
        >
          <h2 className="font-poppins mb-4 text-2xl font-semibold text-white">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Project Features */}
        {project.features && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 rounded-xl bg-gray-800 p-8 shadow-lg"
          >
            <h2 className="font-poppins mb-4 text-2xl font-semibold text-white">
              Key Features
            </h2>
            <ul className="list-inside list-disc space-y-3 text-gray-300">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Repository Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-xl bg-gray-800 p-8 shadow-lg"
        >
          <h2 className="font-poppins mb-4 text-2xl font-semibold text-white">
            Project Repository
          </h2>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Visit on GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectDetail;
