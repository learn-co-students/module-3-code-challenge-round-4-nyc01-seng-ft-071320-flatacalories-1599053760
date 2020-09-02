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
            } else if(button.matches(".add-calories-btn")){
                let enteredNum = parseInt(button.previousElementSibling.value)
                patchCalories(enteredNum)
            } else if(button.matches("#reset-btn")){
                resetCalories()
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
        <input type="submit" value="Add Calories" class="add-calories-btn" data-id=${characterObj.id}>
        <br><br>
        <button id="reset-btn" data-id=${characterObj.id}>Reset Calories</button>
        `
    }

    function patchCalories(enteredCalories) {
        let currentCalories = button.previousElementSibling.previousElementSibling.innerText
        let calorieStr = currentCalories.replace("Total Calories: ", "" )
        let calorieNum = parseInt(calorieStr)
        let total = calorieNum + enteredCalories
        let id = button.dataset.id
        // debugger
        const options = {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
        body: JSON.stringify({ calories: total })
        }
        fetch(baseUrl + id, options)
        .then(res => res.json())
        .then(Success => console.log("Yay"))
        .then(console.log)
        .then(Data => {
            button.previousElementSibling.previousElementSibling.innerText = `Total Calories: ${total}` 
        })
    }

    function resetCalories(){
        let id = button.dataset.id
        // debugger
        const options = {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
        body: JSON.stringify({ calories: 0 })
        }
        fetch(baseUrl + id, options)
        .then(res => res.json())
        .then(Success => console.log("Reset"))
        .then(console.log)
        .then(Data => {
            button.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText = `Total Calories: 0` 
        })
    }


    // function submitHandler() {
    //     document.addEventListener("submit", e => {
    //         e.preventDefault()
    //         console.log(e.target)
            
    //         // document.querySelector("#detailed-info > input.add-calories-btn")
    //         button = e.target
    //         if(button == "reset-btn")
    //             console.log("hello")
    //             debugger
    //     })
    // }



    // submitHandler()
    clickHandler()
getCharacters()
/*
GET /characters
GET /characters/:id
PATCH /characters/:id
*/

})

