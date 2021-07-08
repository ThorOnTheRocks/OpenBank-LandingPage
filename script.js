'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// Selecting DOM Elements
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Creating DOM Elements
const msgCookie = document.createElement('div');

msgCookie.classList.add('cookie-message');
msgCookie.innerHTML = `<p>This website contains cookies for a better functionality</p> <button class="btn">Got it</button>`;
header.append(msgCookie);

// Events Handler
msgCookie.addEventListener('click', () => msgCookie.remove(msgCookie));
btnScrollTo.addEventListener('click', () => section1.scrollIntoView({ behavior: 'smooth' }));