//gmail block

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-z0-9.]+@gmail.com$/

gmailButton.onclick = () => {
    if(regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = 'Error'
        gmailResult.style.color = 'red'
    }
}

//move block

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");
const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight;


let positionX = 0;
let positionY = 0;
let direction = 1;


const moveBlock = () => {
    if(direction === 1){
        if(positionX < maxWidth) {
            childBlock.style.left = `${positionX}px`
            positionX++
        }else {
            direction = 2;
            positionX = maxWidth
        }
    }else if(direction === 2) {
        if(positionY < maxHeight && positionX >= maxWidth) {
            childBlock.style.top = `${positionY}px`
            positionY++
        }else {
            direction = 3;
        }
    }else if(direction === 3){
        if(positionX > 0 && positionY >= maxHeight){
            childBlock.style.left = `${positionX}px`
            positionX--
        }else {
            direction = 4
        }
    }else if(direction === 4) {
        if(positionY > 0 && positionX >= 0) {
            childBlock.style.top = `${positionY}px`
            positionY--
        }else {
            direction = 1;
            positionY = 0;
        }
    }

    requestAnimationFrame(moveBlock)

}
moveBlock()

//timer
const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const reset = document.querySelector("#reset")
const second = document.querySelector("#seconds")

let count = 0
let intervall
const startS = () => {
    intervall = setInterval(()=>{
        count++
        second.innerHTML = count

    },1000)
} 
start.onclick = startS

const stopes = () =>{
    clearInterval(intervall)
}
stop.onclick = stopes

const resets = () => {
    stopes()
    count = 0
    second.innerHTML = count
}
reset.onclick = resets




//character 

const characterLst = document.querySelector(".characters-list")

const xhr = new XMLHttpRequest()
xhr.open('GET','../data/persons.json')

xhr.onload = function () {
    if(xhr.status === 200){
        const persons = JSON.parse(xhr.responseText)
        persons.forEach(person => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';

            const characterPhoto = document.createElement('div');
            characterPhoto.className = 'character-photo';

            const characterPhotoImg = document.createElement('img');
            characterPhotoImg.src = person.person_photo;
            characterPhotoImg.alt = person.name;

            characterPhoto.appendChild(characterPhotoImg);

            characterCard.appendChild(characterPhoto);

            const h3 = document.createElement('h3');
            h3.innerHTML = person.name;
            characterCard.appendChild(h3);

            const house = document.createElement('p');
            house.innerHTML = person.what_a_ninja;
            characterCard.appendChild(house);

            const age = document.createElement('p');
            age.innerHTML = `Age: ${person.age}`;
            characterCard.appendChild(age);



            characterLst.appendChild(characterCard);
        });
    }else {
        console.log('Ошибка при загрузке!');
        
    }
}

xhr.send()

const xhr2 = new XMLHttpRequest()
xhr2.open('GET','./data/any.json')

xhr2.onload = () => {
    if (xhr2.status === 200) {
        const data = JSON.parse(xhr2.responseText);
        console.log('Данные :', data);
    } else {
        console.log('Ошибка при загрузке данных');
    }
}

xhr2.send()