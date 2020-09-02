document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/characters/"
    
    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => renderCharacters(characters))
    }
    
    const renderCharacters = (characters) => {
        for(const character of characters) {
            renderCharacter(character)
        }
    }
    
    const renderCharacter = (character) => {
        const characterBar = document.querySelector('#character-bar')
        const span = document.createElement('span')
        
        span.innerText = `${character.name}`
        
        characterBar.append(span)
    }
    
    const clickHandler = (character) => {
        document.addEventListener('click', e => {
            if(e.target.matches('span')){
                const characterInfo = document.getElementsByClassName('characterInfo')
                const detailedInfoDiv = document.getElementById('detailed-info')
                console.log()
                
                detailedInfoDiv.insertAdjacentHTML = `
                <p id="name">${character.name}</p>
                <img id="image" src=""${character.image}""><!-- display character image here -->
                <h4>Total Calories: <span id="calories">Character's Calories ${character.calories}</span> </h4>
                <form id="calories-form">
                <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                <input type="text" placeholder="Enter Calories" id="calories"/>
                    <input type="submit" value="Add Calories"/>
                </form>
                <button id="reset-btn">Reset Calories</button>
            `
           

            }
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            const button = e.target
            const form = document.querySelector('#calories-form')
            const formChildren = form.children
            const totalCalories = 0


            const calories = form.calories.value
            totalCalories += calories

            form.dataset.id = character.id
        })

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'accept' : 'application/json'
            }, 
            body: JSON.stringify({calories: calories})
        }
        fetch(baseUrl + id, options)
        .then(response => response.json())
        .then(character => getCharacters)
    }

    



submitHandler() 
clickHandler()
getCharacters()
})



// The endpoints you will need are:

// - GET `/characters`
// - GET `/characters/:id`
// - PATCH `/characters/:id`

// ## Core Deliverables

// As a user, I can:

// 1. See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.
    // * Create a GET request for characters
    // * select div 'character-bar' and add span tags for character names


// 2. Select a character from the character bar and see character's info inside `#detailed-info` div. 
    // * Create a clickHandler
    // * Add characters info to `#detailed-info` div


// 3. Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.
    // * Create a submitHandler 
    // * Create a 'PATCH' request
    // * Increment calories of character when add calories is clicked 