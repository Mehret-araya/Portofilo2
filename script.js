function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.querySelector('.hamburger');
  
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
}

function sendMessage() {
  // Add a nice animation to the button
  const button = event.target;
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
    alert("Message sent successfully!");
  }, 150);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('animate');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Close mobile menu after clicking
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
  }
}

// Enhanced intersection observer with staggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Add staggered animation for cards in grids
      if (entry.target.classList.contains('grid')) {
        const cards = entry.target.querySelectorAll('.card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate');
          }, index * 150);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Rotating text animation
function initRotatingText() {
  const roles = document.querySelectorAll('.role');
  let currentIndex = 0;
  
  function rotateText() {
    // Remove active class from all roles
    roles.forEach(role => role.classList.remove('active'));
    
    // Add active class to current role
    roles[currentIndex].classList.add('active');
    
    // Move to next role
    currentIndex = (currentIndex + 1) % roles.length;
  }
  
  // Start the rotation
  setInterval(rotateText, 3000); // Change every 3 seconds
}

// Initialize rotating text when page loads
document.addEventListener('DOMContentLoaded', () => {
  initRotatingText();
});

// Observe elements for animations
document.querySelectorAll('section, .card, h1, h2, .profile-pic, .cv-btn, .social-icons, .buttons, .grid').forEach(el => {
  observer.observe(el);
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
  // Initialize rotating text
  initRotatingText();
  
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click animation to buttons
  const buttons = document.querySelectorAll('button, .cv-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

