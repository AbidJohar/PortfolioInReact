import React, { useEffect, useRef, useState } from "react";

const PALETTE = [
  { stroke: "rgba(23,248,255,0.55)", fill: "rgba(23,248,255,0.07)", text: "#17F8FF" },
  { stroke: "rgba(180,100,255,0.55)", fill: "rgba(180,100,255,0.07)", text: "#c47fff" },
];

const R = 36;
const D = R * 2;
const GAP = 5;
const BPAD = R + 6;

// ── Drift (idle) ──
const DRIFT_MAX = 0.30;   // max speed while floating
const DRIFT_NUDGE = 0.012;  // how hard each frame nudges toward heading
const DRIFT_TURN = 0.006;  // how fast heading wanders (radians/frame)
const DRIFT_FRIC = 0.984;  // nearly frictionless

// ── Magnet ──
const ATTRACT_R = 200;    // pull radius (px)
const ATTRACT_ACC = 0.22;   // fixed acceleration toward cursor (px/frame²) — small, constant
const ATTRACT_MAX = 3.2;    // hard speed cap while attracted
const ATTRACT_FRIC = 0.90;   // friction applied every frame while attracted

// ── Separation ──
const SEP_F = 0.50;
const BOUNCE = 0.25;
const DEAD_ZONE = R + 2;     // don't pull if already this close

function buildHomes(W, H, count) {
  const placed = [];
  for (let i = 0; i < count; i++) {
    let best = null, bestDist = -Infinity;
    for (let t = 0; t < 300; t++) {
      const cx = R + 12 + Math.random() * (W - D - 24);
      const cy = R + 12 + Math.random() * (H - D - BPAD - 12);
      let minDist = Infinity;
      for (const p of placed) {
        const dx = cx - p.hx, dy = cy - p.hy;
        minDist = Math.min(minDist, Math.sqrt(dx * dx + dy * dy));
      }
      if (placed.length === 0) minDist = Infinity;
      if (minDist > bestDist) { bestDist = minDist; best = { hx: cx, hy: cy }; }
      if (minDist >= D + GAP * 3) break;
    }
    placed.push(best);
  }
  return placed;
}

