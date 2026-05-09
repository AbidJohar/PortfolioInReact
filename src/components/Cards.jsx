/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cards({ projects }) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3  overflow-hidden ">
      {projects.map((project, index) => (
        <div
          key={index}
          onClick={() => navigate(`/project/${index}`)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-tl-3xl rounded-br-3xl cursor-pointer bg-[#0d0d1cdc]"
          style={{ minHeight: '250px' }}
        >

          {/* ── Background with clip-path wipe from top ── */}
          <div
            className="absolute inset-0   transition-all duration-1000 ease-in-out"
            style={{
              clipPath: hoveredIndex === index
                ? 'inset(0% 0% 0% 0%)'
                : 'inset(0% 0% 100% 0%)',
            }}
          >
            <div className="absolute inset-0  bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
          </div>

     

          {/* ── Card content ── */}
          <div className="relative z-10 flex flex-col gap-7 h-full p-8" style={{ minHeight: '250px' }}>

            {/* Top row: index number + arrow */}
            <div className="flex items-start justify-between">
              <span
                className="font-mono text-xs  tracking-widest transition-colors duration-300"
                style={{
                  color: hoveredIndex === index ? '#1BFFFF' : '#1BFFFF',
                  opacity: hoveredIndex === index ? 1 : 0.4
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <svg
                width="18" height="18" viewBox="0 0 18 18" fill="none"
                className="transition-all duration-300"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: hoveredIndex === index ? 'translate(0,0)' : 'translate(-6px, 6px)',
                }}
              >
                <path d="M3 15L15 3M15 3H7M15 3V11" stroke="#1BFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Bottom content */}
            <div>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded transition-all duration-300"
                    style={{
                      color: '#1BFFFF',
                      border: '0.5px solid #1BFFFF',
                      background: 'transparent',
                      opacity: hoveredIndex === index ? 1 : 0.4
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-mono text-white/40 px-2 py-1">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Project name */}
              <h2
                className="font-Geometra leading-tight mb-2 transition-colors duration-300"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                {project.name}
              </h2>

              {/* Description */}
              <p
                className="text-sm leading-relaxed line-clamp-2 transition-colors duration-300"
                style={{ color: hoveredIndex === index ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)' }}
              >
                {project.description}
              </p>

              {/* View details row */}
              <div
                className="flex items-center gap-2 mt-5 transition-all duration-300"
                style={{ opacity: hoveredIndex === index ? 1 : 0.4 }}
              >
                <div
                  className="h-px transition-all duration-500"
                  style={{
                    width: hoveredIndex === index ? '32px' : '12px',
                    background: 'linear-gradient(90deg, #1BFFFF, #FF10F0)',
                  }}
                />
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: '#1BFFFF' }}
                >
                  View Project
                </span>
              </div>
            </div>
          </div>

          {/* ── Thin right border divider (not on last in row) ── */}
          <div className="absolute right-0 top-8 bottom-8 w-px bg-white/5" />

        </div>
      ))}
    </div>
  );
}

export default Cards;