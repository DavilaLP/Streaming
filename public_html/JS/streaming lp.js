// Manejo del menú de navegación móvil
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

// Abrir/cerrar el menú cuando el botón es presionado
menuToggle.addEventListener('click', function () {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
    navList.style.display = expanded ? 'none' : 'block';
});

// Cerrar el menú cuando se hace clic fuera del menú
window.addEventListener('click', function (event) {
    if (!event.target.matches('#menu-toggle') && !event.target.matches('#nav-list') && !event.target.closest('#nav-list')) {
        navList.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});
