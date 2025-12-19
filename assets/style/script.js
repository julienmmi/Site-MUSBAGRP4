// Menu burger - Toggle du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerButton && navLinks) {
        burgerButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animation du burger (optionnel - transformation en X)
            burgerButton.classList.toggle('active');
        });
        
        // Fermer le menu si on clique en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnBurger = burgerButton.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnBurger && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burgerButton.classList.remove('active');
            }
        });
        
        // Fermer le menu si on clique sur un lien
        const menuLinks = navLinks.querySelectorAll('.lien');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burgerButton.classList.remove('active');
            });
        });
    }

    // Menus déroulants PC - Survol
    const navLinksDesktop = document.querySelectorAll('.nav-links .lien');
    const menuVisite = document.getElementById('menu-visite');
    const menuDecouvrir = document.getElementById('menu-decouvrir');
    const menuHistoire = document.getElementById('menu-histoire');
    const menuSavoirPlus = document.getElementById('menu-savoir-plus');
    const allMenus = [menuVisite, menuDecouvrir, menuHistoire, menuSavoirPlus];
    const header = document.querySelector('.en-tete');

    // Fonction pour fermer tous les menus
    function closeAllMenus() {
        allMenus.forEach(menu => {
            if (menu) {
                menu.classList.remove('active');
                const contenu = menu.querySelector('.menu-contenu-blanc');
                if (contenu) contenu.style.marginLeft = '';
            }
        });
    }

    // Fonction pour positionner le contenu sous le lien (rectangle pleine largeur)
    function openMenuUnderLink(menu, link) {
        closeAllMenus();
        if (menu && link) {
            // Obtenir la position du lien
            const linkRect = link.getBoundingClientRect();
            
            // Positionner le contenu du menu sous le lien
            const contenu = menu.querySelector('.menu-contenu-blanc');
            if (contenu) {
                contenu.style.marginLeft = (linkRect.left - 32) + 'px'; // 32px = padding du menu
            }
            
            menu.classList.add('active');
        }
    }

    // Association des liens aux menus (FR et EN)
    navLinksDesktop.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                // Français
                if (linkText === 'visite' || linkText === 'visit') {
                    openMenuUnderLink(menuVisite, link);
                } else if (linkText === 'découvrir' || linkText === 'discover') {
                    openMenuUnderLink(menuDecouvrir, link);
                } else if (linkText === "l'histoire du musée" || linkText === 'museum history') {
                    openMenuUnderLink(menuHistoire, link);
                } else if (linkText === 'voir plus' || linkText === 'see more') {
                    openMenuUnderLink(menuSavoirPlus, link);
                }
            }
        });
    });

    // Garder le menu ouvert quand on survole le menu lui-même
    allMenus.forEach(menu => {
        if (menu) {
            menu.addEventListener('mouseenter', function() {
                // Ne rien faire, le menu reste ouvert
            });

            menu.addEventListener('mouseleave', function() {
                closeAllMenus();
            });
        }
    });

    // Fermer le menu si on quitte la zone de navigation
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.addEventListener('mouseleave', function(e) {
            // Vérifier si on va vers un menu déroulant
            const relatedTarget = e.relatedTarget;
            const isGoingToMenu = allMenus.some(menu => menu && menu.contains(relatedTarget));
            
            if (!isGoingToMenu) {
                closeAllMenus();
            }
        });
    }

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function(event) {
        const isClickInMenu = allMenus.some(menu => menu && menu.contains(event.target));
        const isClickInNav = navContainer && navContainer.contains(event.target);
        
        if (!isClickInMenu && !isClickInNav) {
            closeAllMenus();
        }
    });
});
