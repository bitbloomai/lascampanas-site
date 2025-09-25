const header = document.querySelector(".header");
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav ul');
const navLinks = document.querySelectorAll('.nav ul li a');

function updateHeaderBackground() {
  if (window.scrollY > 50 || navList.classList.contains('show')) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Scroll
window.addEventListener("scroll", updateHeaderBackground);

// Menu hamburguer
hamburger.addEventListener('click', () => {
  navList.classList.toggle('show');
  updateHeaderBackground();
});

// Fecha o menu ao clicar em qualquer link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('show')) {
      navList.classList.remove('show');
      updateHeaderBackground();
    }
  });
});


const linkBtn = document.querySelector('.lgnd-btn');
linkBtn.addEventListener('click', (e) => {
  const isMobile = window.innerWidth <= 800;
  const url = linkBtn.parentElement.href;

  if (isMobile) {
    e.preventDefault();
    setTimeout(() => {
      window.open(url);
    }, 500);
  }
});


let player;
const audioBtn = document.getElementById("audio-btn");

// Detecta se é mobile (largura menor que 800px)
const isMobile = window.innerWidth <= 800;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
  videoId: 'rXHVr_H2e3o',
  playerVars: {
    autoplay: 1,
    mute: isMobile ? 1 : 0,
    loop: 1,
    playlist: 'rXHVr_H2e3o',
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    rel: 0,
    playsinline: 1
  },
  events: { 'onReady': onPlayerReady }
});
}

function onPlayerReady(event) {
  event.target.playVideo();

  // Ajusta texto inicial do botão
  if (isMobile) {
    audioBtn.textContent = "🔇 Ativar áudio";
  } else {
    audioBtn.textContent = "🔊 Desativar áudio";
  }
}

audioBtn.addEventListener("click", () => {
  if (!player) return;

  if (player.isMuted()) {
    player.unMute();
    audioBtn.textContent = "🔊 Desativar áudio";
  } else {
    player.mute();
    audioBtn.textContent = "🔇 Ativar áudio";
  }
});

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".about-img",
  { y: 200, scale: 0, opacity: 0 },
  {
    y: 0, scale: 1, opacity: 0.1,
    scrollTrigger: {
      trigger: ".about",
      start: "top 70%",
      end: "top 10%",
      scrub: true
    },
    ease: "power3.out"
  }
);




// carrocel

const viewport = document.querySelector('.carousel-viewport');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');
const dotsNav = document.querySelector('.carousel-dots');

let currentIndex = 0;

function getVisibleItems() {
  return parseInt(getComputedStyle(viewport).getPropertyValue('--visible-items'));
}

function createDots() {
  dotsNav.innerHTML = '';
  const visibleItems = getVisibleItems();
  const totalPages = slides.length - visibleItems + 1;
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsNav.appendChild(dot);
  }
}

function updateCarousel() {
  const visibleItems = getVisibleItems();
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const move = currentIndex * (slideWidth + gap);
  track.style.transform = `translateX(-${move}px)`;

  // atualizar dots
  Array.from(dotsNav.children).forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= slides.length - visibleItems;
}

prevBtn.addEventListener('click', () => {
  const visibleItems = getVisibleItems();
  currentIndex = Math.max(currentIndex - 1, 0); // decrementa 1, mínimo 0
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  const visibleItems = getVisibleItems();
  const maxIndex = slides.length - visibleItems;
  currentIndex = Math.min(currentIndex + 1, maxIndex); // incrementa 1, máximo slides-visíveis
  updateCarousel();
});

// inicialização
createDots();
updateCarousel();

// recalcular ao redimensionar
window.addEventListener('resize', () => {
  const prevVisible = getVisibleItems();
  createDots();
  const maxIndex = slides.length - prevVisible;
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  updateCarousel();
});
