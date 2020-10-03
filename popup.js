
function query(sel) {
  return document.querySelector(sel)
}

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (callback) callback(response);
    });
  });
}


query('#in').addEventListener('click', () => {
  sendMessageToContentScript({ type: 0 })
})

query('#out').addEventListener('click', () => {
  sendMessageToContentScript({ type: 1 })
})
