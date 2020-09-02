document.addEventListener("DOMContentLoaded", (e) => {

    const baseUrl = "http://localhost:3000/characters/"

    const characterBar = document.querySelector("#character-bar")

    function getCharacters(){
        fetch(baseUrl)
        .then(res => res.json())
        .then(data => iterateCharacters(data))
    }

    function iterateCharacters(data){
        for(let characters of data){
            renderCharacters(characters)
        }
    }

    function renderCharacters(character){
        console.log(characterBar)
        let span = document.createElement("span")
        span.setAttribute("id", character.id)
        span.innerText = character.name
        characterBar.appendChild(span)
    }

    function clickHandler(){
        document.addEventListener("click", (e) => {
            button = e.target
            console.log(e.target)
            if(button.tagName == "SPAN"){
                // let selectedName = button.innerText
                let selectedId = parseInt(button.id)
                lookupCharacter(selectedId)
            }
        })
    }

    function lookupCharacter(id){
        fetch(baseUrl + id)
        .then(res => res.json())
        .then(characterObj => renderCharacterShowPage(characterObj))
    }

    function renderCharacterShowPage(characterObj){
        const info = document.querySelector("#detailed-info")
        info.innerHTML = `
        <h3>${characterObj.name}</h2>
        <img src="${characterObj.image}">
        <h2>Total Calories: ${characterObj.calories}</h2>
        <input type="text" placeholder="Enter Calories">
        <button type="submit" value="Add Calories" class="add-calories-btn"></button>
        <br><br>
        <button id="reset-btn">Reset Calories</button>
        `
    }

    function submitHandler() {
        document.addEventListener("submit", e => {
            e.preventDefault()
            console.log(e.target)

            // document.querySelector("#detailed-info > input.add-calories-btn")
            button = e.target
            if(button == "submit")
                console.log("hello")
                debugger
        })
    }



    submitHandler()
    clickHandler()
getCharacters()
/*
GET /characters
GET /characters/:id
PATCH /characters/:id
*/

})

