// console.log("running content")
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // console.log("request to get text recieved")
    if (message.action == "backgroundMsg") {
        chrome.runtime.sendMessage({action: "givingText", text: document.body.innerText});
    }
});