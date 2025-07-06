const machine = document.getElementById('machine');

let isDragging = false;
let lastX = 0;
let lastY = 0;
let rotationX = -10;
let rotationY = 0;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  rotationY += deltaX * 0.5;
  rotationX -= deltaY * 0.5;

  machine.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  lastX = e.clientX;
  lastY = e.clientY;
});
