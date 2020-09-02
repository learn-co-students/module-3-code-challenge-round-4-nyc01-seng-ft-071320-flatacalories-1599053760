document.addEventListener("DOMContentLoaded", () => {
    baseUrl = "http://localhost:3000/characters/"

    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => {
            renderCharacters(characters)
        })
    }

    const renderCharacters = (characters) => {
        for (const aCharacter of characters) {
            renderCharacter(aCharacter)
        }
    }

    const renderCharacter = character => {
        // find character-bar
        const characterBar = document.querySelector('#character-bar')
        // create span
        let characterSpan = document.createElement('span')
            characterSpan.innerText = character.name
            characterSpan.dataset.num = character.id
            characterBar.append(characterSpan)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            // look for clicks on span
            if (e.target.matches('span')) {
                const span = e.target
                let characterId = span.dataset.num
                // fetch characters
                fetchCharacter(characterId)
                
            }
        })
    }

    const fetchCharacter = (characterId) => {
        fetch(baseUrl + characterId)
        .then(response => response.json())
        .then(renderCharacterInfo)
    }

    const renderCharacterInfo = (character) => {
        // render show character
        // find detailed info
        let characterInfoDiv = document.getElementById('detailed-info')
        let characterImage = document.getElementById('image')
        let characterName = document.getElementById('name')
        let characterCalories = document.getElementById('calories-form')
        
        charact
        
        console.log(characterInfoDiv)
    }

    getCharacters()
    clickHandler()

})








/*
## Core Deliverables

As a user, I can:

1. See all characters names in a `div` with the id of `"character-bar"`. 
On page load, **request** data from the server to get all of the characters objects. 
When you have this information, you'll need to add a `span` tag with the character's name to the character bar.

2. Select a character from the character bar and see character's info inside `#detailed-info` div. 

3. Clicks on "Add Calories" button to add calories to a Character. 
Persist calories value to the server and update the DOM.
*/