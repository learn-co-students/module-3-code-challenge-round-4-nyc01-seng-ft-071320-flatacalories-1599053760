document.addEventListener('DOMContentLoaded', (e) => {
    baseUrl = "http://localhost:3000/characters"

    //core variables required for functions
    divBar = document.querySelector('#character-bar')
    // console.log(divBar)

    //create a get request to get all the necessary data
    const getData = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(characters => renderCharacters(characters)) //aspirational code
    }

    function renderCharacters(characters) {

        for (const character of characters) {
            renderCharacter(character)  //another aspirational function
        }
    }

    function renderCharacter(character) {
        //create a span-tag for each character
        //span-tag includes character's name  
            //append the element to the divBar created at outermost scope
        
        let span = document.createElement('span')
        // console.log(span)
        
        //create the id ---> potential future purposes
        span.dataset.id = character.id

        span.innerHTML = `
        <h4 class="char-name">${character.name}</h4>
        `

        divBar.append(span)

    }

    //Now on the click of a character's name, allow user to see the characters info
    // Within the #detailed-info div 
    const clickHandler = () => {
        document.addEventListener('click', e => {
            // console.log(e.target)
            if (e.target.matches('.char-name')) {
                let divCard = document.getElementById('detailed-info')
                debugger
                // divCard.innerHTML = `
                // <p id="name">${character.name}</p>
                // <img id="image" src="assets/dummy.gif"><!-- ${character.image} -->
                // <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
                // <form id="calories-form">
                //     <input type="hidden" value="Character's id" id="characterId"/> <!-- ${character.id} -->
                //     <input type="text" placeholder="Enter Calories" id="calories"/>
                //     <input type="submit" value="Add Calories"/>
                // </form>
                // <button id="reset-btn">Reset Calories</button>
                // `
            }
        })
    }

    //invoke the appropriate functions
    getData()
    clickHandler()

//     Core Deliverables

// (DONE) See all characters names in a div with the id of "character-bar". On page load, request data from the server to get all of the characters objects. When you have this information, you'll need to add a span tag with the character's name to the character bar.

// Select a character from the character bar and see character's info inside #detailed-info div.

// Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.


})