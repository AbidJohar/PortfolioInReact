import React, { useRef, useEffect } from "react";
import { UserData } from "../data/UserData";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";

function About() {
  const { about } = UserData;
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current -= 0.6;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const doubled = [...skillsData, ...skillsData];

  return (
    <section className="w-full font-sans  mt-14 pb-0">

      {/* ── Main grid ── */}
      <div className="w-full px-8 sm:px-12 lg:px-20 xl:px-32 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-x-28 items-start">

        {/* Left — copy */}
        <div className="min-w-0">
           <h3 className="font-RocketBrush text-3xl sm:text-5xl font-bold text-start text-white tracking-wider mb-3 ">
                    ABOUT ME
                </h3>

          <div className="text-gray-400 text-sm lg:text-base leading-relaxed mb-2">
            {about}
          </div>

          {/* ── Animated skill strip ── */}
          <div className="mt-8">
            <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-3">
              Tech Stack
            </p>

            <div
              className="relative overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                ref={trackRef}
                className="flex gap-3 w-max"
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
              >
                {doubled.map((skill, id) => (
                  <div
                    key={id}
                    className="group flex flex-col items-center justify-center gap-1.5
                               w-[80px] h-[80px] flex-shrink-0
                               border border-white/10 rounded-lg
                               hover:border-white/40 hover:bg-white/5
                               transition-all duration-200 cursor-default"
                  >
                    <img
                      src={skillsImage(skill)}
                      alt={skill}
                      className="w-8 h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    <span className="text-[7px] font-bold tracking-wider uppercase text-white/80 group-hover:text-white/60 transition-colors duration-200 leading-none">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical rule */}
        <div className="hidden md:block bg-white/10 w-px self-stretch" />

        {/* Right — stats */}
        <div className="self-start grid grid-cols-2 md:grid-cols-1 gap-6 pt-10 md:pt-1 min-w-0">
          {[
            { num: "1.5+",   label: "Years of experience" },
            { num: "20+", label: "Projects built" },
            { num: "4+", label: "Production Projects" },
            { num: "400+", label: "Git commits" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="border-l-2 border-white/20 pl-4 group hover:border-white transition-colors duration-200"
            >
              <span className="font-Geometra text-4xl text-white block leading-none">{num}</span>
              <span className="text-[11px] tracking-widest uppercase text-white/40 mt-1 block">{label}</span>
            </div>
          ))}
        </div>
      </div>

       

    </section>
  );
}

export default About;