// Vídeo onde aprendi tudo: https://www.youtube.com/watch?v=TlP5WIxVirU&t=531s&ab_channel=

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = [] // Criamos um objeto chamado "users"
searchInput.addEventListener("input", (e) =>{
    const value = e.target.value
    users.forEach(user => {
        const isVisible =  user.name.includes(value) || user.email.includes(value)
        user.element.classList.toggle("hide", !isVisible) //inclua a classe "hide" caso não seja visível
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    users = data.map(user => { 							// Cada "user" (não confunde user com users) tem um card criado
        // Tudo é criado por referência
        // Para cada usuário da API importada, um "card" será criado
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        header.textContent = user.name;
        body.textContent = user.email;
        userCardContainer.append(card)
        // Retornar um objeto ao "users"
        return { name: user.name.toLowerCase(), email: user.email.toLowerCase(), element: card}
    })
}) 