document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters"
    const charBar = document.getElementById('character-bar')
    const charContainer = document.querySelector('.characterInfo')
    const charInfo = document.getElementById('detailed-info')
    const calForm = document.getElementById('calories-form')
    const resetButton = document.getElementById('reset-btn')
    const charName = document.getElementById('name')
    const charImage = document.getElementById('image')
    const charCal = document.getElementById('calories')
    // debugger
    const getCharacters = () => {
        fetch(baseURL)
        .then(response => response.json())
        .then(charCollect => unpackChar(charCollect))
    }

    const unpackChar = (charCollect) => {
        for (const char of charCollect) {
            spanChar(char)
            renderChar(char)
        }
    }

    const spanChar = (char) => {
        const charSpan = document.createElement('span')
        charSpan.className = 'charClass'
        charSpan.textContent = char.name
        charBar.append(charSpan)

    }

    const clickHandler = () => {
        document.addEventListener('click', (e) => {
            if(e.target.className === 'charClass') {
                console.log(e.target)
            }
        })
    }

    const renderChar = (char) => {
        
        
        charName.textContent = char.name
        charImage.src = char.image
        charCal.textContent = char.calories
    }

    getCharacters()
    clickHandler()
})
/*
Select a character from the character bar and see character's info inside #detailed-info div.
//todo - renderChar
//todo - edit fields to #detailed-info div

todo - add click handler for showing character detailed info


//See all characters names in a div with the id of "character-bar". 
//TODO - create div with id "character-bar"
//todo - append to container
//On page load, request data from the server to get all of the characters objects. 
//When you have this information, you'll need to add a span tag with the character's name to the character bar.
//todo - create span tag for character-bar
//todo - name inside span

*/