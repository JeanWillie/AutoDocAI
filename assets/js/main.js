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


// ============================================
//   LOGICA SECTION The Struggle
// =============================================

const chaosCard = document.getElementById('chaos-card');

if (chaosCard) {
    chaosCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = chaosCard.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        // Inclinación dinámica
        chaosCard.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05)`;
    });

    chaosCard.addEventListener('mouseleave', () => {
        chaosCard.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
    });
}

// ============================================
//   LOGICA SECTION The Solution
// =============================================
// Agrega esto a tu main.js
const cards = document.querySelectorAll('.feature-card');
const coreIcon = document.querySelector('.core-icon');
const engineContainer = document.querySelector('.ai-engine-container');
const scanLine = document.querySelector('.scan-line');

// Definición de estados (Iconos de Bootstrap e intensidades)
const states = {
    processing: { icon: 'bi-lightning-charge-fill', color: '#00FF88', speed: '1.5s' },
    uml: { icon: 'bi-diagram-3-fill', color: '#00D1FF', speed: '4s' },
    universal: { icon: 'bi-globe-americas', color: '#7000FF', speed: '6s' }
};

cards.forEach(card => {
    card.addEventListener('click', () => {
        const mode = card.getAttribute('data-mode');
        
        // 1. Cambiar clase activa en tarjetas
        cards.forEach(c => c.classList.remove('active-card'));
        card.classList.add('active-card');

        // 2. Transición visual del núcleo
        coreIcon.style.opacity = '0'; // Efecto de desvanecimiento
        
        setTimeout(() => {
            // Cambiar icono y color según el objeto 'states'
            coreIcon.className = `bi ${states[mode].icon} core-icon`;
            coreIcon.style.color = states[mode].color;
            coreIcon.style.filter = `drop-shadow(0 0 15px ${states[mode].color})`;
            
            // Ajustar velocidad de la línea de escaneo
            scanLine.style.animationDuration = states[mode].speed;
            
            coreIcon.style.opacity = '1';
        }, 300);
    });
});