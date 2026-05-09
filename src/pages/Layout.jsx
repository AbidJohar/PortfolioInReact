/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import Project from "./Project";
import { Element } from "react-scroll";
import Experience from "./Experience";
import MusicPlayer from "../components/MusicPlayer";

function Layout() {
  return (
    <>
     
      <Element name="Home-section">
        <Home />
      </Element>
      <MusicPlayer />

       <Element name="About-section">
        <About />
      </Element>

      <Element name="Experience-section">
        <Experience />
      </Element>

      <Element name="Project-section">
        <Project />
      </Element>
      <Element name="Contact-section">
        <Contact />
      </Element>
      <Footer />
    </>
  );
}

export default Layout;
