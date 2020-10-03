
function sendMsg(x) {
    chrome.runtime.sendMessage({ type: x });
}
