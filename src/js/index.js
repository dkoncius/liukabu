import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Scroll to top after refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function runAnimationsForSmallScreens() {
  // Animate each banner individually
  gsap.utils.toArray('.banners .banner').forEach((banner, index) => {
    gsap.to(banner, {
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8"); // Adjust the overlap for a staggered effect
  });

  // ScrollTrigger animation for the "scroll-down" element
  gsap.to(".scroll-down", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".scroll-down",
      start: "top center", // Hide when it reaches the center of the viewport
      toggleActions: "play none none none",
    },
  });

  // Pitch section animation
  const pitchTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pitch",
      start: "top bottom-=200", // Start the animation when the top of the section is at the bottom of the viewport
      end: "bottom bottom",   // End the animation when the bottom of the section is at the top of the viewport
      toggleActions: "play none none none",
      markers: false
    },
  });

  pitchTl.from(".pitch", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power3.out",
  });
}

// Function to run animations for screens greater than 1025px
function runAnimationsForLargeScreens() {
  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline();

  // Animate header elements
  tl.to('header .cover', {
    y: 0,
    duration: 1,
    ease: "power3.inOut",
    clipPath: "inset(0% 0% 0% 0%)"
  }, "0.5");

  // Animate scroll-down text and dots sequentially
  tl.to('.scroll-down p', {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power3.out'
  });

  tl.to('.scroll-down .dot-1', {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    ease: 'back.out'
  });

  tl.to('.scroll-down .dot-2', {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    ease: 'back.out'
  }, '-=0.3'); // Overlap with the previous animation for smooth transition

  tl.to('.scroll-down .dot-3', {
    duration: 0.5,
    opacity: 1,
    scale: 1,
    ease: 'back.out'
  }, '-=0.3'); // Overlap with the previous animation

  // Enable scrolling after the animation is complete
  tl.eventCallback("onComplete", () => {
    document.body.style.overflow = 'auto';
    document.body.style.minHeight = '200vh';
  });

  // Iterate through banner elements and add animations to the timeline
  gsap.utils.toArray('.banners .banner').forEach((banner, index) => {
    gsap.to(banner, {
      scrollTrigger: {
        trigger: banner,
        start: 'top bottom-=520', // Animation starts when the banner is at the center of the viewport
        end: 'bottom top-=200',   // Animation ends when the banner is still at the center
        toggleActions: 'play none none none',
        markers: false
      },
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 1, // Animation duration in seconds
      ease: "power3.out",
      stagger: 0.2
    });
  });

  // ScrollTrigger animation to hide the "scroll-down" element
  gsap.to(".scroll-down", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".scroll-down",
      start: "top center", // Hide when it reaches the center of the viewport
      toggleActions: "play none none none",
    },
  });

  // Play the timeline
  tl.play();

  // Enable scrolling after the animation is complete
  tl.eventCallback("onComplete", () => {
    document.body.style.overflow = 'auto';
    document.body.style.minHeight = '200vh';
  });

  // Pitch animation
  // Create a GSAP timeline for the pitch section animation
  const pitchTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pitch",
      start: "top bottom-=200", // Start the animation when the top of the section is at the bottom of the viewport
      end: "bottom bottom",   // End the animation when the bottom of the section is at the top of the viewport
      toggleActions: "play none none none",
      markers: false
    },
  });

  // Define the animations for the pitch section
  pitchTl.from(".pitch", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power3.out",
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Check if the screen width is greater than 1025px
  if (window.innerWidth > 1025) {
    // Run animations for large screens
    runAnimationsForLargeScreens();
  } else {
    // Run animations for small screens
    runAnimationsForSmallScreens();
  }
});

// Out of page animation
document.addEventListener("DOMContentLoaded", function() { 
  document.querySelectorAll('.next-page-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.href;

      gsap.to('body', {
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => window.location.href = url
      });
    });
  });
});
