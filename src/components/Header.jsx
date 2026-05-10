import { useEffect, useState } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { UserData } from "../data/UserData";

const Header = () => {
  const [isScrolling, setisScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("Home-section");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const { resumeUrl } = UserData;

  useEffect(() => {
    const handleScroll = () => {
      setisScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Only update spy, don't manually register "begin" events 
    // that force re-renders during animation
    scrollSpy.update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0  z-50 flex w-full  bg-blue-950    items-center justify-between text-base transition-all  sm:px-4 lg:px-90  lg:top-6 lg:left-[16rem] lg:w-[635px] lg:px-2 lg:bg-white/5 lg:backdrop-blur-xl lg:border lg:border-white/20  lg:py-1.5 lg:rounded-full    xl:left-[34rem] 
      `}
    >
      <div className="cursor-none lg:hidden">
        <h3 className=" py-3 pl-6 text-2xl sm:text-3xl tracking-wider text-white font-RocketBrush">Portfolio</h3>
      </div>
      <nav className="hidden lg:block ">
        <div className="cursor-pointer items-center  justify-center space-x-2 sm:flex sm:flex-col   sm:gap-4 lg:flex lg:flex-row lg:gap-3">
          {[
            { id: "Home-section", label: "Home", offset: -250 },
            { id: "About-section", label: "About", offset: -150 },
            { id: "Experience-section", label: "Experience", offset: 50 },
            { id: "Project-section", label: "Projects", offset: -150 },
            { id: "Contact-section", label: "Contact", offset: 50 },
          ].map((item) => (
            <Link
              key={item.id}
              activeClass="active"
              spy={true}
              smooth={true}
              offset={item.offset}
              duration={500}
              to={item.id}
              isDynamic={true}
              onSetActive={() => setActiveSection(item.id)}
              className="relative group "
            >
              <p
                className={`
            px-3 py-1.5 rounded-full transition-all duration-300 ease-out text-md tracking-widest uppercase font-medium 
            ${activeSection === item.id
                    ? "text-white  bg-[#21302E]  tracking-normal  "
                    : "text-white hover:text-white hover:bg-[#21302E] border border-transparent"
                  }
          `}
              >
                {item.label}
              </p>


            </Link>
          ))}
        </div>
      </nav>


      {/* ── Mobile menu toggle button ── */}
      <div className="lg:hidden flex justify-end flex-1  ">
        <button className="mr-5 block text-white hover:text-gray-400 focus:outline-none" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <CgClose size={32} /> : <CgMenuRight size={32} />}
        </button>
      </div>

      {/* ── Mobile nav panel — slides in from right ── */}
      <div style={{ perspective: '1200px', perspectiveOrigin: 'right center' }}>
        {/* bg-[#16161f] */}
        <nav
          className={`
      fixed top-7 -right-4 h-screen w-56
      border-l-2 border-white/90
      bg-black/85
      flex flex-col py-5
      z-50 lg:hidden
      origin-right
      transition-transform duration-1000
      [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]
      ${mobileMenuOpen ? "[transform:rotateY(0deg)]" : "[transform:rotateY(-100deg)]"}
    `}
        >
          {/* Door knob — vertical center on left edge */}
          <div className="absolute left-4 top-[45%] -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
            <div className="w-px h-5 bg-white/90 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-white/70 border border-white/25" />
            <div className="w-px h-5 bg-white/90 rounded-full" />
          </div>

          {/* Hinge marks on left edge */}
          <div className="absolute left-0 top-[45%] -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
            <div className="w-1 h-6 bg-white/90 rounded-r-sm" />
            <div className="w-1 h-6 bg-white/90 rounded-r-sm" />
          </div>

          <div className="flex flex-col   items-center  justify-center h-full space-y-6 py-4">
            <Link activeClass="active" spy={true} smooth={true} offset={-250} duration={500} to="Home-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Home-section" ? "active" : "text-white hover:text-gray-400"}>Home</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={-150} duration={500} to="About-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "About-section" ? "active" : "text-white hover:text-gray-400"}>About</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={50} duration={500} to="Contact-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Experience-section" ? "active" : "text-white hover:text-gray-400"}>Experience</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={-150} duration={500} to="Project-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Project-section" ? "active" : "text-white hover:text-gray-400"}>Projects</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={50} duration={500} to="Contact-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Contact-section" ? "active" : "text-white hover:text-gray-400"}>Contact</p>
            </Link>

            <div>
              <button onClick={() => window.open(resumeUrl)} className="border border-white button-UI rounded-full px-4 py-1.5 font-bold tracking-wider text-white shadow-xl hover:bg-gray-400 hover:text-black">Resume</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
