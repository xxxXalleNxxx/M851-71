window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

function checkVisibility() {
    const images = document.querySelectorAll('.gallery-image');
    const windowHeight = window.innerHeight;

    images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.top < windowHeight - 100 && rect.bottom > 0) {
            image.classList.add('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') ||
                      window.location.pathname === '';
    
    if (logo && isHomePage) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);