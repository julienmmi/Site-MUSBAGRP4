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
});
