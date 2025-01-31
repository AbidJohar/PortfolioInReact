import { useEffect, useState } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { UserData } from "../data/UserData";

const Header = () => {
  const [isScrolling, setisScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { resumeUrl } = UserData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isCurrentScrolled = scrollTop > 0;
      setisScrolling(isCurrentScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    Events.scrollEvent.register("begin", function (to) {
      setActiveSection(to);
    });

    scrollSpy.update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 z-50 flex w-full shadow-md shadow-white/20 items-center justify-between text-base transition-all sm:px-4 lg:px-28 lg:pt-2
      ${isScrolling ? "sticky" : ""}`}
    >
      <div className="cursor-none">
        <h3 className="font-semibold py-3 text-3xl tracking-wider text-white">Portfolio</h3>
      </div>
      <nav className="hidden lg:block">
        <div className="cursor-pointer items-center space-x-4 sm:flex sm:flex-col sm:gap-4 lg:flex lg:flex-row lg:gap-6">
          <Link activeClass="active" spy={true} smooth={true} offset={-250} duration={500} to="Home-section">
            <p className={activeSection === "Home-section" ? "active" : "text-white hover:text-gray-400 hover:font-bold hover:underline underline-offset-2"}>Home</p>
          </Link>
          <Link activeClass="active" spy={true} smooth={true} offset={-150} duration={500} to="About-section">
            <p className={activeSection === "About-section" ? "active" : "text-white hover:text-gray-400 hover:font-bold hover:underline underline-offset-2"}>About</p>
          </Link>
          <Link activeClass="active" spy={true} smooth={true} offset={-150} duration={500} to="Project-section">
            <p className={activeSection === "Project-section" ? "active" : "text-white hover:text-gray-400 hover:font-bold hover:underline underline-offset-4"}>Projects</p>
          </Link>
          <Link activeClass="active" spy={true} smooth={true} offset={50} duration={500} to="Contact-section">
            <p className={activeSection === "Contact-section" ? "active" : "text-white hover:text-gray-400 hover:font-bold hover:underline underline-offset-2"}>Contact</p>
          </Link>
          <div>
            <button onClick={() => window.open(resumeUrl)} className="button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-black bg-white shadow-xl hover:bg-gray-400 hover:text-black">Resume</button>
          </div>
        </div>
      </nav>
      <div className="block lg:hidden">
        <button className="mr-5 block text-white hover:text-gray-400 focus:outline-none" onClick={toggleMobileMenu}>
          <CgMenuRight size={32} />
        </button>
      </div>
      {mobileMenuOpen && (
        <nav className="absolute left-0 top-full block w-full lg:hidden bg-black">
          <div className="navbar-bg flex flex-col items-center space-y-4 py-4">
            <Link activeClass="active" spy={true} smooth={true} offset={-250} duration={500} to="Home-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Home-section" ? "active" : "text-white hover:text-gray-400"}>Home</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={-150} duration={500} to="About-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "About-section" ? "active" : "text-white hover:text-gray-400"}>About</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={-150} duration={500} to="Project-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Project-section" ? "active" : "text-white hover:text-gray-400"}>Projects</p>
            </Link>
            <Link activeClass="active" spy={true} smooth={true} offset={50} duration={500} to="Contact-section" onClick={toggleMobileMenu}>
              <p className={activeSection === "Contact-section" ? "active" : "text-white hover:text-gray-400"}>Contact</p>
            </Link>
            <div>
              <button onClick={() => window.open(resumeUrl)} className="border border-white rounded-full px-4 py-1.5 font-bold tracking-wider text-white shadow-xl hover:bg-gray-400 hover:text-black">Resume</button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
