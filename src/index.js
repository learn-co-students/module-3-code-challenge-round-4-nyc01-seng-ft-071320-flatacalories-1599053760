const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)

const baseUrl = 'http://localhost:3000/characters/'
const characterBar = qs('#character-bar')
const characterInfo = qs('#detailed-info')



const fetchCharacters = () => {
    fetch(baseUrl)
        .then(resp => resp.json())
        .then(renderCharacterSpans)
}

const renderCharacterSpans = (characters) => {
    for (const char of characters) {
        const characterSpan = ce('span')
        characterSpan.dataset.id = char.id
        characterSpan.innerHTML = `${char.name}`
        characterBar.append(characterSpan)
    }
}

const clickHandler = () => {
    characterBar.addEventListener('click', e => {
        if (e.target.matches('span')) {
            let span = e.target
            let charId = span.dataset.id
            fetchChar(charId)
        }
    })
    characterInfo.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const characterForm = qs('#calories-form')
            patchCalories(characterForm, true)
        }
    })
}

const fetchChar = (charId) => {
    fetch(baseUrl + charId)
        .then(resp => resp.json())
        .then(renderCharInfo)
}

const renderCharInfo = (character) => {
    characterInfo.innerHTML = `
    <p id="name">${character.name}</p>
    <img id="image" src="${character.image}" alt="${character.name}">
    <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
    <form id="calories-form">
        <input type="hidden" value="${character.id}" name="id" id="characterId" />
        <input type="text" placeholder="Enter Calories" name="calories" id="calories" />
        <input type="submit" value="Add Calories" />
    </form>
    <button id="reset-btn">Reset Calories</button>
    `
}

const submitHandler = () => {
    document.addEventListener('submit', e => {
        e.preventDefault()
        const characterForm = qs('#calories-form')

        patchCalories(characterForm)
    })
}

const patchCalories = (form, reset = false) => {
    let id = form.id.value
    let currentCals = parseInt(qs('h4 > span').innerHTML)
    let newCals = parseInt(form.calories.value)
    let totalCals = currentCals + newCals
    if (reset) { totalCals = 0 }

    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "calories": totalCals })
    }

    fetch(baseUrl + id, options)
        .then(resp => resp.json())
        .then(renderCharInfo)
}

submitHandler()
fetchCharacters()
clickHandler()