const iframe = document.querySelector(".video-section .video");
const videoOverlay = document.querySelector(".video-section .video-overlay");
const videoIcon = document.querySelector(".video-section .video-play-icon");
let play = false;

console.log(iframe)

function toggleVideoPlayback() {
  if (!play) {
    // Check if the iframe src already has query parameters
    let src = iframe.getAttribute("src");
    let symbol = src.includes('?') ? '&' : '?';

    // Append 'autoplay=1' and potentially 'mute=1' to the src
    iframe.src = src + symbol + "autoplay=1&mute=1"; // Consider adding mute=1 if needed
    videoIcon.classList.add("hidden");
    videoOverlay.style.display = "none";
    play = true;
  } else {
    // Reload the iframe to its original src to stop the video
    let originalSrc = iframe.getAttribute("src").split("?")[0];
    iframe.src = originalSrc;
    videoIcon.classList.remove("hidden");
    videoOverlay.style.display = "block";
    play = false;
  }
}

videoIcon.addEventListener("click", toggleVideoPlayback);
