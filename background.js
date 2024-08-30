// Background script (background.js)

const INTERVAL = 30 * 1000; // 10 minutes in milliseconds

function playVideo() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "playVideo"});
    }
  });
}

// Start the interval when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  setInterval(playVideo, INTERVAL);
});

// Keep the service worker alive
chrome.runtime.onMessage.addListener(() => {
  return true;
});
