import { popcornMessages } from "./messages.js";

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: -0.25, y: -0.5 };
let currentRotation = { x: -0.5, y: 0 };
let velocity = { x: 0, y: 0 };

const machine = document.getElementById("machine");

machine.addEventListener("mousedown", (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
  machine.classList.add("grabbing");
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  machine.classList.remove("grabbing");
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - previousMousePosition.x;
  const deltaY = e.clientY - previousMousePosition.y;

  targetRotation.y += deltaX * 0.005;
  targetRotation.x -= deltaY * 0.005;

  velocity.y = deltaX * 0.005;
  velocity.x = -deltaY * 0.005;

  previousMousePosition = { x: e.clientX, y: e.clientY };
});

machine.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  previousMousePosition = { x: touch.clientX, y: touch.clientY };
  machine.classList.add("grabbing");
});

document.addEventListener("touchend", () => {
  isDragging = false;
  machine.classList.remove("grabbing");
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - previousMousePosition.x;
  const deltaY = touch.clientY - previousMousePosition.y;

  targetRotation.y += deltaX * 0.005;
  targetRotation.x -= deltaY * 0.005;

  velocity.y = deltaX * 0.005;
  velocity.x = -deltaY * 0.005;

  previousMousePosition = { x: touch.clientX, y: touch.clientY };
});

function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    targetRotation.x += velocity.x;
    targetRotation.y += velocity.y;

    velocity.x *= 0.95;
    velocity.y *= 0.95;

    if (Math.abs(velocity.x) < 0.0001) velocity.x = 0;
    if (Math.abs(velocity.y) < 0.0001) velocity.y = 0;
  }

  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

  machine.style.transform = `rotateX(${currentRotation.x}rad) rotateY(${currentRotation.y}rad)`;
}

const hatch = document.querySelector('.hatch');

if (hatch) {
  hatch.addEventListener("click", () => {
    hatch.classList.add('hatch-open');

    const popcorn = document.createElement("div");
    popcorn.classList.add("irregular-popcorn");

    const faces = ["irreg-front", "irreg-back", "irreg-left", "irreg-right", "irreg-top", "irreg-bottom"];
    faces.forEach((face) => {
      const faceDiv = document.createElement("div");
      faceDiv.classList.add("irregular-face", face);
      popcorn.appendChild(faceDiv);
    });

    // Add to DOM first, at origin
    poppedContainer.appendChild(popcorn);

    // Force a reflow so that transition will trigger
    popcorn.getBoundingClientRect();

    // Now apply final random transform
    const offsetX = Math.random() * 150 - 75;
    const offsetY = Math.random() * 60 + 60;
    const rotX = 360 + Math.floor(Math.random() * 360);
    const rotY = 360 + Math.floor(Math.random() * 360);

    popcorn.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 40px) scale(1.1) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    // Auto-close hatch
    setTimeout(() => {
      hatch.classList.remove('hatch-open');
    }, 300);

    // Popcorn click to open modal
    popcorn.addEventListener("click", () => {
      const selected = popcornMessages[Math.floor(Math.random() * popcornMessages.length)];
      modal.querySelector(".message-header").textContent = selected.header;
      modal.querySelector(".message-body").textContent = selected.body;
      modal.classList.remove("hidden");
      popcorn.remove();
    });
  });
}

const poppedContainer = document.getElementById("popped-container");
const modal = document.getElementById("popcorn-modal");
const closeBtn = modal.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

animate();