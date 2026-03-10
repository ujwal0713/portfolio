// Added change: always reset the page to the top on refresh.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelectorAll('.mobile-nav-links a, .nav a, .brand');
const year = document.getElementById('year');
const themeToggle = document.querySelector('.theme-toggle');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

// Added change: apply the chosen theme to the document and keep the toggle accessible.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  if (!themeToggle) {
    return;
  }

  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Enable light mode' : 'Enable dark mode');
  themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function closeMenu() {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.hidden = true;
}

// Added change: always start in light mode after every refresh.
applyTheme('light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.hidden;
    mobileMenu.hidden = isOpen;
    menuToggle.classList.toggle('is-open', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

// Added change: prevent empty placeholder links from jumping to the top of the page.
document.querySelectorAll('[data-disabled-link="true"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
  });
});

