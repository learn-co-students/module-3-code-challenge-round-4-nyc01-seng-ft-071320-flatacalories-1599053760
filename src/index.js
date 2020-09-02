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
        characterBar.prepend(characterSpan)
    }
}

const clickHandler = () => {
    characterBar.addEventListener('click', e => {
        if (e.target.matches('span')) {
            let span = e.target
            let charId = span.dataset.id
            fetchChar(charId)
        } else if (e.target.matches('button')) {
            characterInfo.innerHTML = `
            <form id="new-character-form">
                <input type="text" placeholder="Enter Character Name" name="name" id="name" />
                <input type="text" placeholder="Image URL Goes Here" name="image" id="image" />
                <input type="submit" value="Create Character" />
            </form>
            `
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
        <input type="text" value="${character.name}" name="name" id="characterId" />
        <input type="text" value="0" name="calories" id="calories" />
        <input type="submit" value="Update Character" />
    </form>
    <button id="reset-btn">Reset Calories</button>
    `
}

const submitHandler = () => {
    document.addEventListener('submit', e => {
        e.preventDefault()
        if (e.target.matches('#calories-form')) {
            const characterForm = e.target
            patchCalories(characterForm)
        } else if (e.target.matches('#new-character-form')) {
            const newForm = e.target
            postCharacter(newForm)
        }
    })
}

const patchCalories = (form, reset = false) => {
    let id = form.id.value
    let currentCals = parseInt(qs('h4 > span').innerHTML)
    let newCals = parseInt(form.calories.value)
    let totalCals = currentCals + newCals
    if (reset) { totalCals = 0 }

    const newObj = {
        "name": form.name.value,
        "calories": totalCals
    }

    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newObj)
    }

    fetch(baseUrl + id, options)
        .then(resp => resp.json())
        .then(renderCharInfo)
}

const postCharacter = (form) => {
    const newChar = {
        "name": form.name.value,
        "image": form.image.value,
        "calories": 0
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newChar)
    }

    fetch(baseUrl, options)
        .then(resp => resp.json())
        .then(renderCharInfo)
        .then(data => {
            characterBar.innerHTML = ""
            fetchCharacters()
        })
}

submitHandler()
fetchCharacters()
clickHandler()