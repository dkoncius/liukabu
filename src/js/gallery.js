import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiperElement = document.querySelector('.swiper');
if (!swiperElement) {
  // Exit early if swiper element doesn't exist - don't throw error, just return
  // Gallery will not be initialized if element doesn't exist
} else {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 15,

    // Enable smoother transitions
    speed: 800, // Transition speed in milliseconds (adjust as needed)

    // Enable autoplay
    autoplay: {
      delay: 2500, // Delay in milliseconds between slides (adjust as needed)
      disableOnInteraction: false, // Continue autoplay on user interactions
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1025: {
        slidesPerView: 1.8,
        spaceBetween: 30,
        speed: 1800
      }
    },

    on: {
      slideChange: function () {
        // Find all iframes within the swiper and stop their content
        const iframes = this.el.querySelectorAll('iframe');
        iframes.forEach(iframe => {
        try {
          const src = iframe.src;
          iframe.src = src; // This will reload the iframe, stopping the video
        } catch (error) {
          // Silently handle error
        }
        });
      }
    }
  });

  const swiperContainer = document.querySelector(".swiper");
  if (swiperContainer) {
    const toggleSwiperExpand = () => {
      swiperContainer.classList.toggle('expanded');
      swiper.autoplay[swiperContainer.classList.contains('expanded') ? 'stop' : 'start']();
    }

    const stopSwiperAutoplay = (overlay) => {
      swiper.autoplay.stop();
      overlay.style.zIndex = -1;
    }

    const toggleAutoplayDirection = (isReverse) => {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
      swiper.params.autoplay.reverseDirection = isReverse;
      swiper.autoplay.start();
    }

    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.addEventListener("click", toggleSwiperExpand);
    });

    document.querySelectorAll('.swiper-slide .iframe-overlay').forEach(overlay => {
      overlay.addEventListener('click', () => stopSwiperAutoplay(overlay));
    });

    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');
    
    if (nextButton) {
      nextButton.addEventListener('click', () => toggleAutoplayDirection(false));
    }
    
    if (prevButton) {
      prevButton.addEventListener('click', () => toggleAutoplayDirection(true));
    }
  }
}