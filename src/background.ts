chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("search.html");
    let tab = await chrome.tabs.create({ url });
});
