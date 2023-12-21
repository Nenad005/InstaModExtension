chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && /instagram\.com\/.*\/followers/.test(tab.url)){
    const username = tab.url.split('/')[3]
    console.log(username)
    // console.log(tab.url.split('/'))

    chrome.tabs.sendMessage(tabId, {
      type: 'followers',
      username: username
    })
  }
})