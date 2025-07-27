document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
  });

  // Dropdown functionality
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button');
    const content = dropdown.querySelector('.dropdown-content');
    
    button.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header-container') && nav.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      nav.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const button = dropdown.querySelector('button');
        button.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          nav.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});

// Slideshow functionality
class Slideshow {
  constructor() {
    this.slideIndex = 0;
    this.slides = document.getElementsByClassName("mySlides");
    this.dots = document.getElementsByClassName("dot");
    this.interval = null;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    this.showSlides();
    this.startSlideShow();
    
    const slideshow = document.querySelector('.slideshow-container');
    slideshow?.addEventListener('mouseenter', () => this.pauseSlideShow());
    slideshow?.addEventListener('mouseleave', () => this.startSlideShow());
  }
  
  showSlides(n) {
    if (n === undefined) {
      this.slideIndex++;
      if (this.slideIndex >= this.slides.length) this.slideIndex = 0;
    } else {
      this.slideIndex = n;
      if (this.slideIndex >= this.slides.length) this.slideIndex = 0;
      if (this.slideIndex < 0) this.slideIndex = this.slides.length - 1;
    }
    
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";  
    }
    
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace(" active", "");
    }
    
    if (this.slides[this.slideIndex]) {
      this.slides[this.slideIndex].style.display = "block";
    }
    if (this.dots[this.slideIndex]) {
      this.dots[this.slideIndex].className += " active";
    }
  }
  
  startSlideShow() {
    this.interval = setInterval(() => this.showSlides(), 5000);
  }
  
  pauseSlideShow() {
    clearInterval(this.interval);
  }
  
  nextSlide() {
    this.showSlides(this.slideIndex + 1);
  }
  
  prevSlide() {
    this.showSlides(this.slideIndex - 1);
  }
  
  goToSlide(n) {
    this.showSlides(n);
  }
}

// Initialize slideshow
const slideshow = new Slideshow();