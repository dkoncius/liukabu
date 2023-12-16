import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

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
          console.error("Error stopping video in iframe: ", error);
        }
      });
    }
  }
  
});



const swiperExpand = () => {
  // Toggle expanded class
  document.querySelector(".swiper").classList.toggle('expanded');

  // Stop or start autoplay based on expanded state
  if (document.querySelector(".swiper").classList.contains('expanded')) {
    swiper.autoplay.stop();
  } else {
    swiper.autoplay.start();
  }

}

document.querySelectorAll('.swiper-slide').forEach(slide => {
  slide.addEventListener("click", swiperExpand)
});


document.querySelectorAll('.swiper-slide .iframe-overlay').forEach(overlay => {
  overlay.addEventListener('click', function() {
    
    // Stop Swiper autoplay
    swiper.autoplay.stop();

    overlay.style.zIndex = -1

  });
});
