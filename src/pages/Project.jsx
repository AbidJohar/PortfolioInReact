import Cards from "../components/Cards";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen  py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-poppins text-3xl sm:text-4xl font-bold text-center text-white tracking-wider mb-10">
          Projects
        </h3>
        <div className="w-full">
          <Cards />
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