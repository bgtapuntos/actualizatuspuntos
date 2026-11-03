const carousel = document.querySelector('.carousel');
const nextBtn = document.querySelector('.nav.next');
const prevBtn = document.querySelector('.nav.prev');
const cards = Array.from(document.querySelectorAll('.card'));

let index = 0;

// compute how many cards fit in the visible area
function visibleCount(){
  const wrap = document.querySelector('.carousel-wrap');
  const available = wrap.clientWidth - 100; // account for nav button areas
  const cardWidth = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).gap || 12);
  return Math.max(1, Math.floor(available / cardWidth));
}

function updateButtons(){
  const maxIndex = Math.max(0, cards.length - visibleCount());
  prevBtn.toggleAttribute('disabled', index <= 0);
  nextBtn.toggleAttribute('disabled', index >= maxIndex);
}

function update(){
  const gap = parseFloat(getComputedStyle(carousel).gap) || 12;
  const cardWidth = cards[0].getBoundingClientRect().width;
  const shift = (cardWidth + gap) * index;
  carousel.style.transform = `translateX(-${shift}px)`;
  updateButtons();
}

nextBtn.addEventListener('click', () => {
  const maxIndex = Math.max(0, cards.length - visibleCount());
  index = Math.min(maxIndex, index + 1);
  update();
});

prevBtn.addEventListener('click', () => {
  index = Math.max(0, index - 1);
  update();
});

// handle resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // ensure index still valid
    const maxIndex = Math.max(0, cards.length - visibleCount());
    index = Math.min(index, maxIndex);
    update();
  }, 120);
});

// initialize
window.requestAnimationFrame(() => {
  update();
});