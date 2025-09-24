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




// carrocel

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.track-element');
const dotsContainer = document.querySelector('.carousel-dots');

const visibleItems = 3; // quantidade de itens visíveis de cada vez
const totalItems = items.length;
const totalPages = totalItems - visibleItems + 1; // número de bolinhas

let currentIndex = 0;

// cria bolinhas baseado no totalPages
dotsContainer.innerHTML = '';
for (let i = 0; i < totalPages; i++) {
  const dot = document.createElement('button');
  dot.classList.add('carousel-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function goToSlide(index) {
  currentIndex = index;
  const offset = -(index * (100 / visibleItems));
  track.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

// setas
document.querySelector('.prev').addEventListener('click', () => {
  if (currentIndex > 0) goToSlide(currentIndex - 1);
});

document.querySelector('.next').addEventListener('click', () => {
  if (currentIndex < totalPages - 1) goToSlide(currentIndex + 1);
});
