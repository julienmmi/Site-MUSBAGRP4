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

    // Menus déroulants PC - Survol avec délai
    const navLinksDesktop = document.querySelectorAll('.nav-links .lien');
    const menuVisite = document.getElementById('menu-visite');
    const menuDecouvrir = document.getElementById('menu-decouvrir');
    const menuHistoire = document.getElementById('menu-histoire');
    const menuSavoirPlus = document.getElementById('menu-savoir-plus');
    const allMenus = [menuVisite, menuDecouvrir, menuHistoire, menuSavoirPlus];
    const header = document.querySelector('.en-tete');
    
    let closeTimeout = null;
    let currentMenu = null;

    // Fonction pour fermer tous les menus
    function closeAllMenus() {
        allMenus.forEach(menu => {
            if (menu) {
                menu.classList.remove('active');
            }
        });
        currentMenu = null;
    }
    
    // Fonction pour fermer avec délai
    function closeMenuWithDelay() {
        closeTimeout = setTimeout(function() {
            closeAllMenus();
        }, 150);
    }
    
    // Fonction pour annuler la fermeture
    function cancelClose() {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
    }

    // Fonction pour positionner le contenu sous le lien
    function openMenuUnderLink(menu, link) {
        cancelClose();
        
        if (!menu || !link) return;
        
        // Obtenir la position du lien
        const linkRect = link.getBoundingClientRect();
        const newMarginLeft = (linkRect.left - 32) + 'px';
        
        // Si c'est le même menu déjà ouvert, juste mettre à jour la position
        if (currentMenu === menu && menu.classList.contains('active')) {
            const contenu = menu.querySelector('.menu-contenu-blanc');
            if (contenu) {
                contenu.style.marginLeft = newMarginLeft;
            }
            return;
        }
        
        // Si un autre menu est ouvert, le fermer d'abord sans animation
        if (currentMenu && currentMenu !== menu) {
            currentMenu.classList.remove('active');
        }
        
        // Positionner le contenu du nouveau menu AVANT de l'ouvrir
        const contenu = menu.querySelector('.menu-contenu-blanc');
        if (contenu) {
            contenu.style.marginLeft = newMarginLeft;
        }
        
        // Ouvrir le nouveau menu
        menu.classList.add('active');
        currentMenu = menu;
    }

    // Association des liens aux menus (FR et EN)
    navLinksDesktop.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                cancelClose();
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
        
        link.addEventListener('mouseleave', function() {
            closeMenuWithDelay();
        });
    });

    // Garder le menu ouvert quand on survole le menu lui-même
    allMenus.forEach(menu => {
        if (menu) {
            menu.addEventListener('mouseenter', function() {
                cancelClose();
            });

            menu.addEventListener('mouseleave', function() {
                closeMenuWithDelay();
            });
        }
    });

    // Fermer le menu si on clique ailleurs
    const navContainer = document.querySelector('.nav-container');
    document.addEventListener('click', function(event) {
        const isClickInMenu = allMenus.some(menu => menu && menu.contains(event.target));
        const isClickInNav = navContainer && navContainer.contains(event.target);
        
        if (!isClickInMenu && !isClickInNav) {
            cancelClose();
            closeAllMenus();
        }
    });

    // ===== POPUP TARIFS - Apparaît au scroll =====
    const popupTarifs = document.getElementById('popup-tarifs');
    const btnFermerPopup = popupTarifs ? popupTarifs.querySelector('.btn-fermer') : null;
    let popupFerme = false;
    
    if (popupTarifs) {
        // Afficher/masquer le popup selon le scroll
        function checkScroll() {
            if (popupFerme) return;
            
            const scrollY = window.scrollY || window.pageYOffset;
            
            if (scrollY > 200) {
                popupTarifs.classList.add('visible');
            } else {
                popupTarifs.classList.remove('visible');
            }
        }
        
        // Écouter le scroll
        window.addEventListener('scroll', checkScroll, { passive: true });
        
        // Vérifier au chargement
        checkScroll();
        
        // Bouton fermer
        if (btnFermerPopup) {
            btnFermerPopup.addEventListener('click', function() {
                popupTarifs.classList.remove('visible');
                popupFerme = true;
            });
        }
    }
});
