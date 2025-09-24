window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.querySelector(".form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Inscrição enviada com sucesso!");
});


gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".about-img",
  { y: 200, scale: 0, opacity: 0 },
  {
    y: 0, scale: 1, opacity: 0.1,
    scrollTrigger: {
      trigger: ".about",
      start: "top 70%",
      end: "top 10%", // até onde a animação acontece
      scrub: true     // vincula ao scroll
    },
    ease: "power3.out"
  }
);


