import Cards from "../components/Cards";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProjectsList } from "../data/ProjectsList";

function Project() {
  const navigate = useNavigate();
  const featuredProjects = ProjectsList.projects.slice(0, 4);

  return (
    <div className="w-full min-h-screen md:mt-10  py-6">
      <div className="max-w-7xl mx-auto px-8 sm:px-[5rem] ">
        <h3 className="font-RocketBrush text-3xl sm:text-5xl  font-bold text-start text-white tracking-wider mb-8 ">
          MY WORKS
        </h3>
        <div className="w-full">
          <Cards projects={featuredProjects} />
        </div>
        <div className="mt-8 flex justify-center">
          <p
            className="flex cursor-pointer items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors"
            onClick={() => navigate("/projectlist")}
          >
            <span className="font-poppins relative group">
              View Full Project Archive
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </span>
            <FaLocationArrow />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Project;