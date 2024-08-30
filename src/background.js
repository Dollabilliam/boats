const INTERVAL = 10 * 1000;

function playVideo() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "playVideo"});
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setInterval(playVideo, INTERVAL);
});

chrome.runtime.onMessage.addListener(() => {
  return true;
});
