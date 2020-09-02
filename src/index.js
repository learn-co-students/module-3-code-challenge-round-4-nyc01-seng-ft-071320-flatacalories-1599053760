document.addEventListener("DOMContentLoaded", ()=>{
    const CHAR_URL = 'http://localhost:3000/characters/'

    const getAllCharacters = () => {
        fetch(CHAR_URL)
            .then(response => response.json())
            .then(characters => renderCharacters(characters))
    }

    const getOneCharacter = (id) => {
        fetch(`${CHAR_URL}${id}`)
            .then(response => response.json())
            .then(character => renderInfo(character))
    }

    const renderCharacters = (characters) => {
        characters.forEach(character => renderCharacter(character))
    }

    const renderCharacter = (character) => {
        const div = document.getElementById('character-bar')
        const span = document.createElement('span')
        span.dataset.id = character.id
        span.innerText = character.name
        div.append(span)
    }

    const renderInfo = (character) => {
        const div = document.getElementById('detailed-info')
        div.innerHTML = ''
        div.innerHTML = `
        <p id="name">${character.name}</p>
        <img id="image" src="${character.image}"><!-- display character image here -->
        <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
        <form id="calories-form">
            <input type="hidden" value="Character's id" id="${character.id}"/> <!-- Assign character id as a value here -->
            <input type="text" placeholder="Enter Calories" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>
        <button id="reset-btn">Reset Calories</button>
        `
    }

    const changeCalories = (idArg, calArg) => {
        const configObj = {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                id: idArg,
                calories: calArg
            })
        }
        fetch(`${CHAR_URL}${idArg}`, configObj)
            .then(response => response.json())
            .then(character => renderInfo(character))
    }

    const submitHandler = () => {
        document.addEventListener("submit", (e)=>{
            const form = document.getElementById('calories-form')
            if(e.target === form.children[2]){
                e.preventDefault()
                console.log("submit button!")
                const id = parseInt(form.children[0].value, 10)
                const calories = parseInt(form.children[1].value, 10)
                changeCalories(id, calories)
            }
        })
    }

    const clickHandler = () => {
        document.addEventListener("click", (e)=>{
            const btn = e.target
            if(btn.closest('span')){
                console.log('span clicked!')
                const id = btn.dataset.id
                getOneCharacter(id)
            }
        })
    }

    submitHandler()
    clickHandler()
    getAllCharacters()
})



/*
See all character names in a div#character-bar

- make function called getAllCharacters
    - makes fetch request using url
    - in 2nd then, take array characters and pass it to renderCharacters() as its argument

- make function called renderCharacters that takes an array as its argument
    - select div#character bar
    - set the innerHTML of div#character-bar to an empty string
    - forEach character of characters array, call renderChar(character) 

- make function called renderCharacter that takes an individual character object
    - select div#character-bar
    - create span element
    - add a dataset for each property of the character object
    - set innerText of span to character.name
    - append the span to div

see detailed info about a character


- make a function called renderInfo that takes a character object as its argument
    - select the div#detailed-info
    - set div innerHTML to the below and replace appropriate with interpolated character object property
        <p id="name">Character's Name</p>
        <img id="image" src="assets/dummy.gif"><!-- display character image here -->
        <h4>Total Calories: <span id="calories">Character's Calories</span> </h4>
        <form id="calories-form">
            <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
            <input type="text" placeholder="Enter Calories" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>
        <button id="reset-btn">Reset Calories</button>
    
add calories to character's calorie property and also be able to reset a character's calories property to 0

- make function called changeCalories that takes character id and calories as its argument
    - declare configObj
        - PATCH method
        - headers of content-type and accept
        - body with JSON.stringify({})
            - inside braces put id and calories and interpolate the arguments for values
    - make fetch statement to patch the character object on the server and update its calories property
        - interpolate id with url
        - pass configObj as second argument
    - in 2nd .then
        - take character response object and pass it to renderInfo to rerender the detailed-info area


- make function called submitHandler
    - addEventListener for "submit" event
        - select form#calories-form
        - if e.target === form.children[2]
            const id = parseInt(form.children[0].id, 10)
            const calories = parseInt(form.children[1].value, 10)
            - call changeCalories and pass in id and calories as arguments


- make function called clickHandler for "click" event
    - if e.target closest is a span element
        - declare character object from span datasets
        - call renderInfo and pass character object
    - else if e.target matches #reset-btn
        - declare const calories equal to 0
        - select form (only one form element)
        - declare const id equal to form children[0] value
        - call changeCalories and pass in id and calories as arguments


*/