import React, { useState, useEffect, useRef } from "react";

const CYAN = "#1BFFFF";
const PINK = "#FF10F0";

// ── Bouncing tag physics hook ──
function useBouncingTags(technologies, containerRef) {
  const [positions, setPositions] = useState([]);
  const animRef = useRef(null);
  const stateRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !technologies?.length) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Estimate tag dimensions
    const tagWidth = (tech) => Math.max(80, tech.length * 9 + 28);
    const tagHeight = 32;

    // Initialize random positions and velocities
    const initial = technologies.map((tech, i) => {
      const tw = tagWidth(tech);
      return {
        x: Math.random() * (width - tw),
        y: Math.random() * (height - tagHeight),
        vx: (Math.random() * 1.2 + 0.4) * (Math.random() > 0.5 ? 1 : -1),
        vy: (Math.random() * 1.2 + 0.4) * (Math.random() > 0.5 ? 1 : -1),
        w: tw,
        h: tagHeight,
        color: i % 2 === 0 ? CYAN : PINK,
      };
    });

    stateRef.current = initial;
    setPositions(initial.map(({ x, y }) => ({ x, y })));

    const animate = () => {
      const { width: W, height: H } = container.getBoundingClientRect();

      stateRef.current = stateRef.current.map((tag) => {
        let { x, y, vx, vy, w, h } = tag;
        x += vx;
        y += vy;

        if (x <= 0) { x = 0; vx = Math.abs(vx); }
        if (x + w >= W) { x = W - w; vx = -Math.abs(vx); }
        if (y <= 0) { y = 0; vy = Math.abs(vy); }
        if (y + h >= H) { y = H - h; vy = -Math.abs(vy); }

        return { ...tag, x, y, vx, vy };
      });

      setPositions(stateRef.current.map(({ x, y }) => ({ x, y })));
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [technologies]);

  return positions;
}

// ── Overview + Bouncing Stack section ──
function OverviewAndStack({ project }) {
  const containerRef = useRef(null);
  const positions = useBouncingTags(project.technologies, containerRef);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
        marginBottom: "1.5rem",
      }}
      className="project-grid"
    >
      {/* ── Overview ── */}
      <div
        style={{
          background: "#0d0d1f",
          borderRadius: "12px",
          border: "0.5px solid rgba(255,255,255,0.08)",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
          <div style={{
            width: "3px", height: "18px",
            background: `linear-gradient(180deg, ${CYAN}, ${PINK})`,
            borderRadius: "2px",
          }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem", fontWeight: 700,
            color: "#fff", margin: 0,
          }}>
            Overview
          </h2>
        </div>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.875rem", lineHeight: 1.8,
          color: "rgba(255,255,255,0.55)",
          textAlign: "justify", margin: 0,
        }}>
          {project.description}
        </p>
      </div>

      {/* ── Bouncing Stack ── */}
      <div
        style={{
          background: "#0d0d1f",
          borderRadius: "12px",
          border: "0.5px solid rgba(255,255,255,0.08)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
          <div style={{
            width: "3px", height: "18px",
            background: `linear-gradient(180deg, ${PINK}, ${CYAN})`,
            borderRadius: "2px",
          }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem", fontWeight: 700,
            color: "#fff", margin: 0,
          }}>
            Stack
          </h2>
        </div>

        {/* Bouncing arena */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            flex: 1,
            minHeight: "260px",
            overflow: "hidden",
            borderRadius: "8px",
            border: "0.5px solid rgba(255,255,255,0.05)",
            // background: "rgba(0,0,0,0.2)",
          }}
        >
          {project.technologies.map((tech, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: positions[i]?.y ?? 0,
                left: positions[i]?.x ?? 0,
                padding: "5px 14px",
                borderRadius: "4px",
                fontSize: "11px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? CYAN : PINK,
                border: `0.5px solid ${i % 2 === 0 ? "rgba(27,255,255,0.35)" : "rgba(255,16,240,0.35)"}`,
                background: i % 2 === 0 ? "rgba(27,255,255,0.07)" : "rgba(255,16,240,0.07)",
                whiteSpace: "nowrap",
                userSelect: "none",
                pointerEvents: "none",
                lineHeight: "22px",
                boxShadow: i % 2 === 0
                  ? "0 0 8px rgba(27,255,255,0.15)"
                  : "0 0 8px rgba(255,16,240,0.15)",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewAndStack;