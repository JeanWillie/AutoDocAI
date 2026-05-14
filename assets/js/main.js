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

//LOGICA NAV MOVIL

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const toggleIcon = navToggle.querySelector('i');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        // Toggle de la clase activa
        navLinks.classList.toggle('nav-active');
        
        // Cambio de icono: de hamburguesa (list) a cerrar (x)
        if (navLinks.classList.contains('nav-active')) {
            toggleIcon.classList.replace('bi-list', 'bi-x');
            navToggle.style.transform = 'rotate(90deg)';
        } else {
            toggleIcon.classList.replace('bi-x', 'bi-list');
            navToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Cerrar el menú automáticamente al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            toggleIcon.classList.replace('bi-x', 'bi-list');
            navToggle.style.transform = 'rotate(0deg)';
        });
    });
}

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
        if(windows.innerWidth > 667){
                  document.querySelectorAll(".parallax").forEach(function(move) {
            var speed = move.getAttribute("data-speed");
            var x = (window.innerWidth - e.pageX * speed) / 100;
            var y = (window.innerHeight - e.pageY * speed) / 100;

            move.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    } else  {
        // En móvil, reseteamos el transform para que todo quede en su sitio
        document.querySelectorAll(".parallax").forEach(function(move) {
            move.style.transform = `translateX(0px) translateY(0px)`;
        });
    }
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
   card.addEventListener('click', (e) => {
        // Evita que el clic se propague a otros elementos
        e.stopPropagation();
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


// ==========================================
// LOGIA SECTION: The vision
// ======================================
// Añadir al final de main.js
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
for(let i=0; i<30; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function animateVision() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(112, 0, 255, 0.2)';
    ctx.lineWidth = 1;

    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dibujar líneas entre partículas cercanas
        for(let j=index+1; j<particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if(dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animateVision);
}

animateVision();

// ===============================================
// SECTION FEATURES
// ==========================================

// Usamos una función autoejecutable para evitar conflictos de nombres (Scope)
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        
        // 1. Lógica de TILT (Inclinación) con validación
        const featureCards = document.querySelectorAll('.f-card');
        
        if (featureCards.length > 0) {
            featureCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 12; // Suavizado
                    const rotateY = (centerX - x) / 12;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
                });
            });
        }

        // 2. Scroll Reveal con nombre único para no chocar con otros observers
        const revealElements = document.querySelectorAll('.reveal');
        
        if (revealElements.length > 0) {
            const featureObserverOptions = { threshold: 0.15 };
            
            const featureRevealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Dejamos de observar una vez que ya se mostró
                        featureRevealObserver.unobserve(entry.target);
                    }
                });
            }, featureObserverOptions);

            revealElements.forEach(el => featureRevealObserver.observe(el));
        }
    });
})();

// ===========================
// CTA SECTION
// ========================


// Efecto Magnético para el botón CTA
const magneticButton = document.querySelector('.btn-magnetic-wrap');

if (magneticButton) {
    magneticButton.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = magneticButton.getBoundingClientRect();
        
        // Calculamos la posición del cursor respecto al centro del botón
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        
        // El botón se mueve un 30% de la distancia del cursor
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        const btn = magneticButton.querySelector('.btn-cta-primary');
        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    magneticButton.addEventListener('mouseleave', () => {
        const btn = magneticButton.querySelector('.btn-cta-primary');
        btn.style.transform = `translate(0px, 0px)`;
    });
}

// ==================================
// FOOTER
// ==================================

// Lógica para el botón Back to Top
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Mostrar u ocultar según el scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { // Si baja más de 500px
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Acción al hacer clic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave nativo
        });
    });
}