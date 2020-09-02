document.addEventListener('DOMContentLoaded', (event) => {

const charUrl = "http://localhost:3000/characters/"
const charImage = document.querySelector("#image")
const charName = document.querySelector("#name")
const allCharNames = document.querySelector("#character-bar")
const calorieForm = document.querySelector("#calories-form")
const resetCalorieBtn = document.querySelector("#reset-btn")

console.log(calorieForm)


// need <span> tag for each character


    function getCharacters(url){
        fetch(url).then(response => response.json()).then(charsInfo => renderCharacters(charsInfo))
    }
    getCharacters(charUrl)


    function renderCharacters(characters){
        let charSpan = document.createElement("span")
        let charSpans = characters.forEach(character =>
            document.createElement("span").innerText = character.name)
        // allCharNames.appendChild(charSpan)
        // charSpan.className = `${character.name}`
        console.log(charSpans)
    }


})