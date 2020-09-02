document.addEventListener('DOMContentLoaded', () => {
    function addBtn(){
   const button = document.createElement("button")
   button.innerHTML = `
   <button>Add Character</button>
   `
   container = document.querySelector("#name")
   container.prepend(button)
    }
    
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
    nameContainer.innerHTML = `
    ${char.name}
    <button id="edit-btn">Edit</button>`
    imgContainer.src = char.image
    calContainer.innerText = `${char.calories}`
}

function clickHandler(){

    document.addEventListener('click', e => {
        if (e.target.matches(".char-name")){
            getCharData(e.target.dataset.id)
        }

        if (e.target.matches("#reset-btn")){
            id = document.querySelector("#calories-form").dataset.charId

            options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({calories: 0})
            }
            fetch(baseUrl+id, options)
            .then(res => res.json())
            .then(renderChar)
        }
        if (e.target.matches("#edit-btn")){
            if(document.querySelector("#name-form")){
                oldForm = document.querySelector("#name-form")
                oldForm.remove()
            }else{
            form = document.createElement("form")
            container = document.querySelector("#detailed-info")
            form.id = "name-form"
            form.innerHTML = `
            <input type="text" placeholder="New Name" id="newname">
            <input type="submit" value="Change Name">
            `
            container.prepend(form)
        }
    }
      
    })
    document.addEventListener('submit', e => {
        e.preventDefault()
        if (e.target.matches("#calories-form")){
            id = e.target.dataset.charId
            oldCal = document.querySelector("#calories").innerText
            newCal = e.target.calories.value
            currentCal = parseInt(oldCal) + parseInt(newCal)
            e.target.reset()
            data = {calories: currentCal}
        }

        if (e.target.matches("#name-form")){
            id = document.querySelector("#calories-form").dataset.charId
            newName= e.target.newname.value
            e.target.reset()
            data = {name: newName}
        }
                options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }
                fetch(baseUrl+id, options)
                    .then(res => res.json())
                    .then(renderChar)
        
    })
}













addBtn()
clickHandler()
dataHandler()
})