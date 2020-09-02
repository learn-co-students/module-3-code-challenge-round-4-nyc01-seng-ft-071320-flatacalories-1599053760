//Step 1 √
//Get all the characters with a fetch request √
//Make a span for each character with their name in it √

//Step 2 √
//Add a click listener so that when we sleect a character their info pops up √
//render the detailed info into the div title detailed-info √ 
//name, image, and calories √

//Step 3
//When we submit with the button on add calories we need a fetch request to patch the number of calories we submit in the form √
//Make a submit listener √
//grab the value form the input √
//put that value in a patch request √
//update the dom with the new amount of calories √

document.addEventListener('DOMContentLoaded', function() {

    //Grabbing the stuff I need to add things into
    const characterBar = document.querySelector('div#character-bar')
    const detailedInfo = document.querySelector('div#detailed-info')

    //Variable to hold the characters
    let characters = []

    //gets characters
    function getCharacters() {
        fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(allCharacters => {
            renderCharacters(allCharacters)
            characters = allCharacters
        })
    }

    //renders characters
    function renderCharacters(characters){
        for(const character of characters) {
            characterBar.insertAdjacentHTML('beforeend', `<span id="${character.id}" class="character-card">${character.name}</span>`)
        }
    }
    
    //click handler using event delegation for click events
    function clickHandler() {
        document.addEventListener('click', function(e){
            //Clicking show card
            if(e.target.matches('span.character-card')){
                
                let character = findCharacter(e.target.id)
                renderCharacterInfo(character);
                submitHandler(character)
            }
            //Reset Button
            else if(e.target.matches('button#reset-btn')) {
                let character = findCharacter(e.target.dataset.id)
                let options = {

                    method: 'PATCH',

                    headers: {
                        'Content-Type': 'application/json' ,
                        Accept: 'application/json'
                    },

                    body: JSON.stringify({
                        'calories': 0 
                    })
                }
                //resetting calories through a patch
                fetch(`http://localhost:3000/characters/${character.id}`, options)
                .then(response => response.json())
                .then(updatedChar => {
                    characterBar.innerHTML = ''
                    detailedInfo.innerHTML = ''
                    getCharacters()
                    renderCharacterInfo(updatedChar)
                })
            }
            
        })
    }

    //Find the character
    function findCharacter(characterId) {
        let result = characters.find(character => {
            return character.id == characterId
        })
        return result;
    }

    //Renders Show Card
    function renderCharacterInfo(character) {
        detailedInfo.innerHTML = ''
        detailedInfo.insertAdjacentHTML('beforeend', `
        <p id="name">${character.name}</p>
        <img id="image" src="${character.image}">
        <h4 id="${character.id}">
            "Total Calories: "
            <span id="calories">${character.calories}</span>
        </h4>
        <form id="calories-form" data-id="${character.id}">
            <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
            <input type="text" placeholder="Enter Calories" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>
        <button id="reset-btn" data-id="${character.id}">Reset Calories</button>`)
    }

    //handles the submits
    function submitHandler() {
        document.addEventListener('submit', function (e) {

            //Code for when they want to add calories
            if(e.target.matches('form#calories-form')) {
                let character = findCharacter(e.target.dataset.id)
                let form = e.target.value
                e.preventDefault();
                let newCalories = parseInt(e.target[1].value, 10) + character.calories
                console.log(newCalories)
                console.log(character.calories)
                let options = {

                    method: 'PATCH',

                    headers: {
                        'Content-Type': 'application/json' ,
                        Accept: 'application/json'
                    },

                    body: JSON.stringify({
                        'calories': newCalories 
                    })
                }
                fetch(`http://localhost:3000/characters/${character.id}`, options)
                .then(response => response.json())
                .then(updatedChar => {
                    characterBar.innerHTML = ''
                    detailedInfo.innerHTML = ''
                    getCharacters()
                    renderCharacterInfo(updatedChar)
                })


            }
                
        })
    }
    
    //calling on DOM load
    getCharacters();
    clickHandler();
});