const slides = [
    '<div><img src="img/baby-yoda.svg" alt="Baby Yoda"></div>',
    '<div><img src="img/banana.svg" alt="Banana"></div>',
    '<div><img src="img/girl.svg" alt="Girl"></div>',
    '<div><img src="img/viking.svg" alt="Viking"></div>'
];

let currentSlideIndex = 0;

function showSlide(index) {
    const slidesContainer = document.querySelector('.product-carousel__slides');
    slidesContainer.innerHTML = slides[index];
    if (window.matchMedia('(min-width: 600px)').matches) {
        const secontSlideIdx = (index + 1) % slides.length;
        slidesContainer.innerHTML += slides[secontSlideIdx];
        if (window.matchMedia('(min-width: 900px)').matches) {
            const thirdSlideIdx = (index + 2) % slides.length;
            slidesContainer.innerHTML += slides[thirdSlideIdx];
        }
    }
}

function showNextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function showPreviousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

showSlide(currentSlideIndex);
// setInterval(showNextSlide, 3000);

const nextButton = document.querySelector('.product-carousel__button--next');
const prevButton = document.querySelector('.product-carousel__button--prev');

nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPreviousSlide);

window.addEventListener('resize', () => {
    showSlide(currentSlideIndex);
});