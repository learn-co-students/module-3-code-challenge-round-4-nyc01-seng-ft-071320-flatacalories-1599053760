document,addEventListener('DOMCOontentLoaded', () => {
    const BASEURL = "http://localhost:3000/characrters/"

    //fetch characters from server
    const getCharacters = () => {
        fetch('http://localhost:3000/characrters/')
        .then(resp => resp.jason())
        .then(renderCharacters)
    }

    //render iteration
    const renderCharacters = (characters) => {
        for (const character of characters){
            renderNames(character)
        }
    }

    //render names in the top bar
    const renderNames = (nameObj) => {
    const characterDiv = document.querySelector("#character-bar")
    const characterNames = document.createElement('div')
    //you say to use span but the names also have to be a button shows character detail
    characterNames.innerHTML = `
    <span>${nameObj.name}</span> 
    `
    }

renderNames()



    //detailed info render instructions
    const renderCharacter = (characterObj) => {
        const characterDiv = document.querySelector('#detailed-info')
        const characterSpan = document.createElement('div')
        characterSpan.className = 'characterInfo'
        characterSpan.innerHTML =`
            <p id="name">${characterObj.name}</p>
            <img id="image" src="${characterObj.image}"><!-- display character image here -->
            <h4>Total Calories: <span id="calories">${characterObj.calories}</span> </h4>
        `
        characterDiv.append(characterSpan)
    }
    getCharacters()


    //form that adds calories
    function form (){
        const form = document.querySelector('form')
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const calorie = {
                calories: form.calories.value
            }
        
        fetch('http://localhost:3000/characrters/', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                calorie
            )
        })

    })}

   form()




})//dom content loaded