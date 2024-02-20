// if message from background.js that extension button has been clicked, get the webpage text and send it to background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // console.log("request to get text recieved")
    if (message.action == "backgroundMsg") {
        chrome.runtime.sendMessage({action: "givingText", text: document.body.innerText});
    }
});