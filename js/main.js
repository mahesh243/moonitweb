// Main JavaScript for MoonITSolutions Website

// Flag to prevent multiple initializations
let stickyHeaderInitialized = false;

// Initialize sticky header functionality
function initStickyHeader() {
  const header = document.querySelector('header');
  
  if (header && !stickyHeaderInitialized) {
    
    // Add scroll event listener
    const handleScroll = function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    stickyHeaderInitialized = true;
  }
}

// Initialize smooth scroll for anchor links
function initSmoothScroll() {
  const header = document.querySelector('header');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header ? header.offsetHeight : 80;
          const offsetTop = target.offsetTop - headerHeight;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  
  // Try to initialize immediately (for pages with static header)
  initStickyHeader();
  initSmoothScroll();
  
  // Wait a bit for header to load (for pages that load header dynamically)
  setTimeout(function() {
    initStickyHeader();
    initSmoothScroll();
  }, 200);
  
  // Additional fallback
  setTimeout(function() {
    initStickyHeader();
    initSmoothScroll();
  }, 500);
});

// Export functions for use after dynamic header loading
window.initStickyHeader = initStickyHeader;
window.initSmoothScroll = initSmoothScroll;
