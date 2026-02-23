// Imports
import { stickers } from './index.product-list.js';

// DOM elements (will be initialized in init)
let carouselContainer;
let slidesWrapper;
let slidesContainer;
let prevButton;
let nextButton;
let indicatorsContainer;

// State
let currentIndex = 1; // Start at 1 (clone at 0)
let autoplayInterval = null;
let isTransitioning = false;
let slidesData = [];

// Configuration
const AUTOPLAY_DELAY = 3000;
const TRANSITION_DURATION = 500;

// Get responsive slides per view
function getSlidesPerView() {
    if (window.matchMedia('(min-width: 900px)').matches) {
        return 3;
    }
    if (window.matchMedia('(min-width: 600px)').matches) {
        return 2;
    }
    return 1;
}

// Initialize carousel
function init() {
    // Get DOM elements
    carouselContainer = document.querySelector('.product-carousel-animated');
    if (!carouselContainer) return;
    
    slidesWrapper = carouselContainer.querySelector('.product-carousel-animated__slides-wrapper');
    slidesContainer = carouselContainer.querySelector('.product-carousel-animated__slides');
    prevButton = carouselContainer.querySelector('.product-carousel-animated__button--prev');
    nextButton = carouselContainer.querySelector('.product-carousel-animated__button--next');
    indicatorsContainer = carouselContainer.querySelector('.product-carousel-animated__indicators');
    
    // Prepare slides with clones for infinite effect
    prepareSlidesData();
    
    // Render
    renderSlides();
    renderIndicators();
    
    // Show initial slide
    showSlide(currentIndex, false);
    
    // Event listeners
    attachEventListeners();
    
    // Start autoplay
    startAutoplay();
}

// Prepare slides data with clones
function prepareSlidesData() {
    slidesData = [
        stickers[stickers.length - 1], // Clone last
        ...stickers,                   // Real slides
        stickers[0]                    // Clone first
    ];
}

// Render slides from data
function renderSlides() {
    const slideHtmls = slidesData.map(product => `
        <div class="product-carousel-animated__slide">
            <img src="${product.image}" alt="${product.name}">
        </div>
    `);
    slidesContainer.innerHTML = slideHtmls.join('');
}

// Render indicator dots
function renderIndicators() {
    const indicatorHtmls = stickers.map((_, index) => `
        <button 
            class="product-carousel-animated__indicator" 
            data-index="${index + 1}"
            aria-label="Go to slide ${index + 1}"
        ></button>
    `);
    indicatorsContainer.innerHTML = indicatorHtmls.join('');
}

// Show specific slide
function showSlide(index, withTransition = true) {
    if (isTransitioning) return;
    
    currentIndex = index;
    
    // Calculate offset
    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    const offset = -currentIndex * slideWidth;
    
    // Apply transition
    if (!withTransition) {
        slidesContainer.style.transition = 'none';
    }
    slidesContainer.style.transform = `translateX(${offset}%)`;
    
    if (!withTransition) {
        // Force reflow to apply no-transition immediately
        slidesContainer.offsetHeight;
        slidesContainer.style.transition = '';
    } else {
        isTransitioning = true;
    }
    
    // Update indicators
    updateIndicators();
}

// Update active indicator
function updateIndicators() {
    const realIndex = ((currentIndex - 1) % stickers.length + stickers.length) % stickers.length;
    const indicators = indicatorsContainer.querySelectorAll('.product-carousel-animated__indicator');
    
    indicators.forEach((indicator, index) => {
        if (index === realIndex) {
            indicator.classList.add('product-carousel-animated__indicator--active');
            indicator.setAttribute('aria-current', 'true');
        } else {
            indicator.classList.remove('product-carousel-animated__indicator--active');
            indicator.removeAttribute('aria-current');
        }
    });
}

// Navigation functions
function showNextSlide() {
    if (isTransitioning) return;
    showSlide(currentIndex + 1);
}

function showPrevSlide() {
    if (isTransitioning) return;
    showSlide(currentIndex - 1);
}

function goToSlide(index) {
    if (isTransitioning) return;
    showSlide(index);
}

// Autoplay control
function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(showNextSlide, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Event listeners
function attachEventListeners() {
    // Button navigation
    prevButton.addEventListener('click', () => {
        showPrevSlide();
        stopAutoplay(); // Stop autoplay on manual interaction
    });
    
    nextButton.addEventListener('click', () => {
        showNextSlide();
        stopAutoplay();
    });
    
    // Indicator navigation
    indicatorsContainer.addEventListener('click', (e) => {
        const indicator = e.target.closest('.product-carousel-animated__indicator');
        if (indicator) {
            const index = parseInt(indicator.dataset.index);
            goToSlide(index);
            stopAutoplay();
        }
    });
    
    // Hover pause/resume
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Handle transition end for infinite loop
    slidesContainer.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') return;
        
        isTransitioning = false;
        
        // Infinite loop: jump to real slide if at clone
        if (currentIndex === 0) {
            // At last clone, jump to last real slide
            currentIndex = stickers.length;
            showSlide(currentIndex, false);
        } else if (currentIndex === stickers.length + 1) {
            // At first clone, jump to first real slide
            currentIndex = 1;
            showSlide(currentIndex, false);
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            showSlide(currentIndex, false);
        }, 100);
    });
}

// Initialize on load
init();
