// code strat 
// need to fetch character objects
// need to load all the names in the top Bar
// need to add an event listener to each name that when clicked will bring up the detailed information on that name
// need to add a patch request on each characters form to edit their calories on both the page and the database


// last 10 minute observations
// I have all there characters loading when I only want 1 character to laod, I need to use quesry selct to define the html elements and replace them rather then just appending everthing to the bottom
// I messed up my base url and dom content spelling for most of the exam it really messed me up -- such a dumb mistake






document,addEventListener('DOMContentLoaded', () => {
    const BASEURL = 'http://localhost:3000/characters/'

    //fetch characters from server
    const getCharacters = () => {
        fetch(BASEURL)
        .then(resp => resp.json())
        .then(renderCharacters)
    }

    //render iteration
    const renderCharacters = (characters) => {
        for (const character of characters){
            renderCharacter(character)
        }
    }

    // render names in the top bar
    // const renderCharacter = (characterObj) => {
    // const characterDiv = document.querySelector("#character-bar")
    // const characterNamesSpan = document.createElement('div')
    // //you say to use span but the names also have to be a button shows character detail
    // characterNamesSpan.innerHTML = `
    // <span data-id='${characterObj.id}'>${characterObj.name}</span> 
    // `
    // }

    



    //detailed info render instructions
    const renderCharacter = (characterObj) => {
        const characterDiv = document.querySelector('#detailed-info')
        const characterSpan = document.createElement('div')
        const name = document.querySelector('name')
        const image = document.querySelector('image')
        const calories = document.querySelector('calories')
        characterSpan.className = 'characterInfo'
        characterSpan.innerHTML =`
            <p id="name">${characterObj.name}</p>
            <img id="image" src="${characterObj.image}"><!-- display character image here -->
            <h4>Total Calories: <span id="calories">${characterObj.calories}</span> </h4>
        `
        characterDiv.append(characterSpan)
    }
    // getCharacters()
            // name = ${characterObj.name}
            // image = ${characterObj.image
            // calories = ${characterObj.calories}

    //form that adds calories
    function form (){
        const form = document.querySelector('form')
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const calories = {
                calories: form.calories.value
            }
        
        fetch('http://localhost:3000/characrters/${id}', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {"calories": calories}
            )
        })

    })}

   

    //event listener for character name bar itmes
    function clicker() {
        document.addEventListener("cliick", (e) => {
            console.log("you are int he clicker")

        }
        
        )
    }



form()
getCharacters()
clicker()
})//dom content loaded