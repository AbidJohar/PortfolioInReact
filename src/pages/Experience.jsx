import React from "react";
import { motion } from "framer-motion";

const experiences = [
    {
        date: "May 2025 - Feb 2026",
        role: "Full Stack Developer",
        company: "DevCon14",
        description: "Developed modern full-stack web applications using the MERN stack, built responsive user interfaces, integrated REST APIs, optimized application performance, and collaborated on scalable real-world projects.",
        jobType: "part time"
    },
    {
        date: "Oct 2025 - Jan 2026",
        role: "Backend Developer Trainee",
        company: "Quality Compliance 360",
        description: "Fixed and optimized legacy backend systems, improved API performance, resolved existing server-side issues, refactored outdated Node.js codebases, and enhanced overall backend stability and scalability.",
         jobType: "full time"
    },
    {
        date: "Oct 2024 - Apr 2025",
        role: "MERN Stack Developer",
        company: "Realz Solutions",
        description:
            "Developed and maintained full-stack web applications, built scalable React dashboards, integrated secure backend APIs and Google OAuth authentication, and optimized overall application performance and user experience",
         jobType: "full time"
    }
];

const Experience = () => {
    return (
        <section className="relative min-h-screen w-full  pt-20 px-6 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className=" min-w-0 sm:px-14 mx-auto">
                <h3 className="font-RocketBrush text-3xl sm:text-5xl font-bold text-start text-white tracking-wider mb-10">
                    Experience
                </h3>

                <div className="relative">
                    {/* The Main Git Branch Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-[16px] top-0 w-[1px] bg-gradient-to-b from-indigo-500 via-emerald-500 to-gray-800 origin-top"
                    />

                    {experiences.map((exp, index) => (
                        <div key={index} className="relative mb-20 pl-16 group">

                            {/* The Commit Dot (The 'Node') */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: index * 0.2
                                }}
                                className="absolute left-0 top-1 w-8 h-8 z-10 flex items-center justify-center"
                            >
                                {/* Outer Spinning Ring - Thin and elegant */}
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30 animate-[spin_8s_linear_infinite]" />

                                {/* The Main Node */}
                                <div className="relative w-7 h-7 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center overflow-hidden shadow-xl">

                                    {/* Inner Glitch/Pulse Effect */}
                                    <motion.div
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0 bg-indigo-500/10"
                                    />

                                    {/* The Center "Bit" */}
                                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                                </div>

                                {/* Connection Glow - Makes it feel docked to the line */}
                                <div className="absolute -z-10 w-12 h-12 bg-indigo-500/5 blur-xl rounded-full" />
                            </motion.div>

                            {/* Commit Branch Line (Connecting to the card) */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "2rem" }}
                                className="absolute left-10 top-5 h-[1px] bg-gray-700"
                            />

                            {/* Experience Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                // whileHover={{ x: 5 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-[#0E0F1D] border border-white/5 p-6 rounded-xl hover:border-indigo-500/30 transition-all cursor-default relative overflow-hidden"
                            >
                                {/* Subtle Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                                {/* <span className="text-xs font-mono text-indigo-400 mb-2 block tracking-widest uppercase">
                                    commit_id: {Math.random().toString(16).substring(2, 8)}
                                </span> */}
                                <div className="flex-col flex sm:flex-row gap-2">
                                    <h3 className="text-xl font-Geometra font-bold text-white mb-1">
                                        {exp.role}
                                    </h3>
                                    <span className="text-gray-500 text-base font-normal">@ {exp.company}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 font-mono">
                                    {exp.date}
                                </p>

                                <p className="text-gray-300 leading-relaxed max-w-lg">
                                    {exp.description}
                                </p>

                                {/* Git Tag Decorations */}
                                <div className="mt-4 flex gap-2">
                                     <motion.span
                                                style={{
                                                  display: "inline-flex", alignItems: "center", gap: "10px",
                                                  padding: "8px 28px", borderRadius: "6px",
                                                  background: `linear-gradient(135deg, rgba(27,255,255,0.12), rgba(255,16,240,0.12))`,
                                                  border: `1px solid rgba(27,255,255,0.3)`,
                                                  color: "#fff", textDecoration: "none",
                                                  fontSize: "13px", fontFamily: "monospace",
                                                  letterSpacing: "0.08em", textTransform: "uppercase",
                                                  transition: "all 0.2s ease",
                                                }}
                                              >
                                                 
                                                {exp.jobType}
                                              </motion.span>
                                    
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;