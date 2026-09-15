// Countdown Timer
function updateCountdown() {
    // Set wedding date to December 5, 2026
    const weddingDate = new Date('December 5, 2026').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        if (distance < 0) {
            clearInterval(timer);
            document.querySelector('.countdown-timer').innerHTML = '<h3 style="color: white; text-align: center;">🎉 The Wedding Day has arrived! 🎉</h3>';
        }
    }, 1000);
}

// Slideshow functionality
let slideIndex = 1;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName('slide');
    let indicators = document.getElementsByClassName('indicator');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance slideshow every 5 seconds
function autoSlideshow() {
    let slides = document.getElementsByClassName('slide');
    if (slides.length > 0) {
        showSlide(slideIndex += 1);
        setTimeout(autoSlideshow, 5000);
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// RSVP Form Submission
const rsvpForm = document.querySelector('.rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            attendance: this.querySelector('select').value,
            requests: this.querySelector('textarea').value
        };
        
        console.log('RSVP submitted:', formData);
        
        // Show success message
        alert('Thank you for your RSVP! We look forward to celebrating with you. 🎉');
        this.reset();
        
        // In a real application, you would send this data to a server
        // Example: fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(formData) })
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    showSlide(slideIndex);
    autoSlideshow();
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
