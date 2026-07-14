import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Preloader from "../src/components/Pre";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import "./App.css";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ArchiveProjects = lazy(() => import("./pages/ArchiveProjects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetails"));
import SplashCursor from "./components/SplashCursor";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
        <SplashCursor />
      <Router basename="/">
        <Preloader load={load} />
        <Suspense fallback={null}>
          <div className="App" id={load ? "no-scroll" : "scroll"}>
            <ScrollToTopOnRouteChange />
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/about" element={<About />} />
              <Route path="/projectlist" element={<ArchiveProjects />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;