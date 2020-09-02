document.addEventListener("DOMContentLoaded", function(e){
    const url = "http://localhost:3000/characters"
    const charBar = document.querySelector("#character-bar")
    const infoDeets = document.querySelector("#detailed-info")
    const calories = document.querySelector("#calories")
    console.log(calories)

    fetchAllChars = ()=>{
        fetch(url)
        .then(resp => resp.json())
        .then(charData => charData.forEach(
            char => renderChars(char)
        ))
    }
    fetchAllChars()

    renderChars = (char) =>{
        const charSpan = document.createElement("span")
        charSpan.id = char.id
        charSpan.className = "charspan"
        charSpan.textContent = char.name
        charBar.append(charSpan)
    }

    fetchCharacter = (charId) => {
        fetch(`${url}/${charId}`)
        .then(resp => resp.json())
        .then(character => renderCharacter(character))
    }

    renderCharacter = (character) => {
        infoDeets.innerHTML = 
        `
        <p id="name">${character.name}</p>
        <img id="image" src=${character.image}>
        <h4>Total Calories: </h4> <h4><span id="calories">${character.calories}</span> </h4> 
        <form id="calories-form">
            <input type="hidden" value="Character's Id" id=${character.id}/> 
            <input type="number" name="calories" placeholder="Enter Calories"/>
            <input type="submit" value="Add Calories"/>
        </form>
        <button id="reset-btn">Reset Calories</button>

        `
    }

    charBar.addEventListener("click", function(e){
        if(e.target.className === "charspan"){
            fetchCharacter(e.target.id)
        }
    })

    updateCharacter = (cals, id) =>{
        fetch(`${url}/${id}`, {
            method: "PATCH", 
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            }, 
            body: JSON.stringify({
                "calories":cals
            })
        })
    }

    infoDeets.addEventListener("submit", function(e){
        e.preventDefault()
        let currentCalories = (e.target.parentElement.children[3].textContent)
        let updated = Number(e.target.calories.value) + Number(currentCalories)
        let id = e.target.children[0].id
        
        updateCharacter(updated, id)

        calories.textContent = updated
        e.target.reset()
        
    })

})



/*
DONE √ 1. See all characters names in a `div` with the id of `"character-bar"`. 
On page load, **request** data from the server to get all of the characters 
objects. When you have this information, you'll need to add a `span` 
tag with the character's name to the character bar.

DONE √ 2. Select a character from the character bar and see character's info inside 
`#detailed-info` div. 
  add click to characters - on each span  -find way to identify, add classname
//when clicked, add charInfo to detailed info div, run fetchChar

 <div id="detailed-info">
                <p id="name">Character's Name</p>
                <img id="image" src="assets/dummy.gif"><!-- display character image here -->
                <h4>Total Calories: <span id="calories">Character's Calories</span> </h4>
                <form id="calories-form">
                    <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter Calories" id="calories"/>
                    <input type="submit" value="Add Calories"/>
                </form>
                <button id="reset-btn">Reset Calories</button>
            </div>
        </div>


3. Clicks on "Add Calories" button to add calories to a Character. 
Persist calories value to the server and update the DOM.

//submit listener for inpu4, grab calories value
//grab user input to add to cal value - updated value
//patch updated value to db

*/