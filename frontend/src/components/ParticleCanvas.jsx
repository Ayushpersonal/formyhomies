import React, { useRef, useEffect } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000, active: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor(x, y, isHeart = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = -(Math.random() * 0.7 + 0.4);
        this.color = `hsla(${Math.random() * 45 + 335}, 90%, 78%, ${Math.random() * 0.4 + 0.3})`;
        this.isHeart = isHeart || Math.random() > 0.65;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;

        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 3.5;
            this.y += Math.sin(angle) * force * 3.5;
          }
        }

        if (this.y < -15) {
          this.y = canvas.height + 15;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;

        if (this.isHeart) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
          ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
          ctx.fill();
        } else {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(
              Math.cos((18 + i * 72) * Math.PI / 180) * this.size,
              Math.sin((18 + i * 72) * Math.PI / 180) * this.size
            );
            ctx.lineTo(
              Math.cos((54 + i * 72) * Math.PI / 180) * (this.size / 2),
              Math.sin((54 + i * 72) * Math.PI / 180) * (this.size / 2)
            );
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const initBackgroundParticles = () => {
      const count = Math.min(Math.floor(canvas.width / 22), 65);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };
    initBackgroundParticles();

    // Expose triggerBurst to global window context so subcomponents can emit bursts on actions
    window.triggerBurst = (centerX, centerY) => {
      const burstCount = 35;
      for (let i = 0; i < burstCount; i++) {
        const p = new Particle(centerX, centerY, true);
        p.speedX = (Math.random() - 0.5) * 9;
        p.speedY = (Math.random() - 0.5) * 9 - 2;
        p.size = Math.random() * 9 + 6;
        particles.push(p);
      }
    };

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        p.update();
        p.draw();
        if (particles.length > 80 && p.y < 0) {
          particles.splice(idx, 1);
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      delete window.triggerBurst;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleCanvas;
