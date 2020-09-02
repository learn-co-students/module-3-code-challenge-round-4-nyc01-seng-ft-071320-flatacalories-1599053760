document,addEventListener('DOMCOontentLoaded', () => {
    const BASEURL = "http://localhost:3000/characrters/"

    //fetch characters from server
    const getCharacters = () => {
        fetch(BASEURL)
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
    //you say to use span but the names also have to be a button that runs a post request
    characterNames.innerHTML = `
    <span>${nameObj.name}</span> 
    `
    }
renderNames()



    //single render instructions
    // const renderCharacter = (characterObj) => {
    //     const characterDiv = document.querySelector('#detailed-info')
    //     const characterSpan = document.createElement('div')
    //     characterSpan.className = 'characterInfo'
    //     characterSpan.innerHTML =`
    //         <p id="name">${characterObj.name}</p>
    //         <img id="image" src="${characterObj.image}"><!-- display character image here -->
    //         <h4>Total Calories: <span id="calories">${characterObj.calories}</span> </h4>
    //     `
    //     characterDiv.append(characterSpan)
    // }
    // getCharacters()


   




})//dom content loaded