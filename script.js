// ===== DOM Elements =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const dayTabs = document.querySelectorAll('.day-tab');
const daySchedules = document.querySelectorAll('.day-schedule');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const statItems = document.querySelectorAll('.stat-item');

// ===== Mobile Menu Toggle =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Interactive Day Tabs for Timings =====
dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        dayTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        daySchedules.forEach(schedule => schedule.classList.remove('active'));
        
        const day = tab.getAttribute('data-day');
        const selectedSchedule = document.getElementById(`${day}-schedule`);
        if (selectedSchedule) {
            selectedSchedule.classList.add('active');
        }
    });
});

// ===== Animated Counter for Stats =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
}

// ===== Interactive Stats Click Effect =====
statItems.forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        const label = this.querySelector('.stat-label').textContent;
        const number = this.querySelector('.stat-number').textContent;
        const hasPlus = this.querySelector('.plus-sign') !== null;
        
        if (label.includes('Daily Members')) {
            alert(`Did you know? We have ${number}+ members daily! 🎉`);
        } else if (label.includes('Equipment')) {
            alert(`Did you know? We have ${number}+ pieces of equipment! 💪`);
        } else {
            alert(`Did you know? We're open ${number} days a week! 📅`);
        }
    });
});

// ===== Contact Form Handling =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const inquiry = document.getElementById('inquiry').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !inquiry || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        showFormMessage('Sending...', 'info');
        
        setTimeout(() => {
            showFormMessage(`Thanks ${name}! Your message has been sent. We'll respond within 24 hours.`, 'success');
            contactForm.reset();
        }, 1500);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(msg, type) {
    if (formMessage) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// ===== Scroll to Top Button =====
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    font-size: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    z-index: 999;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Hover Effects for Facility Cards =====
const facilityCards = document.querySelectorAll('.facility-card');
facilityCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        console.log('Exploring:', card.querySelector('h3').textContent);
    });
});

// ===== Dynamic Greeting Based on Time =====
function setGreeting() {
    const hour = new Date().getHours();
    const greeting = document.createElement('div');
    greeting.className = 'greeting-message';
    
    let message = '';
    if (hour < 12) message = 'Good Morning! Start your day with a workout!';
    else if (hour < 17) message = 'Good Afternoon! Perfect time for a session!';
    else message = 'Good Evening! Evening workouts are great!';
    
    greeting.textContent = message;
    greeting.style.cssText = `
        background: var(--secondary);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem auto;
        max-width: 600px;
        text-align: center;
        animation: slideIn 0.5s ease;
    `;
    
    const homeSection = document.querySelector('.home-section .section-container');
    if (homeSection && !document.querySelector('.greeting-message')) {
        homeSection.insertBefore(greeting, homeSection.querySelector('.video-showcase'));
    }
}

window.addEventListener('load', setGreeting);

// ===== Video Play/Pause on Hover =====
const videos = document.querySelectorAll('.video-wrapper video');
videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = document.querySelectorAll('.section');
        let currentIndex = 0;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentIndex = index;
            }
        });
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('NYUAD Fitness Center loaded! Ready to get fit? 💪');
    
    const mondayTab = document.querySelector('[data-day="mon"]');
    if (mondayTab) mondayTab.click();
});