document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerButton && navLinks) {
        burgerButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            burgerButton.classList.toggle('active');
        });
        
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnBurger = burgerButton.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnBurger && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burgerButton.classList.remove('active');
            }
        });
        
        const menuLinks = navLinks.querySelectorAll('.lien');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const menuName = this.getAttribute('data-menu');
                    const sousMenu = navLinks.querySelector(`[data-submenu="${menuName}"]`);
                    
                    if (sousMenu) {
                        const isActive = sousMenu.classList.contains('active');
                        
                        navLinks.querySelectorAll('.sous-menu').forEach(menu => {
                            menu.classList.remove('active');
                        });
                        navLinks.querySelectorAll('.lien').forEach(l => {
                            l.classList.remove('active');
                        });
                        
                        if (!isActive) {
                            sousMenu.classList.add('active');
                            this.classList.add('active');
                        }
                    }
                }
            });
        });

        const sousMenuLinks = navLinks.querySelectorAll('.sous-menu a');
        sousMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burgerButton.classList.remove('active');
            });
        });
    }

    const navLinksDesktop = document.querySelectorAll('.nav-links .lien');
    const menuVisite = document.getElementById('menu-visite');
    const menuDecouvrir = document.getElementById('menu-decouvrir');
    const menuHistoire = document.getElementById('menu-histoire');
    const menuSavoirPlus = document.getElementById('menu-savoir-plus');
    const allMenus = [menuVisite, menuDecouvrir, menuHistoire, menuSavoirPlus];
    const header = document.querySelector('.en-tete');
    
    let closeTimeout = null;
    let currentMenu = null;

    function closeAllMenus() {
        allMenus.forEach(menu => {
            if (menu) {
                menu.classList.remove('active');
            }
        });
        currentMenu = null;
    }
    
    function closeMenuWithDelay() {
        closeTimeout = setTimeout(function() {
            closeAllMenus();
        }, 150);
    }
    
    function cancelClose() {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
    }

    function openMenuUnderLink(menu, link) {
        cancelClose();
        
        if (!menu || !link) return;
        
        const linkRect = link.getBoundingClientRect();
        const newMarginLeft = (linkRect.left - 32) + 'px';
        
        if (currentMenu === menu && menu.classList.contains('active')) {
            const contenu = menu.querySelector('.menu-contenu-blanc');
            if (contenu) {
                contenu.style.marginLeft = newMarginLeft;
            }
            return;
        }
        
        if (currentMenu && currentMenu !== menu) {
            currentMenu.classList.remove('active');
        }
        
        const contenu = menu.querySelector('.menu-contenu-blanc');
        if (contenu) {
            contenu.style.marginLeft = newMarginLeft;
        }
        
        menu.classList.add('active');
        currentMenu = menu;
    }

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

    const navContainer = document.querySelector('.nav-container');
    document.addEventListener('click', function(event) {
        const isClickInMenu = allMenus.some(menu => menu && menu.contains(event.target));
        const isClickInNav = navContainer && navContainer.contains(event.target);
        
        if (!isClickInMenu && !isClickInNav) {
            cancelClose();
            closeAllMenus();
        }
    });

    const popupTarifs = document.getElementById('popup-tarifs');
    const btnFermerPopup = popupTarifs ? popupTarifs.querySelector('.btn-fermer') : null;
    let popupFerme = false;
    
    if (popupTarifs) {
        function checkScroll() {
            if (popupFerme) return;
            
            const scrollY = window.scrollY || window.pageYOffset;
            
            if (scrollY > 200) {
                popupTarifs.classList.add('visible');
            } else {
                popupTarifs.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', checkScroll, { passive: true });
        
        checkScroll();
        
        if (btnFermerPopup) {
            btnFermerPopup.addEventListener('click', function() {
                popupTarifs.classList.remove('visible');
                popupFerme = true;
            });
        }
    }
});
