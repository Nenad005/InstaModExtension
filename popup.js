chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentUrl = tabs[0].url;
    const targetUrl = 'https://www.instagram.com';
  
    if (currentUrl.startsWith(targetUrl)) {
    //   alert('Already on the target website!');
    } else {
      chrome.tabs.query({ url: targetUrl + '/*' }, function(tabs) {
        if (tabs.length > 0) {
          chrome.tabs.update(tabs[0].id, { active: true });
        } else {
          chrome.tabs.create({ url: targetUrl });
        }
      });
    }
  });

document.addEventListener('DOMContentLoaded', function (){
    document.querySelector('.btn').addEventListener('click', () => {
        let ime = document.querySelector('.inp')
        console.log(ime.value)
        alert(ime.value)
        chrome.storage.local.get([`${ime.value}`]).then((result) => {
            alert(result)
            console.log(result)
        })
    })

})
  