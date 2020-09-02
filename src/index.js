const baseURL = 'http://localhost:3000/characters/'
const gid = id => document.getElementById(id)
const ce = element => document.createElement(element)
const qs = selector => document.querySelector(selector)

const characterBar = gid('character-bar')
const caloriesForm = gid('calories-form')
const resetBtn = gid('reset-btn')
const editBtn = ce('button')
    editBtn.innerText = "Change Name"
    editBtn.classList.add('edit-name')
const nameForm = ce('form')
const detailedInfo = gid('detailed-info')
const name = gid('name')

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
    const img = gid('image')
    const calories = gid('calories')
    
    editBtn.dataset.characterId = character.id
    caloriesForm[0].value = character.id
    name.innerText = character.name
    img.src = character.image
    calories.innerText = character.calories
    name.append(editBtn)
}

characterBar.addEventListener('click', e => {
    if (e.target.matches('span')) {
        const spanCharacterId = e.target.dataset.characterId
        fetch(baseURL + spanCharacterId)
        .then(resp => resp.json())
        .then(character => displayCharacterInfo(character))
    }
})

function patchFetch(characterId, config) {
    fetch(baseURL + characterId, config)
    .then(resp => resp.json())
    .then(character => displayCharacterInfo(character))
}

function createConfig(type, value) {
    if (type == "calories") {
        return {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({
                calories: value
            })
        }
    } else if (type == "name") {
        return {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({
                name: value
            })
        }
    }
}

function changeCalories(target) {
    const characterId = gid('characterId').value
    let totalCalories
    if (target === caloriesForm) {
        const oldCalories = parseInt(gid('calories').innerText)
        const newCalories = parseInt(gid('new-calories').value)
        totalCalories = oldCalories + newCalories
    } else if (target === resetBtn) {
        totalCalories = 0
    }
    console.log(totalCalories)
    const config = createConfig('calories', totalCalories)
    patchFetch(characterId, config)  
}

detailedInfo.addEventListener('submit', e => {
    e.preventDefault()
    if (e.target === caloriesForm) {
        changeCalories(e.target)
    } else if (e.target === nameForm) {
        const newName = e.target.name.value
        const characterId = e.target.previousSibling.dataset.characterId
        console.log(characterId)
        const config = createConfig("name", newName)
        patchFetch(characterId, config)
    }
})

detailedInfo.addEventListener('click', e => {
    if (e.target === resetBtn) {
        changeCalories(e.target)
    } 
    else if (e.target === editBtn) {
        console.log('howdy')
        nameForm.innerHTML = `
        <input type="text" name="name" placeholder="New Name Here"/>
        <input type="submit" value="Submit"/>
        ` 
    name.append(nameForm)
    }
})

getCharacters()
