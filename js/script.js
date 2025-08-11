document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.querySelector(".grid-container");

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gridContainer.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  const passwordGroup = document.querySelector('.password-group');
  const toggleIcon = document.createElement("span");
  toggleIcon.classList.add("icon", "toggle-password");
  toggleIcon.innerHTML = `<i class="fa fa-eye"></i>`;
  passwordGroup.appendChild(toggleIcon);

  toggleIcon.addEventListener("click", () => {
    const passwordInput = passwordGroup.querySelector("input");
    const icon = toggleIcon.querySelector("i");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });

  const darkModeBtn = document.getElementById("darkModeToggle");
  const body = document.body;
  const rightPanel = document.querySelector(".right-panel");

  let particleColor = "rgba(150,150,150,0.3)";

  darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      body.style.backgroundColor = "#1f1f1f";
      rightPanel.style.backgroundColor = "#2c2c2c";
      darkModeBtn.innerHTML = `<i class="fa fa-sun"></i>`;
      particleColor = "rgba(255,255,255,0.3)";
    } else {
      body.style.backgroundColor = "#d3d2d0ff";
      rightPanel.style.backgroundColor = "#f3f0ff";
      darkModeBtn.innerHTML = `<i class="fa fa-moon"></i>`;
      particleColor = "rgba(150,150,150,0.3)";
    }
  });

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = particleColor;

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});
