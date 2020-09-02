const baseURL = 'http://localhost:3000/characters/'
const charBar = document.querySelector('#character-bar')
const details = document.querySelector('#detailed-info')
const form = document.querySelector('#calories-form')

//fetch all the obj's from API
fetch(baseURL)
.then(resp => resp.json())
.then(renderCharacters)

//iterate through each obj
function renderCharacters(characters){
    for(let character of characters){
        renderCharacter(character)
    }
}

//add name of character in a div on the character bar
function renderCharacter(character){
    const span = document.createElement('span')
    span.dataset.id = character.id
    span.innerText = character.name
    charBar.append(span)
}

//create a listener for a click on the charBar
charBar.addEventListener('click', function(e){
    if(e.target.matches('span')){
        grabCharInfo(e.target.dataset.id)
    }
})

//locate character for character clicked on page
function grabCharInfo(charId){
    fetch(baseURL + charId)
    .then(resp => resp.json())
    .then(displayInfo)
}

//display details about character on page
function displayInfo(character){
    //details.dataset.id = character.id
    details.children[0].innerText = character.name
    details.children[1].outerHTML = `<img id="image" src=${character.image}>`
    details.children[2].children[0].innerText = character.calories
    details.children[2].dataset.id= character.id
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    e.target.children[0].id = e.target.previousElementSibling.dataset.id
    console.log(form.children[1].value)

})