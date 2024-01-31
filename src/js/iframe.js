const iframe = document.querySelector(".iframe-section .iframe");
const videoThumbnail = document.querySelector(".iframe-thumbnail");
const videoOverlay = document.querySelector(".iframe-section .iframe-overlay");
const videoIcon = document.querySelector(".iframe-section .iframe-play-icon");
let play = false;


function toggleVideoPlayback() {
  if (!play) {
    // Hide the thumbnail and show the iframe
    videoThumbnail.style.display = 'none';
    iframe.style.display = 'block';
    
    let videoUrl = 'https://www.youtube.com/embed/BNN9p7YH_hQ?autoplay=1&mute=1'; // Autoplay and mute
    iframe.src = videoUrl;
    
    videoIcon.classList.add("hidden");
    videoOverlay.style.display = "none";
    play = true;
  } else {
    // Reload the iframe to its original src to stop the video
    let originalSrc = iframe.getAttribute("src").split("?")[0];
    iframe.src = originalSrc;
    
    // Show the thumbnail and hide the iframe again
    videoThumbnail.style.display = 'block';
    iframe.style.display = 'none';
    
    videoIcon.classList.remove("hidden");
    videoOverlay.style.display = "block";
    play = false;
  }
}

videoIcon.addEventListener("click", toggleVideoPlayback);
