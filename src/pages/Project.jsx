import Cards from "../components/Cards";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();
  return (
    <div className="mb-24 h-auto w-full sm:mb-0 md:h-screen">
      <div>
        <h3 className="font-poppins mx-auto w-[50%] pb-10 pt-8 font-bold text-center text-4xl tracking-wider text-white lg:text-4xl">
          Projects
        </h3>
      </div>
      <div className="mx-auto mb-2 grid w-[90%] grid-cols-1 gap-4 sm:mb-8 md:grid-cols-2">
        <Cards />
      </div>
      
      <div className="mx-auto w-[90%]">
        <p className="flex cursor-pointer items-center gap-2 font-semibold leading-tight text-white">
          <div
            className="font-poppins group relative"
            onClick={() => {
              navigate("/projectlist");
            }}
          >
            <span>View Full Project Archive</span>
            <span className="absolute bottom-0 left-0 top-6 h-[2px] w-full bg-white opacity-0 transition-opacity group-hover:opacity-100"></span>
          </div>
          <FaLocationArrow />
        </p>
      </div>
      
    </div>
  );
}

export default Project;
