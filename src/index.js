const baseURL = 'http://localhost:3000/characters/'
const gid = id => document.getElementById(id)
const ce = element => document.createElement(element)
const qs = selector => document.querySelector(selector)

const characterBar = gid('character-bar')
const caloriesForm = gid('calories-form')
const resetBtn = gid('reset-btn')

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
        const spanCharacterId = e.target.dataset.characterId
        fetch(baseURL + spanCharacterId)
        .then(resp => resp.json())
        .then(character => displayCharacterInfo(character))
    }
})

function changeCalories(target) {
    const characterId = gid('characterId').value
    if (target == caloriesForm) {
        console.log('hey')
        // const oldCalories = parseInt(gid('calories').innerText) 
        // const newCalories = parseInt(gid('new-calories').value)
        // const calories = oldCalories + newCalories
    } else if (target == resetBtn) {
        console.log('howdy')
        // const calories = 0
    }
    console.log(calories)
    const config = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accepts": "application/json"
        },
        body: JSON.stringify({
            calories: calories
        })
    } 

    fetch(baseURL + characterId, config)
    .then(resp => resp.json())
    .then(character => displayCharacterInfo(character))

}

caloriesForm.addEventListener('submit', e => {
    e.preventDefault()
    changeCalories(e.target)
})

resetBtn.addEventListener('click', e => {
    const characterId = gid('characterId').value
    console.log(characterId)
    const config = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accepts": "application/json"
        },
        body: JSON.stringify({
            calories: 0
        })
    }
    fetch(baseURL + characterId, config)
    .then(resp => resp.json())
    .then(character => displayCharacterInfo(character))
})

getCharacters()



