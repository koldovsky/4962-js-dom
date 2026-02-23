const burgerButton = document.querySelector('.header__burger');
const menuOverlay = document.querySelector('.header__menu-overlay');
const menuItems = document.querySelectorAll('.header__menu-overlay__content .menu__item');

function toggleMenu() {
  burgerButton.classList.toggle('header__burger--open');
  menuOverlay.classList.toggle('header__menu-overlay--open');
}

function closeMenu() {
  burgerButton.classList.remove('header__burger--open');
  menuOverlay.classList.remove('header__menu-overlay--open');
}

// Toggle menu on burger button click
burgerButton.addEventListener('click', toggleMenu);

// Close menu on menu item click
menuItems.forEach(item => {
  item.addEventListener('click', closeMenu);
});

// Close menu on overlay background click (but not on content)
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) {
    closeMenu();
  }
});
