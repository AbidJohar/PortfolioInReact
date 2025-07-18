/* eslint-disable no-unused-vars */
import React from "react";
import { UserData } from "../data/UserData";
import Marquee from "react-fast-marquee";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";
import AboutImage from "../Assets/images/AboutImage.png";

function About() {
  const { about } = UserData;
  return (
    <div className="mb-24 h-auto w-full sm:mb-0 md:h-screen">
      <div className="mx-auto flex w-[90%] flex-col justify-between rounded-xl border border-white border-spacing-2 bg-transparent p-4 shadow-lg md:flex-row md:items-center">
        <div className="flex w-full flex-col md:w-[50%]">
          <p className="pb-2 text-2xl font-semibold tracking-wide text-white">
            About Me
          </p>
        
          <p  className="font-poppins text-sm   lg:text-base" style={{'textAlign': "justify"}}>{about}</p>

        
          <div className="mt-8">
            <Marquee
              gradient={false}
              speed={150}
              pauseOnClick={true}
              delay={0}
              play={true}
              direction="right"
            >
              {skillsData.map((skill, id) => (
                <div
                  className="ml-4 flex h-24 w-24 flex-col items-center justify-center gap-1"
                  key={id}
                >
                  <img
                    className="h-[50px] w-[60px] bg-contain bg-no-repeat"
                    src={skillsImage(skill)}
                    alt={skill}
                  />
                  <p>{skill}</p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <img
          className="max-w[500px] mt-4 bg-cover bg-center bg-no-repeat md:w-[350px] lg:mt-0 lg:h-[350px] lg:w-[550px]"
          src={AboutImage}
          alt="about image"
        />
      </div>
      <hr className="w-75% mx-10 mt-16 h-[2px] bg-slate-50 opacity-10 shadow-md" />
    </div>
  );
}

export default About;
