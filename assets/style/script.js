
document.addEventListener('DOMContentLoaded', function() {
    const headerLinks = document.querySelectorAll('.en-tete .lien');
    const menuOverlay = document.getElementById('menu-overlay');
    const menus = {
        'Visite': 'menu-visite',
        'Découvrir': 'menu-decouvrir',
        'L\'histoire du musée': 'menu-histoire',
        'Voir plus': 'menu-savoir-plus'
    };
    
    let activeMenu = null;
    let activeLink = null;
    
    function positionnerMenu(link, menu) {
        if (!link || !menu) return;
        
        const linkRect = link.getBoundingClientRect();
        const header = document.querySelector('.en-tete');
        if (!header) return;
        
        const headerRect = header.getBoundingClientRect();
        const menuContenu = menu.querySelector('.menu-contenu-blanc');
        let menuListe = menu.querySelector('.menu-liste');
        
        if (!menuListe && menuContenu) {
            menuListe = menuContenu.querySelector('.menu-liste');
        }
        
        if (menuContenu && menuListe) {
            menu.style.left = '0';
            menu.style.top = (headerRect.bottom - 45) + 'px';
            
            const linkStyle = window.getComputedStyle(link);
            const linkPaddingLeft = parseFloat(linkStyle.paddingLeft) || 12;
            
            const menuLinkPadding = 24;
            menuListe.style.paddingLeft = (linkRect.left + linkPaddingLeft - menuLinkPadding) + 'px';
        }
    }
    
    function ouvrirMenu(link, menuId) {
        if (activeMenu && activeMenu.id === menuId) {
            fermerMenu();
            return;
        }
        
        if (activeMenu && activeMenu.id !== menuId) {
            fermerMenu();
        }
        
        const menu = document.getElementById(menuId);
        if (menu) {
            positionnerMenu(link, menu);
            if (menuOverlay) {
                menuOverlay.classList.add('active');
            }
            menu.classList.add('active');
            activeMenu = menu;
            activeLink = link;
            link.classList.add('menu-actif');
        }
    }
    
    function fermerMenu() {
        if (activeMenu) {
            menuOverlay.classList.remove('active');
            activeMenu.classList.remove('active');
            if (activeLink) {
                activeLink.classList.remove('menu-actif');
            }
            activeMenu = null;
            activeLink = null;
        }
    }
    
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            const menuId = menus[linkText];
            
            if (menuId) {
                ouvrirMenu(this, menuId);
            }
        });
    });
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                fermerMenu();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fermerMenu();
        }
    });
    
    let scrollTimeout = null;
    
    window.addEventListener('resize', function() {
        if (activeMenu && activeLink) {
            positionnerMenu(activeLink, activeMenu);
        }
    });
    
    window.addEventListener('scroll', function() {
        if (activeMenu && activeLink) {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(function() {
                positionnerMenu(activeLink, activeMenu);
            });
        }
    }, { passive: true });
    
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-expo-temp, .section-collections, .section-histoire, .section-boutique');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const langSelector = document.querySelector('.lang-text');
    if (langSelector) {
        langSelector.addEventListener('click', function() {
            const currentLang = this.textContent;
            this.textContent = currentLang === 'FR-EN' ? 'EN-FR' : 'FR-EN';
        });
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
