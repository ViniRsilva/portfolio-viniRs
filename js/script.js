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

  const subTitle = document.getElementById("subTitleHome");

  var span = document.getElementById("subTitleHome");
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
nav.addEventListener("click", () => {
  nav.classList.toggle("active");
  const primarysButton = document.querySelectorAll(".primary-button");

  Array.from(primarysButton).forEach((e) => {
    e.classList.toggle("active");
  });
});
