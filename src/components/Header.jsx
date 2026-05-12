import { useEffect, useRef, useState } from "react";
import { Link, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { UserData } from "../data/UserData";

const Header = () => {
  const [isScrolling, setisScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("Home-section");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSectionRef = useRef("Home-section");
  const { resumeUrl } = UserData;

  const navItems = [
    { id: "Home-section", label: "Home", offset: -250 },
    { id: "About-section", label: "About", offset: -150 },
    { id: "Experience-section", label: "Experience", offset: 50 },
    { id: "Project-section", label: "Projects", offset: -150 },
    { id: "Contact-section", label: "Contact", offset: 50 },
  ];

  // ___________( Show navbar on first load )_____________
  useEffect(() => {
    const mountTimer = setTimeout(() => setisScrolling(true), 100);
    return () => clearTimeout(mountTimer);
  }, []);

  // ___________( Navbar peek logic )_____________

  useEffect(() => {
    let hideTimer = null;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      if (activeSectionRef.current === "Home-section") {
        setisScrolling(true);
        clearTimeout(hideTimer);
        return;
      }

      setisScrolling(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setisScrolling(false), 2000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollSpy.update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimer);
    };
  }, []);

  // ___________( Force Contact active when scrolled to bottom )_____________
   
  useEffect(() => {
    const handleBottom = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + innerHeight >= docHeight - 10) {
        setActiveSection("Contact-section");
        activeSectionRef.current = "Contact-section";
      }
    };

    window.addEventListener("scroll", handleBottom, { passive: true });
    return () => window.removeEventListener("scroll", handleBottom);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      className={`fixed top-0 z-50 flex w-full bg-blue-950 items-center justify-between text-base transition-all sm:px-4 lg:px-90 lg:top-6 lg:left-[16rem] lg:w-[635px] lg:px-2 lg:bg-white/5 lg:backdrop-blur-xl lg:border lg:border-white/20 lg:py-1.5 lg:rounded-full xl:left-[34rem]
        ${isScrolling ? "lg:translate-y-0 lg:opacity-100" : "lg:-translate-y-full lg:opacity-0"}
      `}
    >
      <div className="cursor-none lg:hidden">
        <h3 className="py-2 pl-6 mt-3 text-2xl sm:text-3xl tracking-wider text-white font-RocketBrush">
          Portfolio
        </h3>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block">
        <div className="cursor-pointer items-center justify-center space-x-2 sm:flex sm:flex-col sm:gap-4 lg:flex lg:flex-row lg:gap-3">
          {navItems.map((item) => (
            <Link
              key={item.id}
              spy={true}
              smooth={true}
              offset={item.offset}
              duration={500}
              to={item.id}
              isDynamic={true}
              onSetActive={() => {
                setActiveSection(item.id);
                activeSectionRef.current = item.id;
              }}
              className="relative group"
            >
              <p
                className={`px-3 py-1.5 rounded-full transition-all border border-transparent duration-300 ease-out text-md tracking-widest uppercase font-medium
                  ${activeSection === item.id
                    ? "text-white bg-white/15 border-[1px] border-white/40 tracking-normal"
                    : "text-white hover:bg-white/15 hover:border-[1px] hover:border-white/40"
                  }`}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu toggle */}
      <div className="lg:hidden flex justify-end flex-1">
        <button
          className="mr-5 block text-white hover:text-gray-400 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <CgClose size={32} /> : <CgMenuRight size={32} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <div style={{ perspective: "1200px", perspectiveOrigin: "right center" }}>
        <nav
          className={`fixed top-7 -right-4 h-screen w-56 border-l-2 border-white/90 bg-black/85 flex flex-col py-5 z-50 lg:hidden origin-right transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]
            ${mobileMenuOpen ? "[transform:rotateY(0deg)]" : "[transform:rotateY(-100deg)]"}`}
        >
          {/* Door knob */}
          <div className="absolute left-4 top-[45%] -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
            <div className="w-px h-5 bg-white/90 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-white/70 border border-white/25" />
            <div className="w-px h-5 bg-white/90 rounded-full" />
          </div>

          {/* Hinge marks */}
          <div className="absolute left-0 top-[45%] -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
            <div className="w-1 h-6 bg-white/90 rounded-r-sm" />
            <div className="w-1 h-6 bg-white/90 rounded-r-sm" />
          </div>

          <div className="flex flex-col items-center justify-center h-full space-y-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                smooth={true}
                offset={item.offset}
                duration={500}
                to={item.id}
                onClick={toggleMobileMenu}
              >
                <p className={activeSection === item.id ? "active" : "text-white hover:text-gray-400"}>
                  {item.label}
                </p>
              </Link>
            ))}

            <div>
              <button
                onClick={() => window.open(resumeUrl)}
                className="border border-white button-UI rounded-full px-4 py-1.5 font-bold tracking-wider text-white shadow-xl hover:bg-gray-400 hover:text-black"
              >
                Resume
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;