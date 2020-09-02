const baseURL = 'http://localhost:3000/characters/'
const gid = id => document.getElementById(id)
const ce = element => document.createElement(element)
const qs = selector => document.querySelector(selector)

const characterBar = gid('character-bar')
const caloriesForm = gid('calories-form')

function getCharacters() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(characters => displayCharacters(characters))
}

function displayCharacters(characters) {
    for (const character of characters) {
        displayCharacterName(character)
    }
}

function displayCharacterName(character) {
    const characterSpan = ce('span')
    characterSpan.dataset.characterId = character.id
    characterSpan.textContent = character.name

    characterBar.append(characterSpan)
}

function displayCharacterInfo(character) {
    const name = gid('name')
    const img = gid('image')
    const calories = gid('calories')

    caloriesForm[0].value = character.id
    name.innerText = character.name
    img.src = character.image
    calories.innerText = character.calories
}

characterBar.addEventListener('click', e => {
    if (e.target.matches('span')) {
        const characterId = e.target.dataset.characterId
        fetch(baseURL + characterId)
        .then(resp => resp.json())
        .then(character => displayCharacterInfo(character))
    }
})

caloriesForm.addEventListener('submit', e => {
    e.preventDefault()
    const characterId = gid('characterId').value
    const calories = parseInt(gid('calories').innerText)
    const newCalories = parseInt(gid('new-calories').value)
    const config = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accepts": "application/json"
        },
        body: JSON.stringify({
            calories: calories + newCalories
        })
    } 
    fetch(baseURL + characterId, config)
    .then(resp => resp.json())
    .then(character => displayCharacterInfo(character))
})


getCharacters()










/*
1. get characters and display in span with id dataset
2. on click, fetch character/id, display info using a function 
3. on click, fetch character/id, patch, up calorie by 1
*/