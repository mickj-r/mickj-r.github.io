const startBtn = document.getElementById("startBtn");
const introScreen = document.getElementById("introScreen");

const starsBack = document.getElementById("starsBack");
const starsFront = document.getElementById("starsFront");
const particlesContainer = document.getElementById("particles");
const planets = document.querySelectorAll(".planet");
const sceneCamera = document.getElementById("sceneCamera");
const infoPanel = document.getElementById("infoPanel");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

const planetType = document.getElementById("planetType");
const planetName = document.getElementById("planetName");
const planetDescription = document.getElementById("planetDescription");
const planetFact = document.getElementById("planetFact");

const farLayers = document.querySelectorAll(".layer-far");
const midLayers = document.querySelectorAll(".layer-mid");

let selectedPlanet = null;
let introFinished = false;

/* estrelas de fundo */
for (let i = 0; i < 140; i++) {
  const star = document.createElement("span");
  star.classList.add("star");

  const size = Math.random() * 2 + 0.8;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDuration = `${2 + Math.random() * 5}s`;
  star.style.animationDelay = `${Math.random() * 4}s`;

  starsBack.appendChild(star);
}

/* estrelas da frente */
for (let i = 0; i < 90; i++) {
  const star = document.createElement("span");
  star.classList.add("star");

  const size = Math.random() * 3 + 1.1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDuration = `${2 + Math.random() * 4}s`;
  star.style.animationDelay = `${Math.random() * 4}s`;

  starsFront.appendChild(star);
}

/* partículas flutuando */
function createParticle() {
  const particle = document.createElement("span");
  particle.classList.add("particle");

  const size = Math.random() * 2 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${85 + Math.random() * 18}%`;
  particle.style.animationDuration = `${6 + Math.random() * 6}s`;

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 12000);
}

setInterval(createParticle, 350);

function clearFocusClasses() {
  sceneCamera.classList.remove(
    "focus-ignis",
    "focus-nereon",
    "focus-cryon",
    "focus-zephyria"
  );
}

function openPlanet(planet) {
  selectedPlanet = planet;

  const planetId = planet.dataset.planet;
  const name = planet.dataset.name;
  const type = planet.dataset.type;
  const description = planet.dataset.description;
  const fact = planet.dataset.fact;

  clearFocusClasses();
  sceneCamera.classList.add(`focus-${planetId}`);

  planets.forEach((item) => {
    item.classList.remove("selected");
    item.classList.add("dimmed");
  });

  planet.classList.remove("dimmed");
  planet.classList.add("selected");

  infoPanel.classList.remove("show");
  void infoPanel.offsetWidth;

  planetType.textContent = type;
  planetName.textContent = name;
  planetDescription.textContent = description;
  planetFact.textContent = fact;

  overlay.classList.add("show");
  infoPanel.classList.add("show");
}

function closePlanet() {
  selectedPlanet = null;
  clearFocusClasses();

  planets.forEach((planet) => {
    planet.classList.remove("selected", "dimmed");
  });

  overlay.classList.remove("show");
  infoPanel.classList.remove("show");
}

planets.forEach((planet) => {
  planet.addEventListener("click", () => {
    if (!introFinished) return;
    openPlanet(planet);
  });
});

closeBtn.addEventListener("click", closePlanet);
overlay.addEventListener("click", closePlanet);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePlanet();
  }
});

startBtn.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  introFinished = true;
});

/* parallax com mouse */
document.addEventListener("mousemove", (event) => {
  if (!introFinished) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  farLayers.forEach((layer) => {
    layer.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
  });

  midLayers.forEach((layer) => {
    layer.style.transform = `translate(${x * -18}px, ${y * -18}px)`;
  });

  if (!selectedPlanet) {
    sceneCamera.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
  }
});

document.addEventListener("mouseleave", () => {
  farLayers.forEach((layer) => {
    layer.style.transform = `translate(0, 0)`;
  });

  midLayers.forEach((layer) => {
    layer.style.transform = `translate(0, 0)`;
  });

  if (!selectedPlanet) {
    sceneCamera.style.transform = `translate(0, 0)`;
  }
});