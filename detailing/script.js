// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Burger menu toggle
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('active');
});

// Animated counter for statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate statistics counters
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .price-card, .stat-number').forEach(el => {
    observer.observe(el);
});

// Hero particles animation
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.getElementById('particles');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    if (heroParticles && scrolled < window.innerHeight) {
        heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('.section-title, .section-subtitle');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Gallery hover effect enhancement
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Show success message (в реальном проекте здесь была бы отправка на сервер)
    showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Phone mask for input
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        formattedValue = '+7';
        if (value.length > 1) {
            formattedValue += ' (' + value.substring(1, 4);
        }
        if (value.length >= 4) {
            formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 9) {
            formattedValue += '-' + value.substring(9, 11);
        }
    }
    
    e.target.value = formattedValue;
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4af37' : '#1a1a1a'};
        color: ${type === 'success' ? '#0a0a0a' : '#ffffff'};
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.6;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add slide animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @media (max-width: 968px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            padding: 20px;
            gap: 20px;
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            animation: slideDown 0.3s ease-out;
        }
        
        .burger-menu.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .burger-menu.active span:nth-child(2) {
            opacity: 0;
        }
        
        .burger-menu.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(style);

// Button hover effect enhancement
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Cursor trail effect (optional premium feature)
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 968) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    }
});

// Smooth scroll to top when clicking logo
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Service cards stagger animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Gallery items stagger animation
const galleryItemsAnim = document.querySelectorAll('.gallery-item');
galleryItemsAnim.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Price cards stagger animation
const priceCards = document.querySelectorAll('.price-card');
priceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Consultation button functionality
document.querySelectorAll('.btn-consultation').forEach(btn => {
    btn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus on name input after scroll
        setTimeout(() => {
            document.getElementById('name').focus();
        }, 1000);
    });
});

// All "Записаться" and similar buttons scroll to contact
document.querySelectorAll('.btn-primary:not([type="submit"])').forEach(btn => {
    if (btn.textContent.includes('Записаться') || btn.textContent.includes('Выбрать')) {
        btn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 1000);
        });
    }
});

// "Узнать больше" button scrolls to services
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Узнать больше')) {
        btn.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-gold);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyle);

console.log('Premium Detailing Website - Loaded Successfully ✨');