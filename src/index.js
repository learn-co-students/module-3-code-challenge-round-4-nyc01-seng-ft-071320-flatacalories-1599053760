//Step 1 √
//Get all the characters with a fetch request √
//Make a span for each character with their name in it √

//Step 2
//Add a click listener so that when we sleect a character their info pops up √
//render the detailed info into the div title detailed-info 
//name, image, and calories 

//Step 3
//When we submit with the button on add calories we need a fetch request to patch the number of calories we submit in the form
//Make a submit listener
//grab the value form the input 
//put that value in a patch request
//update the dom with the new amount of calories

document.addEventListener('DOMContentLoaded', function() {

    let characters = []
    const characterBar = document.querySelector('div#character-bar')
    const detailedInfo = document.querySelector('div#detailed-info')

    function getCharacters() {
        fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(allCharacters => {
            renderCharacters(allCharacters)
            characters = allCharacters
        })
    }

    function renderCharacters(characters){
        for(const character of characters) {
            characterBar.insertAdjacentHTML('beforeend', `<span id="${character.id}" class="character-card">${character.name}</span>`)
        }
    }

    function clickHandler() {
        document.addEventListener('click', function(e){
            if(e.target.matches('span.character-card')){
                
            }
            
        })
    }

    getCharacters();
    clickHandler();
})