function usePhysics(technologies, containerRef) {
  const tagsRef = useRef([]);
  const mouseRef = useRef({ x: -999, y: -999, inside: false });
  const animRef = useRef(null);
  const elRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !technologies?.length) return;

    const arena = containerRef.current;
    let W = arena.clientWidth;
    let H = arena.clientHeight;

    const homes = buildHomes(W, H, technologies.length);

    tagsRef.current = technologies.map((_, i) => ({
      x: homes[i].hx,
      y: homes[i].hy,
      vx: (Math.random() - 0.5) * DRIFT_MAX,
      vy: (Math.random() - 0.5) * DRIFT_MAX,
      angle: Math.random() * Math.PI * 2,
    }));

    requestAnimationFrame(() => {
      tagsRef.current.forEach((t, i) => {
        if (elRefs.current[i])
          elRefs.current[i].style.transform = `translate(${t.x - R}px,${t.y - R}px)`;
      });
    });

    const onMove = (e) => {
      const rect = arena.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onEnter = () => { mouseRef.current.inside = true; };
    const onLeave = () => {
      mouseRef.current.inside = false;
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    };
    const onResize = () => {
      W = arena.clientWidth;
      H = arena.clientHeight;
    };

    arena.addEventListener("mousemove", onMove);
    arena.addEventListener("mouseenter", onEnter);
    arena.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const loop = () => {
      const tags = tagsRef.current;
      const { x: mx, y: my, inside } = mouseRef.current;

      for (let i = 0; i < tags.length; i++) {
        let { x, y, vx, vy, angle } = tags[i];

        // ── Separation (always) ──
        for (let j = 0; j < tags.length; j++) {
          if (j === i) continue;
          const dx = x - tags[j].x;
          const dy = y - tags[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minD = D + GAP;
          if (dist < minD) {
            const push = (minD - dist) / 2;
            vx += (dx / dist) * push * SEP_F;
            vy += (dy / dist) * push * SEP_F;
          }
        }

        if (inside) {
          // ── MAGNET: fixed acceleration toward cursor, hard speed cap ──
          const adx = mx - x;
          const ady = my - y;
          const dist = Math.sqrt(adx * adx + ady * ady) || 1;

          if (dist > DEAD_ZONE) {
            // direction-only unit vector × fixed acceleration
            // no dist multiplier — purely constant force regardless of how far
            vx += (adx / dist) * ATTRACT_ACC;
            vy += (ady / dist) * ATTRACT_ACC;
          }

          // friction every frame to prevent runaway speed
          vx *= ATTRACT_FRIC;
          vy *= ATTRACT_FRIC;

          // hard cap so pileups can't go supersonic
          const spd = Math.sqrt(vx * vx + vy * vy);
          if (spd > ATTRACT_MAX) {
            vx = (vx / spd) * ATTRACT_MAX;
            vy = (vy / spd) * ATTRACT_MAX;
          }

        } else {
          // ── DRIFT: smooth ambient float ──
          angle += (Math.random() - 0.5) * DRIFT_TURN * Math.PI * 2;
          vx += Math.cos(angle) * DRIFT_NUDGE;
          vy += Math.sin(angle) * DRIFT_NUDGE;

          // clamp drift speed
          const spd = Math.sqrt(vx * vx + vy * vy);
          if (spd > DRIFT_MAX) {
            vx = (vx / spd) * DRIFT_MAX;
            vy = (vy / spd) * DRIFT_MAX;
          }

          vx *= DRIFT_FRIC;
          vy *= DRIFT_FRIC;
          tags[i].angle = angle;
        }

        x += vx;
        y += vy;

        // ── Walls ──
        if (x - R < 2) { x = R + 2; vx = Math.abs(vx) * BOUNCE; }
        if (x + R > W - 2) { x = W - R - 2; vx = -Math.abs(vx) * BOUNCE; }
        if (y - R < 2) { y = R + 2; vy = Math.abs(vy) * BOUNCE; }
        if (y + R > H - BPAD) { y = H - BPAD - R; vy = -Math.abs(vy) * BOUNCE; }

        tags[i] = { ...tags[i], x, y, vx, vy };

        if (elRefs.current[i])
          elRefs.current[i].style.transform = `translate(${x - R}px,${y - R}px)`;
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      arena.removeEventListener("mousemove", onMove);
      arena.removeEventListener("mouseenter", onEnter);
      arena.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [technologies]);

  return elRefs;
}

export default function OverviewAndStack({ project }) {
  const containerRef = useRef(null);
  const [hinted, setHinted] = useState(true);
  const [active, setActive] = useState(false);
  const elRefs = usePhysics(project.technologies, containerRef);

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
      {/* Overview */}
      <div
        style={{
          background: "#080818",
          borderRadius: "16px",
          border: "0.5px solid rgba(255,255,255,0.07)",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
          <div style={{ width: "3px", height: "18px", background: "#17F8FF", borderRadius: "2px" }} />
          <h2
            className="font-Geometra"
            style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Overview
          </h2>
        </div>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.5)",
            textAlign: "justify",
            margin: 0,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Stack */}
      <div
        style={{
          background: "#080818",
          borderRadius: "16px",
          border: "0.5px solid rgba(255,255,255,0.07)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
          <div style={{ width: "3px", height: "18px", background: "#17F8FF", borderRadius: "2px" }} />
          <h2
            className="font-Geometra"
            style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Stack
          </h2>
        </div>

        {/* Arena */}
        <div
          ref={containerRef}
          onMouseEnter={() => { setHinted(false); setActive(true); }}
          onMouseLeave={() => { setHinted(true); setActive(false); }}
          style={{
            position: "relative",
            flex: 1,
            minHeight: "320px",
            overflow: "hidden",
            borderRadius: "10px",
            border: `0.5px solid ${active ? "rgba(23,248,255,0.1)" : "rgba(255,255,255,0.04)"}`,
            background: "#05050f",
            cursor: "crosshair",
            transition: "border-color 0.4s ease",
          }}
        >
          {project.technologies.map((tech, i) => {
            const p = PALETTE[i % 2];
            return (
              <div
                key={i}
                ref={(el) => { elRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: D,
                  height: D,
                  borderRadius: "50%",
                  border: `1px solid ${active ? p.stroke.replace("0.55", "0.85") : p.stroke}`,
                  background: p.fill,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontSize: "9px",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: p.text,
                  textAlign: "center",
                  lineHeight: 1.3,
                  padding: "6px",
                  userSelect: "none",
                  pointerEvents: "none",
                  willChange: "transform",
                  transition: "border-color 0.3s ease",
                }}
              >
                {tech}
              </div>
            );
          })}

          <p
            style={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              textAlign: "center",
              fontSize: "9px",
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.12)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              pointerEvents: "none",
              userSelect: "none",
              margin: 0,
              opacity: hinted ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            hover to attract · watch them drift
          </p>
        </div>
      </div>
    </div>
  );
}