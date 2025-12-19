// Script pour afficher/masquer les menus déroulants

document.addEventListener('DOMContentLoaded', function () {
    // Associer chaque lien de navigation à son menu déroulant
    const navLinks = document.querySelectorAll('.nav-links .lien');
    const overlay = document.getElementById('menu-overlay');
    const menus = document.querySelectorAll('.menu-deroulant');

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            menus.forEach(menu => menu.classList.remove('active'));
            overlay.classList.add('active');
            const menuId = link.getAttribute('data-menu') || link.textContent.trim().toLowerCase();
            const menu = document.getElementById('menu-' + menuId);
            if (menu) menu.classList.add('active');
        });
    });

    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                menus.forEach(menu => menu.classList.remove('active'));
            }
        });
    }

    menus.forEach(menu => {
        const closeBtn = menu.querySelector('.menu-fermer');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                overlay.classList.remove('active');
                menus.forEach(menu => menu.classList.remove('active'));
            });
        }
    });
    
});
