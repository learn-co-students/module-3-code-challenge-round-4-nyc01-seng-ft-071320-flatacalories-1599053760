document.addEventListener('DOMContentLoaded', (e) => {
    baseUrl = "http://localhost:3000/characters/"

    
    
    //core variables required for functions
    let divBar = document.querySelector('#character-bar')
    let divCard = document.getElementById('detailed-info')
    let form = document.querySelector('form')
    let resetBtn = document.querySelector('reset-btn')
    let name = document.querySelector('#name')
    // console.log(name)
    // console.log(form)
    // console.log(divBar)

    //create a get request to get all the necessary data
    const getData = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(characters => renderCharacters(characters)) //aspirational code
    }

    function renderCharacters(characters) {
        divBar.innerHTML = ''
        for (const character of characters) {
            renderCharacterName(character)  //another aspirational function
        }
    }

    function renderCharacterName(character) {
        //create a span-tag for each character
        //span-tag includes character's name  
        const span = document.createElement('span')
        span.dataset.id = character.id
        span.textContent = character.name
        divBar.append(span)
        // debugger
    }

    //create a function to show the character information
    function showCharInfo(character) {
        form.dataset.id = character.id
        //create variables for the elements I need to find
        const image = document.getElementById('image')
        const calories = document.getElementById('calories')

        //set the variables to the appropriate info
        name.innerText = character.name
        image.src = character.image
        calories.innerText = character.calories

    }

    //Now on the click of a character's name, allow user to see the characters info
    // Within the #detailed-info div 
    const clickHandler = () => {
        document.addEventListener('click', e => {
            // console.log(e.target)
            if (e.target.matches('span')) {
                const spanId = e.target.dataset.id
                
                //Now that I have a character ID equal to the span's ID
                //I can make a fetch request for the specific character with the following:
                fetch(baseUrl + spanId)
                .then(response => response.json())
                .then(character => showCharInfo(character))
            }
        
        })
    }

    document.addEventListener('submit', e => {
        e.preventDefault()
        id = e.target.dataset.id

        currentCalories = parseInt(e.target.parentElement.querySelector('h4').innerText.split(' ')[2], 10)
        formArray = Array.from(e.target.children)
        inputCalories = parseInt(formArray[1].value, 10)
        totalCalories = currentCalories + inputCalories
        console.log(id)
        // debugger
        options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                "calories": totalCalories
            })
        }
        fetch(baseUrl + id, options)
        .then(resp => resp.json())
        .then(character => {
            showCharInfo(character)
            form.reset()
        })
    })
    

    //invoke the appropriate functions
    getData()
    clickHandler()
})

   //     Core Deliverables
    
    // (DONE) See all characters names in a div with the id of "character-bar". On page load, request data from the server to get all of the characters objects. When you have this information, you'll need to add a span tag with the character's name to the character bar.
    
    // (DONE)Select a character from the character bar and see character's info inside #detailed-info div.
    
    // (DONE) Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.
