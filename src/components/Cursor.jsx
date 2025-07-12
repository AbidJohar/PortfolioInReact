/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";

const CursorParticles = () => {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const hue = useRef(0);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.pointerEvents = "none";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1"; // Make visible on top

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = mouse.current.x;
        this.y = mouse.current.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = "#ffffff";
        this.life = 60; // Shorter life
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1; // faster shrink
        this.life -= 1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleParticles = () => {
      for (let i = 0; i < particlesArray.current.length; i++) {
        const p = particlesArray.current[i];
        p.update();
        p.draw();

        // Draw lines between close particles
        for (let j = i + 1; j < particlesArray.current.length; j++) {
          const dx = p.x - particlesArray.current[j].x;
          const dy = p.y - particlesArray.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particlesArray.current[j].x, particlesArray.current[j].y);
            ctx.stroke();
          }
        }

        // Remove dead particles
        if (p.life <= 0 || p.size <= 0.2) {
          particlesArray.current.splice(i, 1);
          i--;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      hue.current++;
      requestAnimationFrame(animate);
    };

    const addParticles = (count) => {
      if (mouse.current.x === null || mouse.current.y === null) return;
      for (let i = 0; i < count; i++) {
        particlesArray.current.push(new Particle());
      }
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      addParticles(5); // Reduce count for smoother render
    };

    const handleClick = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      addParticles(20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CursorParticles;
