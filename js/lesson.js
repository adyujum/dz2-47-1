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