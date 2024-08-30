let videoOverlay = null;

function createVideoOverlay() {
  if (videoOverlay) return;

  videoOverlay = document.createElement('div');
  videoOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const video = document.createElement('video');
  video.src = chrome.runtime.getURL('boat.webm');
  video.style.maxWidth = '100%';
  video.style.maxHeight = '100%';

  videoOverlay.appendChild(video);
  document.body.appendChild(videoOverlay);

  video.play();

  video.onended = () => {
    document.body.removeChild(videoOverlay);
    videoOverlay = null;
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "playVideo") {
    createVideoOverlay();
  }
  sendResponse({status: "ok"});
  return true;
});
