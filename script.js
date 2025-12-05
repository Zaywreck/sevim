const heartField = document.getElementById("heartField");
const HEART_COLORS = ["#ff8fb1", "#ff6cab", "#ffb5f9", "#f9d56e", "#9c7bff"];

function createHeart() {
  if (!heartField) return;

  const heart = document.createElement("span");
  heart.className = "heart";

  const size = 14 + Math.random() * 22;
  const duration = 7 + Math.random() * 6;
  const left = Math.random() * 100;
  const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--color", color);
  heart.style.setProperty("--left", `${left}%`);

  heartField.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function startHeartStream() {
  createHeart();
  const delay = 280 + Math.random() * 620;
  setTimeout(startHeartStream, delay);
}

window.addEventListener("load", () => {
  startHeartStream();
});


