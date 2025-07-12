/* eslint-disable no-unused-vars */
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import  Cards from '../components/Cards';

function ArchiveProjects() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Portfolio Link */}
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-blue-400 cursor-pointer mb-8 lg:mb-10"
        >
          <FaArrowLeft />
          <span className="font-poppins font-semibold">Back to Portfolio</span>
        </div>

        {/* Heading */}
        <div className="flex justify-center mb-8">
          <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-white tracking-wider text-center">
            All Projects
          </h1>
        </div>

        {/* Cards Component */}
        <Cards showAllProjects={true} />
      </div>
    </div>
  );
}

export default ArchiveProjects;