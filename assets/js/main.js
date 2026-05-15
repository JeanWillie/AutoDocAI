/**
 * TABLE OF CONTENTS:
 * 1. Scroll Reveal Logic (Global)
 * 2. Navbar Scrolling Logic
 * 3. Mobile Navigation Logic
 * 4. Hero Section Logic
 * 5. The Struggle Section Logic
 * 6. The Solution Section Logic
 * 7. The Vision Section Logic
 * 8. Features Section Logic
 * 9. CTA Section Logic
 * 10. Footer & Back to Top Logic
 * 11. Toast Notification Logic
 */

// ===============================================
// 1. Scroll Reveal Logic (Global)
// ===============================================
const observerOptions = {
        threshold: 0.15 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements to reveal
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => revealOnScroll.observe(el));

// ===============================================
// 2. Navbar Scrolling Logic
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    const mainNavbar = document.getElementById('mainNavbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    });
});

// ===============================================
// 3. Mobile Navigation Logic
// ===============================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const toggleIcon = navToggle.querySelector('i');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        // Toggle active class
        navLinks.classList.toggle('nav-active');
        
        // Change icon: hamburger (list) to close (x)
        if (navLinks.classList.contains('nav-active')) {
            toggleIcon.classList.replace('bi-list', 'bi-x');
            navToggle.style.transform = 'rotate(90deg)';
        } else {
            toggleIcon.classList.replace('bi-x', 'bi-list');
            navToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Automatically close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            toggleIcon.classList.replace('bi-x', 'bi-list');
            navToggle.style.transform = 'rotate(0deg)';
        });
    });
}

// ===============================================
// 4. Hero Section Logic
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    // 4.1 Mouse Glow Effect
    const glow = document.getElementById("mouse-glow");
    const heroSection = document.getElementById("hero");

    if (heroSection && glow) {
        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Center glow on cursor
            glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
        });
    }

    // 4.2 Mouse Parallax Effect
    document.addEventListener("mousemove", parallaxFunction);

    function parallaxFunction(e) {
        // Check if window width > 667px
        if(window.innerWidth > 667){
                  document.querySelectorAll(".parallax").forEach(function(move) {
            var speed = move.getAttribute("data-speed");
            var x = (window.innerWidth - e.pageX * speed) / 100;
            var y = (window.innerHeight - e.pageY * speed) / 100;

            move.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    } else  {
        // On mobile, reset transform
        document.querySelectorAll(".parallax").forEach(function(move) {
            move.style.transform = `translateX(0px) translateY(0px)`;
        });
    }
        }
  

    // 4.3 Typewriter Effect
    const codeText = `function analyzeLogic(code) {\n  const structure = parse(code);\n  return generateUML(structure);\n}\n\n// AI AutoDoc initialized...`;
    const typeTarget = document.getElementById("typewriter-code");
    let i = 0;

    function typeWriter() {
        if (i < codeText.length) {
            typeTarget.innerHTML += codeText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Typing speed
        } else {
            // Reset animation after a few seconds
            setTimeout(() => {
                typeTarget.innerHTML = '';
                i = 0;
                typeWriter();
            }, 5000);
        }
    }

    // Start typewriter if element exists
    if(typeTarget) {
        setTimeout(typeWriter, 1000); // Small delay on load
    }
});


// ===============================================
// 5. The Struggle Section Logic
// ===============================================

const chaosCard = document.getElementById('chaos-card');

