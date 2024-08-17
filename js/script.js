document.addEventListener("DOMContentLoaded", () => {
  var root = document.documentElement;

  var sizePhaseOne = "-28vw";
  var sizePhaseTwo = "-14vw";
  calculateSizeBgPosition();

  function calculateSizeBgPosition() {
    const sizeWidth = window.innerWidth;
    if (sizeWidth <= 680) {
      sizePhaseOne = "-69vw";
      sizePhaseTwo = "-35vw";
    } else if (sizeWidth <= 1369) {
      sizePhaseOne = "-41vw";
      sizePhaseTwo = "-20vw";
    } else {
      sizePhaseOne = "-28vw";
      sizePhaseTwo = "-14vw";
    }
    root.style.setProperty("--size-phase-home-presentation", sizePhaseTwo);
    root.style.setProperty("--size-phase-home-presentation", sizePhaseOne);
  }

  window.addEventListener("resize", calculateSizeBgPosition);

  const subTitle = document.getElementById("sub-title-main");

  var span = document.getElementById("sub-title-main");
  var words = ["Desenvolvedor de software", "Vinícius Silva"];
  var index = 0;

  changeText();

  function changeText() {
    span.textContent = words[index];
    index = (index + 1) % words.length;
  }

  setInterval(changeText, 13000);
  const observe = new MutationObserver(() => {
    console.log("Conteúdo do span foi alterado:", normalizeText(subTitle.textContent));
    if (normalizeText(subTitle.textContent) == normalizeText("vinicius silva")) {
      root.style.setProperty("--size-phase-home-presentation", sizePhaseTwo);
    } else {
      root.style.setProperty("--size-phase-home-presentation", sizePhaseOne);
    }
  });

  const config = { childList: true };
  observe.observe(subTitle, config);

  function normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  const buttonContactMe = document.getElementById("contact-me");
  buttonContactMe.addEventListener("click", (elem) => {
    const modalContactMe = document.getElementById("modal-contact-me");
    modalContactMe.showModal();
    elem.classList.toggle("active");
  });

  const closeModalContactMe = document.getElementById("close-modal-contact-me");
  closeModalContactMe.addEventListener("click", (elem) => {
    const modalContactMe = document.getElementById("modal-contact-me");
    modalContactMe.close();
    elem.classList.toggle("active");
  });
  // modal-contact-me

  const downloadCvButton = document.getElementById("baixar-cv");
  downloadCvButton.addEventListener("click", () => {
    console.log("downloadCvButton clicked");
    window.location.href = "../assets/curriculo/Vinicius-cc-en.pdf";
  });
});

document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollY = window.scrollY;
  if (scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const nav = document.getElementById("nav-menu");
const hambungerButton = document.getElementById("buttom-menu-mobile");
hambungerButton.addEventListener("click", () => {
  nav.classList.toggle("active");
  const primarysButton = document.querySelectorAll(".primary-button");

  Array.from(primarysButton).forEach((e) => {
    e.classList.toggle("active");
  });
});

// CURSOR
const mouseCoords = { x: 0, y: 0 };
const mouseCoordsPrevious = { x: 0, y: 0 };
const circleCoords = { x: 0, y: 0 };
let currentScaleValue = 0;
const kpConstant = 0.2;

document.addEventListener("DOMContentLoaded", () => {
  bootstrap();
});

function bootstrap() {
  moveCircle();
}

document.addEventListener("mousemove", function (e) {
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
});

function moveCircle() {
  const circle = document.querySelector(".circle");

  circleCoords.x += (mouseCoords.x - circleCoords.x) * kpConstant;
  circleCoords.y += (mouseCoords.y - circleCoords.y) * kpConstant;
  const { x, y } = circleCoords;

  const deltaMouseX = mouseCoords.x - mouseCoordsPrevious.x;
  const deltaMouseY = mouseCoords.y - mouseCoordsPrevious.y;

  const angleBetweenPointsRadians = Math.atan2(deltaMouseY, deltaMouseX);
  const angleBetweenPointsDegree = (angleBetweenPointsRadians * 180) / Math.PI;

  // limited in 150
  const distan = Math.min(Math.sqrt(Math.pow(deltaMouseX, 2) + Math.pow(deltaMouseY, 2)) * 4, 150);
  // convert to new scale to use in scale css after. [0, 150] -> [0 , 0.5]
  const scaleDist = (distan / 150) * 0.5;

  currentScaleValue += (scaleDist - currentScaleValue) * kpConstant;

  mouseCoordsPrevious.x = mouseCoords.x;
  mouseCoordsPrevious.y = mouseCoords.y;

  const translateTransform = `translate(${x}px,${y}px)`;
  const scaleTransform = `scale(${1 + currentScaleValue}, ${1 - currentScaleValue})`;
  const rotateTransform = `rotate(${angleBetweenPointsDegree}deg)`;

  circle.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
  // circle.style.transform = `translate(${x}px,${y}px) scale(${1 + currentScaleValue}, ${1 - currentScaleValue}) `;

  requestAnimationFrame(moveCircle);
}
