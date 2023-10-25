chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs[0].id);
    chrome.runtime.sendMessage({action: "popupClicked", id: tabs[0].id});

});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "displaySummary") {
      const summary = message.summary;
      const summaryDiv = document.getElementById('summaryElement');
      summaryDiv.textContent = summary;
    }
  });
  
  
  