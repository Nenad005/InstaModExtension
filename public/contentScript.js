(() => {
  function onIconClick(username){
    console.log('scraping followers...')
    scrollToBottom("_aano", username)
  }

  function AddAccount(username){
    let accounts = new Set();
    chrome.storage.local.get([`accounts`]).then((res) => {
      accounts = res['accounts']
      accounts.add(username)
      chrome.storage.local.set({ 'accounts' : accounts }).then(() => {
        console.log(`Saved [${username}] to accounts list !!!`);
      })
    });
  }

  function saveUsernames(username, usernames){
    chrome.storage.local.set({ [username]: usernames }).then(() => {
      console.log("Saved usernames locally !!!");
    });
  }
  function scrollToBottom(className, username) {
    const element = document.querySelector('.' + className);
    const usernames = new Set()

    let old_n = 0

    if (element) {
      const scrollToEnd = () => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      };

      function n_of_accounts(){
        return Array.from(document.getElementsByClassName('x1dm5mii x16mil14 xiojian x1yutycm x1lliihq x193iq5w xh8yej3')).length
      }

      function removeElements(){
        let elementi = Array.from(document.getElementsByClassName('x1dm5mii x16mil14 xiojian x1yutycm x1lliihq x193iq5w xh8yej3'))
        for (let i = 0; i < elementi.length; i++){
            // console.log(elementi[i])
          elementi[i].innerHTML = ''
        }
      }

      function loop() {
        let n = n_of_accounts()
        if (n > old_n) {
          old_n = n
          scrollToEnd()
          const username_elements = document.getElementsByClassName('_ap3a _aaco _aacw _aacx _aad7 _aade')
          Array.from(username_elements).map((element) => {
            usernames.add(element.innerHTML)
          })
          setTimeout(removeElements, 2000)
          setTimeout(loop, 7000);
        }
        else{
          console.log(usernames)
          console.log(`Loaded all ${usernames.size} followers`)
          saveUsernames(username, usernames)
        }
      }

      loop()


    } else {
      console.error('Element with class name "' + className + '" not found.');
    }
  }

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const {type, username} = obj
    if (type == 'followers'){
      setTimeout(() => {
        let SaveIcon = document.createElement("i")
        SaveIcon.className = 'fas fa-download'
        SaveIcon.style = 'margin-left: 20px; font-size: 18px;'
        SaveIcon.style.cursor = 'pointer'
        SaveIcon.addEventListener('click', () => {
          onIconClick(username)
        })

        let AddIcon = document.createElement("i")
        AddIcon.className = 'fas fa-plus'
        AddIcon.style = 'margin-left: 20px; font-size: 18px;'
        AddIcon.style.cursor = 'pointer'
        AddIcon.addEventListener('click', () => {
          AddAccount(username)
        })

        let icon_div = document.getElementsByClassName('_ac7b _ac7c')
        icon_div[0].style.flexDirection = 'row'
        icon_div[0].appendChild(SaveIcon)
        icon_div[0].appendChild(AddIcon)
        console.log(icon_div[0])
      }, 500)
    }
  })
})();