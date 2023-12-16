import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1.8,
  centeredSlides: true,
  spaceBetween: 30,

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
