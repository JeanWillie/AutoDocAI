//Logica aparicion suave (Scroll reveal)

const observerOptions = {
        threshold: 0.15 // El elemento aparece cuando se ve el 15% de él
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Deja de observar una vez que ya apareció
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos que queremos que "aparezcan"
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => revealOnScroll.observe(el));
 
// Lógica para la barra de navegación flotante
document.addEventListener('DOMContentLoaded', () => {
    const mainNavbar = document.getElementById('mainNavbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Cambia el valor '50' a la cantidad de scroll deseada
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    });
});