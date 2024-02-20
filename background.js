require('dotenv').config()

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action == "popupClicked") {
        // console.log("extension clicked")
        chrome.tabs.sendMessage(message.id, { action: "backgroundMsg" });
        // console.log("message sent")
        
    } else if (message.action == "givingText") {
        // console.log("summary in progress")
        const pageText = message.text;
        // console.log(pageText);
        const apiKey = process.env;
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: "Write a short summary of the following report:\n\n" + pageText}],
            })
        })
        .then(response => response.json())
        .then(data => {
            const summary = data.choices[0].message.content;
            // console.log(summary);
            chrome.runtime.sendMessage({ action: "displaySummary", summary: summary });
        })
        .catch(error => console.error('Error:', error));
    }

});

  
  