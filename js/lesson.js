//Phinecheked 
const phoneInput =  document.querySelector("#phone_input")
const phoneBtn =  document.querySelector("#phone_button")
const phoneResult =  document.querySelector("#phone_result")

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneBtn.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'Invalid phone number'
        phoneResult.style.color = 'red'
    }
}

// tab slier 

const tabContentBlocks = document.querySelectorAll(".tab_content_block")
const tabContentItems = document.querySelectorAll(".tab_content_item")
const tabParent = document.querySelector('.tab_content_items')
let count = 0

const hideTabContent = () => {
    tabContentBlocks.forEach ((item) =>{
        item.style.display = 'none'
    })
    tabContentItems.forEach(item => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) =>{
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
    count = index
}

const auto = () => {
    setInterval(() => {
        if(count >= tabContentItems.length - 1){
            count = -1 
        }
    count++
    hideTabContent()
    showTabContent(count)

    },3000)
}

hideTabContent()
showTabContent()
auto()

tabParent.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')){
        tabContentItems.forEach((item, index) =>{
            if(event.target === item){
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

//CONVERTER

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const euroInput = document.querySelector('#eur')



const converter = (element, targetElement, targetElement2) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)
            if(targetElement.id === 'som'){
                targetElement.value = (element.value * data.usd).toFixed(2)
                targetElement2.value = (element.value * data.eur).toFixed(2)
            }
            if(targetElement.id === 'usd'){
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if(targetElement.id === 'eur'){
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if(element.value === '') {
                targetElement.value = ''
                targetElement2.value = ''

            }


        }
    }

}
converter(somInput, usdInput, euroInput)
converter(usdInput, somInput, euroInput)
converter(euroInput,somInput,usdInput)


// CARD SWITCHER
const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let cardId = 1
let maxId = 200

const cardSwitcher = async() => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
    const data = await response.json()
            const {title, completed, id} = data
            cardBlock.innerHTML = `
            <p>${title}</p>
            <p>${completed}</p>
            <span>${id}</span>
            `
}
const cardSwitcherNext = () => {
    if(cardId >= maxId) {
        cardId = 1
    } else {
        cardId++
    }
    cardSwitcher()
}
const cardSwitcherPrev = () => {
    if(cardId <= 1) {
        cardId = maxId
    } else {
        cardId--
    }
    cardSwitcher()
}
cardSwitcher()
btnNext.onclick = () => cardSwitcherNext()
btnPrev.onclick = () => cardSwitcherPrev()

async function getPosts() {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await resp.json();
      console.log(data);
    } catch (err) {
      console.error('Ошибка при загрузке постов:', err);
    }
  }
  getPosts();


// fetch('https://jsonplaceholder.typicode.com/posts') Старая версия
//     .then(response => response.json())
//     .then((data) => console.log(data))



//weather 

const inputSearch =  document.querySelector('.cityName');
const searchBtn = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const weatherBlock = document.querySelector('#weather_block')

const API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'appid=e417df62e04d3b1b111abeab19cea714'

searchBtn.onclick = async () => {
    const query = inputSearch.value.trim();
    if (!query) return;
  
    try {
      const resp = await fetch(${API}?${API_KEY}&q=${query}&units=metric);
      const data = await resp.json();
  
      console.log(data);
  
      city.innerHTML = data.name || 'Город не найден...';
      temp.innerHTML = data.main?.temp
        ? Math.round(data.main.temp) + '&deg;C'
        : '(●\'◡\'●)';
      weatherBlock.src = http://api.openweathermap.org/img/wn/${data.weather?.[0]?.icon}.png;
    } catch (err) {
      console.error('Ошибка при загрузке погоды:', err);
      city.innerHTML = 'Ошибка…';
      temp.innerHTML = '';
    } finally {
      inputSearch.value = '';
    }
  };


// searchBtn.onclick = () => { Старая версия
//     fetch(`${API}?${API_KEY}&q=${inputSearch.value}&units=metric`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             city.innerHTML = data.name || 'Город не найден...'
//             temp.innerHTML = data.main?.temp?  Math.round(data.main?.temp) + '&deg;C' : '(●\'◡\'●)'
//             weatherBlock.src = `http://api.openweathermap.org/img/wn/${data.weather[0].icon}.png`

//         })
//     inputSearch.value = ''
// }