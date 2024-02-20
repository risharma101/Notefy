require('dotenv').config()


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // if message from popup.js that extension has been clicked, signal to content.js that extension has been clicked and send the current tab id
    if (message.action == "popupClicked") {
        chrome.tabs.sendMessage(message.id, { action: "backgroundMsg" });
        
    } 
    // if message from content.js with the webpage text, send text to OpenAI Chat Completions API
    else if (message.action == "givingText") {
        const pageText = message.text;
        const apiKey = process.env.API_KEY; // API key from .env
        const apiUrl = 'https://api.openai.com/v1/chat/completions'; // url for Chat Completions API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // can also change to gpt-4 for better responses
                messages: [{role: "user", content: "Write a short summary of the following report:\n\n" + pageText}], // message to gpt to write summary of webpage text
            })
        })
        .then(response => response.json())
        .then(data => {
            const summary = data.choices[0].message.content; // get summary response from gpt
            chrome.runtime.sendMessage({ action: "displaySummary", summary: summary }); // send summary back to popup.js
        })
        .catch(error => console.error('Error:', error));
    }

});

  
  