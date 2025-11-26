// Intro logic
const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const stepsContainer = document.getElementById("steps");
const finalTextEl = document.getElementById("finalText");

const finalMessage =
  "Güzelliğin gözlerinde gözlerin kalbimde saklı. Seni çok seviyorum.";

let currentStep = 0;
let totalSteps = 0;

function initSteps() {
  const steps = stepsContainer.querySelectorAll(".step");
  totalSteps = steps.length;
  steps.forEach((step, index) => {
    if (index === 0) {
      step.classList.remove("step-hidden");
      requestAnimationFrame(() => {
        step.classList.add("step-visible");
      });
    } else {
      step.classList.add("step-hidden");
      step.classList.remove("step-visible");
    }
  });
}

function showNextStep() {
  const steps = stepsContainer.querySelectorAll(".step");
  if (currentStep < totalSteps - 1) {
    steps[currentStep].classList.add("step-hidden");
    currentStep++;
    const next = steps[currentStep];
    next.classList.remove("step-hidden");
    requestAnimationFrame(() => {
      next.classList.add("step-visible");
    });
    if (currentStep === totalSteps - 1) {
      nextButton.textContent = "Son bir şey 💌";
    }
  } else {
    nextButton.classList.add("hidden");
    typeFinalMessage();
  }
}

function typeFinalMessage() {
  finalTextEl.textContent = "";
  const chars = Array.from(finalMessage);
  let index = 0;

  const typer = setInterval(() => {
    if (index >= chars.length) {
      clearInterval(typer);
      // Trigger a final fireworks burst
      burstFireworks(6);
      return;
    }
    finalTextEl.textContent += chars[index];
    // small heart with some characters
    if (Math.random() < 0.2) {
      spawnFloatingHeart();
    }
    index++;
  }, 70);
}

startButton.addEventListener("click", () => {
  intro.classList.add("intro-hidden");
  // kick off continuous hearts and fireworks
  startHeartLoop();
  startFireworksLoop();
});

nextButton.addEventListener("click", showNextStep);

// Hearts
const heartsLayer = document.querySelector(".hearts-layer");

function spawnFloatingHeart() {
  if (!heartsLayer) return;
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 5 + Math.random() * 4;
  const scale = 0.7 + Math.random() * 0.7;
  heart.style.left = `${left}%`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.transform = `translate3d(0, 110%, 0) scale(${scale})`;
  heartsLayer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

function startHeartLoop() {
  setInterval(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnFloatingHeart, i * 350);
    }
  }, 1600);
}

// Fireworks
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let fireworks = [];
let lastTime = 0;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);

class Firework {
  constructor(x, y, color, sizeMultiplier = 1) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.life = 0;
    const particlesCount = 24 + Math.floor(Math.random() * 18);
    for (let i = 0; i < particlesCount; i++) {
      const angle = (Math.PI * 2 * i) / particlesCount;
      const speed = (1.2 + Math.random() * 1.1) * sizeMultiplier;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: 1.4 + Math.random() * 1.4 * sizeMultiplier,
        color,
      });
    }
  }

  update(delta) {
    this.life += delta;
    const gravity = 0.03;
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity;
      p.alpha -= 0.012;
    });
    this.particles = this.particles.filter((p) => p.alpha > 0);
    return this.particles.length > 0;
  }

  draw(context) {
    this.particles.forEach((p) => {
      context.save();
      context.globalAlpha = p.alpha;
      const gradient = context.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 2
      );
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(0.3, p.color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
      context.fill();
      context.restore();
    });
  }
}

function randomColor() {
  const colors = ["#ff99c8", "#ff6a88", "#ffc6ff", "#b28dff", "#f6e27f"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function spawnFirework(centerBias = 0.5, sizeMultiplier = 1) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const x =
    w * (centerBias + (Math.random() - 0.5) * 0.6 * (1 - centerBias * 0.6));
  const y = h * (0.25 + Math.random() * 0.3);
  fireworks.push(new Firework(x, y, randomColor(), sizeMultiplier));
}

function burstFireworks(count = 5) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnFirework(0.5, 1.3), i * 150);
  }
}

function startFireworksLoop() {
  setInterval(() => {
    const bias = 0.4 + Math.random() * 0.2;
    spawnFirework(bias, 1);
  }, 1600);
}

function render(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = (timestamp - lastTime) / 16.67;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  fireworks = fireworks.filter((fw) => fw.update(delta));
  fireworks.forEach((fw) => fw.draw(ctx));

  requestAnimationFrame(render);
}

// Init on load
window.addEventListener("load", () => {
  resizeCanvas();
  initSteps();
  requestAnimationFrame(render);
});


