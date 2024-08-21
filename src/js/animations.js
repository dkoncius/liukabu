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
}

// Function to run animations for screens greater than 1025px
function runAnimationsForLargeScreens() {

  const tl = gsap.timeline();

  // Animate header elements
  tl.to('header .cover', {
    y: 0,
    duration: 1,
    ease: "power3.inOut",
    clipPath: "inset(0% 0% 0% 0%)"
  }, "0.5");


// Iterate through banner elements and add animations to the timeline
gsap.utils.toArray('.banners .banner').forEach((banner, index) => {
  // Add an animation to the timeline for each banner
  tl.to(banner, {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
  }, '-=0.8'); // Overlap animations slightly for a smoother transition
});

  // Play the timeline
  tl.play();
}

if (window.innerWidth > 1025) {
  // Run animations for large screens
  runAnimationsForLargeScreens();
} else {
  // Run animations for small screens
  runAnimationsForSmallScreens();
}


// Out of page animation
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


