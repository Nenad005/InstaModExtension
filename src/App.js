/*global chrome*/
import logo from './logo.svg';
import './App.css';
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const currentUrl = tabs[0].url;
  const targetUrl = 'https://www.instagram.com';

  if (currentUrl.startsWith(targetUrl)) {
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

// document.addEventListener('DOMContentLoaded', function (){
//   chrome.storage.local.get([`accounts`]).then((res) => {
//     console.log(res)
//   });
// })

function App() {
  return (
    <div className="App">
      <header>
        <h1>KokanBot</h1>
      </header>
      <main>
          <div class="accounts-wrapper">
              <h1>Nalozi za pratioce</h1>
              <div class="strelica"></div>
              <div class="accounts">
                  <div class="account">
                      <h3 class="account-name">account-name</h3>
                      <i class="fas fa-minus">-</i>
                  </div>
              </div>
          </div>
      </main>
    </div>
  );
}

export default App;
