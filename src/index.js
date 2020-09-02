document,addEventListener('DOMCOontentLoaded', () => {
    const BASEURL = "http://localhost:3000/characrters/"

    const getCharacters = () => {
        fetch(BASEURL)
        .then(resp => resp.jason())
        .then(renderCharacters)
    }

    const renderCharacters = (characters) => {
        for (const character of characters){
            renderCharacter(character)
        }
    }

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




})//dom content loaded