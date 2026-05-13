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

// ===============================================
// Logica HERO
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Efecto Glow que sigue al ratón
    const glow = document.getElementById("mouse-glow");
    const heroSection = document.getElementById("hero");

    if (heroSection && glow) {
        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Centrar el brillo en el cursor
            glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
        });
    }

    // 2. Efecto Parallax en movimiento del ratón
    document.addEventListener("mousemove", parallaxFunction);

    function parallaxFunction(e) {
        document.querySelectorAll(".parallax").forEach(function(move) {
            var speed = move.getAttribute("data-speed");
            var x = (window.innerWidth - e.pageX * speed) / 100;
            var y = (window.innerHeight - e.pageY * speed) / 100;

            move.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // 3. Efecto Typewriter (Máquina de escribir) para el código
    const codeText = `function analyzeLogic(code) {\n  const structure = parse(code);\n  return generateUML(structure);\n}\n\n// AI AutoDoc initialized...`;
    const typeTarget = document.getElementById("typewriter-code");
    let i = 0;

    function typeWriter() {
        if (i < codeText.length) {
            typeTarget.innerHTML += codeText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Velocidad de escritura
        } else {
            // Reiniciar animación después de unos segundos
            setTimeout(() => {
                typeTarget.innerHTML = '';
                i = 0;
                typeWriter();
            }, 5000);
        }
    }

    // Iniciar el typewriter si el elemento existe
    if(typeTarget) {
        setTimeout(typeWriter, 1000); // Pequeño retraso al cargar
    }
});