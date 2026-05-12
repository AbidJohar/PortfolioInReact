/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import TypewriterText from "../components/TypewriterText";
import { UserData } from "../data/UserData";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import profilepic from '../Assets/images/Profilepic-modified.webp';
import Header from "../components/Header";

function Home() {
  const socialMedia = UserData.socialMedia;
  const socialMediaIcons = { AiFillGithub, FaLinkedinIn, AiFillFacebook, AiFillInstagram };

  // ── Spring physics state ──
  const imgRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragged, setIsDragged] = useState(false);

  // Spring constants — tweak for feel
  const STIFFNESS = 0.08;   // pull-back strength
  const DAMPING = 0.75;   // friction / bounce decay
  const MASS = 0.6;

  const springLoop = () => {
    if (isDragging.current) return;

    // Spring force toward origin (0,0)
    const fx = -STIFFNESS * position.current.x;
    const fy = -STIFFNESS * position.current.y;

    velocity.current.x = (velocity.current.x + fx / MASS) * DAMPING;
    velocity.current.y = (velocity.current.y + fy / MASS) * DAMPING;

    position.current.x += velocity.current.x;
    position.current.y += velocity.current.y;

    setPos({ x: position.current.x, y: position.current.y });

    const isSettled =
      Math.abs(velocity.current.x) < 0.01 &&
      Math.abs(velocity.current.y) < 0.01 &&
      Math.abs(position.current.x) < 0.01 &&
      Math.abs(position.current.y) < 0.01;

    if (!isSettled) {
      animFrame.current = requestAnimationFrame(springLoop);
    } else {
      position.current = { x: 0, y: 0 };
      setPos({ x: 0, y: 0 });
      setIsDragged(false);
    }
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    setIsDragged(true);
    cancelAnimationFrame(animFrame.current);

    dragStart.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };
    lastPos.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };

    imgRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;

    velocity.current = {
      x: e.clientX - lastPos.current.x,
      y: e.clientY - lastPos.current.y,
    };
    lastPos.current = { x: e.clientX, y: e.clientY };

    position.current = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };

    setPos({ x: position.current.x, y: position.current.y });
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Kick off spring return with current drag velocity
    animFrame.current = requestAnimationFrame(springLoop);
  };

  useEffect(() => () => cancelAnimationFrame(animFrame.current), []);

  return (
    <div className="relative mb-5 sm:pb-16    h-screen lg:h-[33rem] xl:h-[53rem] w-full sm:mb-0 md:h-auto overflow-hidden">

      <h3 className="cursor-none hidden lg:block absolute top-[1.8rem] py-3 pl-6 text-3xl xl:text-4xl  tracking-wider text-white font-RocketBrush">Portfolio.</h3>

      {/* navbar */}
      {/* <Header /> */}

      <div className="absolute hidden lg:block right-7 top-8 ">
        <a href="../../public/AbidHussainCV.pdf" download>
          <button className="button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-black bg-white shadow-xl hover:bg-gray-400 hover:text-black">
            Resume
          </button>
        </a>
      </div>
      {/* 🎥 Background Video */}
      <video
        autoPlay muted loop playsInline preload="auto"
        poster="/videos/profilewhiskvideo-poster.jpg"
        className="absolute top-0 left-0 w-full h-screen lg:h-[33rem] xl:h-[53rem] object-cover z-[-1]"
      >
        <source src="/videos/profilewhiskvideo.webm" type="video/webm" />
        <source src="/videos/profilewhiskvideo.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-[-1]" />


      {/* Content */}
      <div className="max-w-7xl xl:h-[38rem] w-full mx-auto px-8 sm:px-[5rem] mt-36 md:mt-16 flex flex-col items-center sm:flex-row lg:mt-32 lg:justify-between">

        {/* ── Left: Text ── */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-center md:text-start text-white lg:text-3xl">
            Hello <span className="wave">👋</span>
          </h2>
          <h2 className="pt-2 text-2xl font-semibold text-white">
            My name is{" "}
            <strong className="lg:text-4xl text-3xl   px-2 font-RocketBrush" style={{ textShadow: "1px 2px 0 #1BFFFF" }}>Abid</strong>{" "}
            <strong className="lg:text-4xl text-3xl   font-RocketBrush" style={{ textShadow: "1px 2px 0 #FF10F0" }}>Hussain</strong>{" "}
            <span className="pl-32 sm:pl-0">and I&apos;m a</span>
          </h2>
          <div className="bg-gray-300 w-fit">
            <TypewriterText />
          </div>
          <div className="mt-4 flex gap-8 lg:gap-0 items-center justify-center md:justify-start md:items-start">
            {socialMedia.map((data, index) => {
              const IconComponent = socialMediaIcons[data.icon];
              return (
                <button
                  key={index}
                  onClick={() => window.open(data.url)}
                  className="flex items-center justify-center hover:bg-white/20 lg:h-12 lg:w-24"
                >
                  <IconComponent className="icon" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: Draggable spring profile pic ── */}
        <div className="mt-20 lg:mt-1 relative select-none">

          {/* Ghost outline — shows original position while dragging */}
          <div
            className="rounded-full border-2 border-dotted lg:w-[300px] lg:h-[300px] w-[250px] h-[250px]"
            style={{
              borderColor: isDragged ? 'rgba(27,255,255,0.4)' : 'transparent',
              transition: 'border-color 0.2s ease',
            }}
          />

          {/* Draggable image — absolutely on top of ghost */}
          <img
            ref={imgRef}
            fetchPriority="high"
            loading="eager"
            src={profilepic}
            alt="Abid Hussain"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              cursor: isDragged ? 'grabbing' : 'grab',
              touchAction: 'none',
              position: 'absolute',
              top: 0,
              left: 0,

              transition: isDragged ? 'filter 0.15s ease' : 'filter 0.3s ease',
            }}
            className="rounded-full border-2 border-white/40 lg:w-[300px] lg:h-[300px] w-[250px] h-[250px] object-cover"
            draggable={false}
          />
          <p className="absolute top-32 left-[4.5rem] sm:top-36 sm:left-24 bg-white/40  text-gray-600 px-3 py-1 rounded-full">Drag Over</p>
        </div>

      </div>

      {/* <hr className="mx-10 mt-16 h-[2px] bg-slate-50" /> */}
    </div>
  );
}

export default Home;