if (chaosCard) {
    chaosCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = chaosCard.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        // Dynamic Tilt
        chaosCard.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05)`;
    });

    chaosCard.addEventListener('mouseleave', () => {
        chaosCard.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
    });
}

// ===============================================
// 6. The Solution Section Logic
// ===============================================

const cards = document.querySelectorAll('.feature-card');
const coreIcon = document.querySelector('.core-icon');
const engineContainer = document.querySelector('.ai-engine-container');
const scanLine = document.querySelector('.scan-line');

// State definition (Bootstrap icons and colors)
const states = {
    processing: { icon: 'bi-lightning-charge-fill', color: '#00FF88', speed: '1.5s' },
    uml: { icon: 'bi-diagram-3-fill', color: '#00D1FF', speed: '4s' },
    universal: { icon: 'bi-globe-americas', color: '#7000FF', speed: '6s' }
};

cards.forEach(card => {
   card.addEventListener('click', (e) => {
        // Prevent event propagation
        e.stopPropagation();
        const mode = card.getAttribute('data-mode');
        
        // 1. Update active card class
        cards.forEach(c => c.classList.remove('active-card'));
        card.classList.add('active-card');

        // 2. Core visual transition
        coreIcon.style.opacity = '0'; // Fade effect
        
        setTimeout(() => {
            // Change icon and color based on 'states' object
            coreIcon.className = `bi ${states[mode].icon} core-icon`;
            coreIcon.style.color = states[mode].color;
            coreIcon.style.filter = `drop-shadow(0 0 15px ${states[mode].color})`;
            
            // Adjust scan line speed
            scanLine.style.animationDuration = states[mode].speed;
            
            coreIcon.style.opacity = '1';
        }, 300);
    });
});


// ===============================================
// 7. The Vision Section Logic
// ===============================================
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

        // Draw lines between nearby particles
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
// 8. Features Section Logic
// ===============================================

// Use IIFE to avoid scope naming conflicts
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        
        // 8.1 Tilt Effect
        const featureCards = document.querySelectorAll('.f-card');
        
        if (featureCards.length > 0) {
            featureCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 12; // Smoothing
                    const rotateY = (centerX - x) / 12;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
                });
            });
        }

        // 8.2 Scroll Reveal
        const revealElements = document.querySelectorAll('.reveal');
        
        if (revealElements.length > 0) {
            const featureObserverOptions = { threshold: 0.15 };
            
            const featureRevealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Stop observing once shown
                        featureRevealObserver.unobserve(entry.target);
                    }
                });
            }, featureObserverOptions);

            revealElements.forEach(el => featureRevealObserver.observe(el));
        }
    });
})();

// ===============================================
// 9. CTA Section Logic
// ===============================================

// Magnetic button
const magneticButton = document.querySelector('.btn-magnetic-wrap');

if (magneticButton) {
    magneticButton.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = magneticButton.getBoundingClientRect();

        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        const moveX = x * 0.3;
        const moveY = y * 0.3;

        // Move button itself
        magneticButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    magneticButton.addEventListener('mouseleave', () => {
        magneticButton.style.transform = `translate(0px, 0px)`;
    });
}
// ===============================================
// 10. Footer & Back to Top Logic
// ===============================================

const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Toggle visibility on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { // If scrolled > 500px
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Action on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Native smooth scrolling
        });
    });
}

// ===============================================
// 11. Toast Notification Logic
// ===============================================

let toastTimeout; // Controls timing for multiple alerts

function showInfo(title, message, iconClass, color) {
    const toast = document.getElementById('custom-toast');
    const iconElement = document.getElementById('toast-icon');
    const titleElement = document.getElementById('toast-title');
    const progress = document.querySelector('.toast-progress');

    // Clear previous timer
    clearTimeout(toastTimeout);

    // Inject dynamic info
    titleElement.innerText = title;
    document.getElementById('toast-msg').innerText = message;
    
    // Set icon and color
    iconElement.className = `bi ${iconClass} toast-icon`;
    iconElement.style.color = color;
    titleElement.style.color = color;
    progress.style.background = color;

    // Reset animation and show
    toast.style.animation = 'none';
    toast.offsetHeight; /* Trigger reflow to restart animation */
    toast.style.display = 'block';
    toast.style.animation = 'slideIn 0.4s ease-out forwards';

    // Auto close after 7 seconds
    toastTimeout = setTimeout(() => {
        closeToast();
    }, 7000);
}

function closeToast() {
    const toast = document.getElementById('custom-toast');
    toast.style.animation = 'slideIn 0.4s ease-in reverse forwards';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 400); // Wait for animation to finish
}
