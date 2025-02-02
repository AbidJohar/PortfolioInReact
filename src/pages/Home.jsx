/* eslint-disable no-unused-vars */
import React from "react";
import TypewriterText from "../components/TypewriterText";
import { UserData } from "../data/UserData";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import profilepic from '../Assets/images/Profilepic-modified.png';

function Home() {
  const socialMedia = UserData.socialMedia;

  const socialMediaIcons = {
    AiFillGithub: AiFillGithub,
    FaLinkedinIn: FaLinkedinIn,
    AiFillFacebook: AiFillFacebook,
    AiFillInstagram: AiFillInstagram,
  };

  return (
    <div className="mb-28 h-auto w-full sm:mb-0 md:h-screen">
      <div className="mx-auto mt-40 flex w-[90%] flex-col items-center sm:flex-row lg:mt-32 lg:w-[80%] lg:justify-between  ">
        <div className="w-full">
          <h2 className="text-2xl font-semibold leading-tight text-white lg:text-3xl">
            Hello <span className="wave">👋</span>
          </h2>
          <h2 className="pt-2 text-2xl font-semibold leading-tight text-white">
            My name is <strong  style={{ textShadow: '1px 2px 0  #1BFFFF' }} className="text-white text-3xl text-shadow">Abid</strong> <strong  style={{ textShadow: '1px 2px 0  #FF10F0' }} className="text-white text-3xl text-shadow">Hussain</strong>   and I'm a 
          </h2>
          <div className="bg-gray-300 w-fit h-fit">
          <TypewriterText />
          </div>

          <div className="mt-4 flex gap-8 lg:gap-0">
            {socialMedia.map((data, index) => {
              const IconComponent = socialMediaIcons[data.icon];
              console.log(IconComponent);
              return (
                <button
                  className="flex items-center justify-center rounded-lg border-none bg-transparent hover:bg-white hover:bg-opacity-20 hover:opacity-80 hover:shadow-lg lg:h-12 lg:w-24"
                  key={index}
                  onClick={() => window.open(data.url)}
                >
                  <IconComponent className="icon" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-20 lg:mt-1">
          <img
            className="max-w[550px] bg-cover bg-center hover:animate-spin duration-[10000ms]  border-black border-2  rounded-full bg-no-repeat  lg:h-[360x] lg:w-[540px]"
            src={profilepic}
            alt="" 
          />
        </div>
      </div>
      <hr className="w-75% mx-10 mt-16 h-[2px] bg-slate-50 opacity-9 shadow-md" />
    </div>
    
  );
}

export default Home;