import React, { useEffect, useRef } from "react";

const CursorParticles = () => {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const hue = useRef(0); 
  const mouse = useRef({ x: undefined, y: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.pointerEvents = "none";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";

    class Particle {
      constructor() {
        this.x = mouse.current.x;
        this.y = mouse.current.y;
        this.size = Math.random() * 7 + 1;
        this.speedX = Math.random() * 1.2 - 0.9; // Slower movement
        this.speedY = Math.random() * 1.2 - 0.9; 
        this.color = `hsl(${hue.current}, 100%, 50%)`;
        this.life = 180; // Lasts longer
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.3) this.size -= 0.02; // Slower size reduction
        this.life -= 1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function handleParticles() {
      for (let i = 0; i < particlesArray.current.length; i++) {
        particlesArray.current[i].update();
        particlesArray.current[i].draw();
        if (particlesArray.current[i].life <= 0 || particlesArray.current[i].size <= 0.2) {
          particlesArray.current.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      hue.current++;
      requestAnimationFrame(animate);
    }

    const addParticles = (count) => {
      for (let i = 0; i < count; i++) {
        particlesArray.current.push(new Particle());
      }
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;
      addParticles(10);
    };

    const handleClick = (e) => {
      mouse.current.x = e.x;
      mouse.current.y = e.y;
      addParticles(50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CursorParticles;