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
    hatch.addEventListener('click', () => {
        hatch.classList.toggle('hatch-open');
    });
}

animate();