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
        let detailedInfoDiv = document.getElementById('detailed-info')
        
        detailedInfoDiv.innerHTML = `
        <p id="name">${character.name}</p>
        <img id="image" src=${character.image}>
        <h4>Total Calories: <span id="calories">${character.calories}</span></h4>
        <form id="calories-form">
            <input type="hidden" class="${character.calories}" id="${character.id}">
            <input type="text" placeholder="Enter Calories" id="calories">
            <input type="submit" value="Add Calories" id="submit-form">
        </form>
        <button id="reset-btn">Reset Calories</button>
        ` 
    }

    const submitHandler = () => {
        // const submitForm = document.getElementById('submit-form')
        document.addEventListener("submit", (e) => {
            if (event.target.matches("#submit-form"))
                // const submitForm = e.target.getAttribute("class")
                let characterCalories = parseInt(e.target.getAttribute("class"))
                console.log(characterCalories)
                e.preventDefault()
            
                const form = e.target
                const calories = form.calories.value
                const characterId = form.dataset.id

                const options = {
                    method: "PATCH",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
                    body: JSON.stringify({ calories: calories })
                }
        
            fetch(baseUrl + characterId, options)
            .then((response) => response.json())
            .then(renderCharacterInfo)
        })
    }

    getCharacters()
    clickHandler()
    submitHandler()
})
