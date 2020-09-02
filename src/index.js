document.addEventListener('DOMContentLoaded', () => {
    
const baseUrl = "http://localhost:3000/characters/"
function dataHandler(){
    fetch(baseUrl)
    .then(res=> res.json())
    .then(renderChars)
}

function renderChars(chars){
    container = document.querySelector("#character-bar")
    for(char of chars){
        renderCharSpan(char, container)
    }
}

function renderCharSpan(char){
    span = document.createElement('span')
    span.classList.add("char-name")
    span.dataset.id = `${char.id}`
    span.innerText=`${char.name}`
    container.append(span)
}

function getCharData(id){
    fetch(baseUrl+id)
        .then(res => res.json())
        .then(renderChar)
}

function renderChar(char){
    nameContainer = document.querySelector("#name")
    imgContainer = document.querySelector("#image")
    calContainer = document.querySelector("#calories")
    idContainer = document.querySelector("#calories-form")
    idContainer.dataset.charId = char.id
    nameContainer.innerText = `${char.name}`
    imgContainer.src = char.image
    calContainer.innerText = `${char.calories}`
}

function clickHandler(){

    document.addEventListener('click', e => {
        if (e.target.matches(".char-name")){
            getCharData(e.target.dataset.id)
        }
    })
    document.addEventListener('submit', e => {
        e.preventDefault()
        if (e.target.matches("#calories-form")){
            oldCal = document.querySelector("#calories").innerText
            newCal = form.calories.value
            currentCal = oldCal 

            options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
                body: JSON.stringify()
            }
        }
    })
}














clickHandler()
dataHandler()
})