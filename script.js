'use strict';


// Selecting DOM Elements
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnsNavLinks = document.querySelectorAll('.nav__link');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsOperations = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1Coords = section1.getBoundingClientRect();
const allSection = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRigth = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


// Modal window
const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



// Creating DOM Elements
const msgCookie = document.createElement('div');

msgCookie.classList.add('cookie-message');
msgCookie.innerHTML = `<p>This website contains cookies for a better functionality</p> <button class="btn">Got it</button>`;
header.append(msgCookie);

// Smooth Scrolling
btnScrollTo.addEventListener('click', () => section1.scrollIntoView({ behavior: 'smooth' }));
// Smooth Scrolling on Nav Links
btnsNavLinks.forEach(btn => btn.addEventListener('click', (e) => {
  e.preventDefault();
  const id = btn.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
}))

//Menu Fade Animation Function
const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
}

// Events Handler
msgCookie.addEventListener('click', () => msgCookie.remove(msgCookie));

tabsContainer.addEventListener('click', (e) => {
  // Target element that trigger event
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  //Remove active class Button and Content
  tabsOperations.forEach(tab => tab.classList.remove('operations__tab--active'));
  operationsContent.forEach(content => content.classList.remove('operations__content--active'));

  // Add active class Button and Content
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

nav.addEventListener('mouseover', (e) => handleHover(e, 0.5));
nav.addEventListener('mouseout', (e) => handleHover(e, 1));

// Get Height Value NavBar
const navHeight = nav.getBoundingClientRect().height;

//Intersection Observer API to add sticky nav
const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

// Revealing Sections on Scroll

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// Load Good Imgs Quality on Scroll
const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return

  // Replace entry src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 1,
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slides
let currSlide = 0;
const maxSlide = slides.length;

// Functions
const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (slide) => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};


const goToSlide = (slide) => {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

const nextSlide = () => {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++
  }
  goToSlide(currSlide);
  activateDot(currSlide);
}

const prevSlide = () => {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--
  }
  goToSlide(currSlide);
  activateDot(currSlide);
}

const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
}

init();

btnRigth.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
