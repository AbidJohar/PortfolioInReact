import React, { useState } from "react";
import { ProjectsList } from "../data/ProjectsList";

function Cards() {
  const [showFullDescription, setShowFullDescription] = useState(null);
  const projectsToDisplay = ProjectsList.projects.slice(0, 4);

  const toggleDescription = (index) => {
    console.log("clicking description", index);

    setShowFullDescription(index === showFullDescription ? null : index);
  };

  return (
    <>
      {projectsToDisplay.map((project, index) => (
        <div
          key={index}
          className="mb-8 flex h-auto flex-col items-start justify-between  rounded-lg border-[1px] border-white bg-transparent p-4 shadow-md hover:shadow-white/60 "
        >
          <div>
            <h2 className="font-poppins mb-2 cursor-pointer text-base font-semibold lg:text-xl">
              {project.name}
            </h2>
            <p className="font-poppins text-sm text-white">
              {showFullDescription === index
                ? project.description
                : project.description.substring(0, 520)}
              <span
                className="ml-[5px] cursor-pointer"
                onClick={() => toggleDescription(index)}
              ></span>
            </p>
          </div>
          <div className="mt-3 flex flex-wrap lg:mt-6">
            {project.technologies.map((tech, index) => (
              <p
                key={index}
                className="mb-2 mr-2 inline-block rounded-full border border-white bg-transparent px-3 py-1 text-sm font-semibold text-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              >
                {tech}
              </p>
            ))}
           <div className="w-full mt-3">
  <a
    href={project.link}
    className="text-white px-4 py-2 rounded shadow-lg border-[1px] border-white bg-transparent transition-all duration-700   hover:shadow-[2px_3px_whitesmoke] hover:-translate-y-2"
  >
    Repository
  </a>
</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Cards;
