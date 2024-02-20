
// signal to background.js that the extension has been clicked and send the id of the current tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.runtime.sendMessage({action: "popupClicked", id: tabs[0].id});
});

// if message from background.js with summary, change the "Generating Summary..." placeholder to the actual summary
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "displaySummary") {
      const summary = message.summary;
      const summaryDiv = document.getElementById('summaryElement');
      summaryDiv.textContent = summary;
    }
  });
  
  
  