/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectsList } from "../data/ProjectsList";
import { motion, AnimatePresence } from "framer-motion";
import OverviewAndStack from "../components/OverviewAndStack";

const CYAN = "#1BFFFF";
const PINK = "#FF10F0";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = ProjectsList.projects[projectId];
  const hasImages = project?.images && project.images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const paginate = (dir) => {
    setDirection(dir);
    setCurrentIndex((prev) =>
      dir === 1
        ? prev === project.images.length - 1 ? 0 : prev + 1
        : prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
  };

  if (!project) return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "#08080f" }}>
      <div className="text-center">
        <p className="text-6xl font-bold mb-4" style={{ color: CYAN, fontFamily: "'Playfair Display', serif" }}>404</p>
        <p className="text-white/50 mb-8 font-mono text-sm tracking-widest uppercase">Project not found</p>
        <button onClick={() => navigate(-1)}
          className="px-6 py-3 text-sm font-mono tracking-widest uppercase"
          style={{ border: `1px solid ${CYAN}`, color: CYAN, background: "transparent", borderRadius: "4px" }}>
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      style={{ background: "#08080f", minHeight: "100vh", paddingBottom: "6rem" }}
    >
      {/* ── Hero strip ── */}
      <div style={{
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: "5rem 0 3rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow blob */}
        <div style={{
          position: "absolute", top: "-60px", left: "10%",
          width: "400px", height: "300px", borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(27,255,255,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "-40px", right: "15%",
          width: "300px", height: "250px", borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(255,16,240,0.05) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Back button */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.4)", fontSize: "12px",
              fontFamily: "monospace", letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "2.5rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </motion.button>

          {/* Index + title */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
            <span style={{
              fontFamily: "monospace", fontSize: "13px",
              color: CYAN, opacity: 0.7, marginTop: "6px",
              letterSpacing: "0.1em",
            }}>
              {String(Number(projectId) + 1).padStart(2, "0")}
            </span>
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-Geometra"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 200, color: "#ffffff",
                  lineHeight: 1.1, margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.name}
              </motion.h1>

              {/* Gradient rule under title */}
              {/* <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  height: "2px", width: "120px", marginTop: "16px",
                  background: `linear-gradient(90deg, ${CYAN}, ${PINK})`,
                  transformOrigin: "left",
                }}
              /> */}

              {/* Live link */}
              {project?.hostingLink && (
                <motion.a
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  href={project.hostingLink} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    marginTop: "1.5rem", padding: "8px 20px",
                    border: `1px solid rgba(27,255,255,0.35)`,
                    borderRadius: "4px", color: CYAN,
                    fontSize: "12px", fontFamily: "monospace",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    textDecoration: "none",
                    background: "rgba(27,255,255,0.05)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(27,255,255,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(27,255,255,0.05)"}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Live Project
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H5M10 2V7" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 0" }}>

        {/* GitHub note */}
        {hasImages && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 16px", marginBottom: "2rem",
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              ⓘ  Screenshots served from GitHub — may load with slight delay
            </span>
          </motion.div>
        )}

        {/* ── Image carousel ── */}
        {hasImages && (
          <motion.div
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: "3rem" }}
          >
            <div style={{
              position: "relative", borderRadius: "16px", overflow: "hidden",
              border: "0.5px solid rgba(255,255,255,0.1)",
              background: "#0d0d1f",
              height: "clamp(280px, 50vw, 560px)",
            }}>

              {/* Image */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
                >
                  <img
                    src={project.images[currentIndex]}
                    alt={`${project.name} screenshot ${currentIndex + 1}`}
                    loading="lazy"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              {project.images.length > 1 && (
                <>
                  <button onClick={() => paginate(-1)}
                    style={{
                      position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(0,0,0,0.6)", border: `0.5px solid rgba(255,255,255,0.15)`,
                      color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      backdropFilter: "blur(8px)", zIndex: 10,
                    }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={() => paginate(1)}
                    style={{
                      position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(0,0,0,0.6)", border: `0.5px solid rgba(255,255,255,0.15)`,
                      color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      backdropFilter: "blur(8px)", zIndex: 10,
                    }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </>
              )}

              {/* Dot indicators */}
              <div style={{
                position: "absolute", bottom: "16px", left: "50%",
                transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 10,
              }}>
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                    style={{
                      width: i === currentIndex ? "20px" : "6px",
                      height: "6px", borderRadius: "3px",
                      background: i === currentIndex ? CYAN : "rgba(255,255,255,0.25)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <div style={{
                position: "absolute", top: "16px", right: "16px",
                fontFamily: "monospace", fontSize: "11px",
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em",
                background: "rgba(0,0,0,0.5)", padding: "4px 10px",
                borderRadius: "20px", backdropFilter: "blur(8px)",
              }}>
                {String(currentIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
              </div>
            </div>
          </motion.div>
        )}
        {/* ── Two column layout: Overview + Tech (card component) ── */}
        <OverviewAndStack project={project} />

        

        {/* ── Key Features ── */}
        {project.features && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{
              background: "#0d0d1f", borderRadius: "12px",
              border: "0.5px solid rgba(255,255,255,0.08)",
              padding: "2rem", marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
              <div style={{
            width: "3px", height: "18px",
            background: "#17F8FF",
            borderRadius: "1px",
          }} />
          <h2 
          className="font-Geometra"
          style={{
             
            fontSize: "1.2rem", fontWeight: 700,
            color: "#fff", margin: 0,
          }}>
            Key Features
          </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "10px",
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "0.5px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ color: CYAN, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Repository ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem",
            background: "#0d0d1f", borderRadius: "12px",
            border: "0.5px solid rgba(255,255,255,0.08)",
            padding: "1.75rem 2rem",
          }}
        >
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>
              Source Code
            </p>
            <p 
            className="font-Geometra"
            style={{  fontSize: "1.1rem", color: "#fff", margin: 0 }}>
              View on GitHub
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            href={project.link} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "12px 28px", borderRadius: "6px",
              background: `linear-gradient(135deg, rgba(27,255,255,0.12), rgba(255,16,240,0.12))`,
              border: `1px solid rgba(27,255,255,0.3)`,
              color: "#fff", textDecoration: "none",
              fontSize: "13px", fontFamily: "monospace",
              letterSpacing: "0.08em", textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = CYAN}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(27,255,255,0.3)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub Repo
          </motion.a>
        </motion.div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 640px) {
          .project-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}

export default ProjectDetail;