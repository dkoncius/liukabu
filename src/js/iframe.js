export function initIframe() {
  const iframeSection = document.querySelector(".iframe-section");
  const iframe = iframeSection.querySelector(".iframe");
  const videoThumbnail = iframeSection.querySelector(".iframe-thumbnail");
  const videoOverlay = iframeSection.querySelector(".iframe-overlay");
  const videoIcon = iframeSection.querySelector(".iframe-play-icon");

  // Extract URL and thumbnail source from data attributes
  const iframeUrl = iframeSection.dataset.iframeUrl;
  const thumbnailSrc = iframeSection.dataset.thumbnailSrc;

  let play = false;

  function toggleVideoPlayback() {
      if (!play) {
          videoThumbnail.style.display = 'none';
          iframe.style.display = 'block';
          
          // Use the iframeUrl from the data attribute
          iframe.src = iframeUrl;
          
          videoIcon.classList.add("hidden");
          videoOverlay.style.display = "none";
          play = true;
      } else {
          // Stop the video and reset
          iframe.src = "";
          videoThumbnail.style.display = 'block';
          iframe.style.display = 'none';
          videoIcon.classList.remove("hidden");
          videoOverlay.style.display = "block";
          play = false;
      }
  }

  if (videoIcon) {
      videoIcon.addEventListener("click", toggleVideoPlayback);
  }
}

