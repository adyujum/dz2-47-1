const cardLIst = document.querySelector('.card_list')



const cards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        const data = await response.json()    
        console.log(data);
        data.map((elem) => {
            const card = document.createElement("div")
            const h3 = document.createElement("h3")
            const img = document.createElement("img")
            const p = document.createElement("p")
            h3.innerHTML = elem.title
            p.innerHTML = elem.body
            img.src = 'https://i.pinimg.com/736x/4c/1d/e3/4c1de3433ce97783824f07bff26fe17a.jpg'
            img.alt = 'image'
            card.append(img)
            card.append(h3)
            card.append(p)
            cardLIst.append(card)
        })
    

    }catch (err) {
        console.log(err)
    }
}
cards()