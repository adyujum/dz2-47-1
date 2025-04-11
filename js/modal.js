// modal \
const modal = document.querySelector('.modal')
const modalCloseButton = document.querySelector('.modal_close')
const modalTrigger = document.querySelector('#btn-get')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
modalTrigger.onclick = openModal
modalCloseButton.onclick = closeModal


modal.onclick = (event) => {
    if(event.target === modal) {
        closeModal()
    }
}
const handleScrolle = () => {
    if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        openModal()
        window.removeEventListener('scroll', handleScrolle)
    }
}

window.addEventListener('scroll', handleScrolle)

setTimeout(() => {
    openModal()
},10000)