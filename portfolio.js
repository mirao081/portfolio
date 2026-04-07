document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const projectCards = document.querySelectorAll(".project-card");
  const heroCanvas = document.getElementById("hero-canvas");

  // === Reveal on scroll ===
  const revealElements = (elements, offset = 100) => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - offset) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", () => {
    revealElements(sections);
    revealElements(projectCards, 150);
  });

  // Trigger once on load
  revealElements(sections);
  revealElements(projectCards, 150);

  // === Hero Canvas Animation ===
  if (heroCanvas) {
    const ctx = heroCanvas.getContext("2d");
    const shell = heroCanvas.parentElement;
    const points = [];
    const pointCount = 120;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    let angle = 0;

    const resizeCanvas = () => {
      const rect = shell.getBoundingClientRect();
      heroCanvas.width = rect.width * window.devicePixelRatio;
      heroCanvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const generatePointCloud = () => {
      points.length = 0;
      for (let i = 0; i < pointCount; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / pointCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        points.push({
          x: Math.cos(theta) * Math.sin(phi),
          y: Math.sin(theta) * Math.sin(phi),
          z: Math.cos(phi)
        });
      }
    };

    const rotateY = (point, rotation) => ({
      x: point.x * Math.cos(rotation) - point.z * Math.sin(rotation),
      y: point.y,
      z: point.x * Math.sin(rotation) + point.z * Math.cos(rotation)
    });

    const rotateX = (point, rotation) => ({
      x: point.x,
      y: point.y * Math.cos(rotation) - point.z * Math.sin(rotation),
      z: point.y * Math.sin(rotation) + point.z * Math.cos(rotation)
    });

    const draw = () => {
      const w = shell.clientWidth;
      const h = shell.clientHeight;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(w, h) * 0.26;
      const perspective = 2.8;

      ctx.clearRect(0, 0, w, h);

      points.forEach((base) => {
        let p = rotateY(base, angle + mouseOffsetX * 0.35);
        p = rotateX(p, mouseOffsetY * 0.25);

        const depth = perspective / (perspective - p.z);
        const x2d = centerX + p.x * radius * depth;
        const y2d = centerY + p.y * radius * depth;
        const size = Math.max(1, 3 * depth);

        ctx.beginPath();
        ctx.fillStyle = `rgba(124, 58, 237, ${0.25 + (p.z + 1) * 0.28})`;
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < points.length; i += 4) {
        const p1 = rotateY(points[i], angle + mouseOffsetX * 0.35);
        const p2 = rotateY(points[(i + 11) % points.length], angle + mouseOffsetX * 0.35);

        const d1 = perspective / (perspective - p1.z);
        const d2 = perspective / (perspective - p2.z);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(6, 182, 212, 0.22)";
        ctx.lineWidth = 1;
        ctx.moveTo(centerX + p1.x * radius * d1, centerY + p1.y * radius * d1);
        ctx.lineTo(centerX + p2.x * radius * d2, centerY + p2.y * radius * d2);
        ctx.stroke();
      }

      angle += 0.004;
      requestAnimationFrame(draw);
    };

    shell.addEventListener("pointermove", (event) => {
      const rect = shell.getBoundingClientRect();
      mouseOffsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 1.3;
      mouseOffsetY = ((event.clientY - rect.top) / rect.height - 0.5) * -1.1;
    });

    shell.addEventListener("pointerleave", () => {
      mouseOffsetX = 0;
      mouseOffsetY = 0;
    });

    resizeCanvas();
    generatePointCloud();
    draw();
    window.addEventListener("resize", resizeCanvas);
  }

// === Contact Form Handling with EmailJS ===
if (typeof emailjs !== "undefined") {

  emailjs.init("9qpoBKds0Z9e4CEFS");

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();

      emailjs.sendForm("service_p8p78cy", "template_hgu0rm9", this)
        .then(() => {
          alert("Message sent successfully!");
          contactForm.reset();
        }, (error) => {
          alert("Failed to send message. Error: " + JSON.stringify(error));
        });
    });
  }

}

  // === Hamburger Menu ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
