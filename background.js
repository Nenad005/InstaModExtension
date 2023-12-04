chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && /instagram\.com\/.*\/followers/.test(tab.url)){
    const username = tab.url.split('/')[1]
    console.log(username)

    chrome.tabs.sendMessage(tabId, {
      type: 'followers',
      username: username
    })
  }
})