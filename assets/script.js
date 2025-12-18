// Script pour afficher/masquer les menus déroulants

document.addEventListener('DOMContentLoaded', function () {
    // Associer chaque lien de navigation à son menu déroulant
    const navLinks = document.querySelectorAll('.nav-links .lien');
    const overlay = document.getElementById('menu-overlay');
    const menus = document.querySelectorAll('.menu-deroulant');

    // Associer les liens à leur menu (par index ou data-menu)
    navLinks.forEach((link, idx) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            // Fermer tous les menus
            menus.forEach(menu => menu.classList.remove('active'));
            overlay.classList.add('active');
            // Afficher le menu correspondant (par convention d'id)
            const menuId = link.getAttribute('data-menu') || link.textContent.trim().toLowerCase();
            const menu = document.getElementById('menu-' + menuId);
            if (menu) menu.classList.add('active');
        });
    });

    // Fermer le menu si on clique sur l'overlay
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                menus.forEach(menu => menu.classList.remove('active'));
            }
        });
    }

    // Optionnel : bouton de fermeture dans chaque menu
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
