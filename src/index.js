const baseURL = 'http://localhost:3000/characters/'
const charBar = document.querySelector('#character-bar')
const details = document.querySelector('#detailed-info')
const form = document.querySelector('#calories-form')
const resetCal = document.querySelector('#reset-btn')


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
    details.children[0].innerText = character.name
    details.children[1].outerHTML = `<img id="image" src=${character.image}>`
    details.children[2].children[0].innerText = character.calories
    details.children[2].dataset.id= character.id
    form.children[0].id = character.id
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log(form.children[0].id)
    let charId = e.target.previousElementSibling.dataset.id
    let currentCal = e.target.previousElementSibling.children[0].innerText
    e.target.children[0].id =  charId
    let addedCal = form.children[1].value
    let newCalCount = parseInt(addedCal) + parseInt(currentCal)
    updateCal(newCalCount, charId)
    form.reset();

})

//update the calories for character when user clicks submit button on form
function updateCal(newCal, charId){
    console.log(newCal)
    let updatedCal = parseInt(newCal)
    let config = {
        method: 'PATCH',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
            calories: updatedCal
        })
    }

    fetch(baseURL + charId, config)
    .then(resp => resp.json())
    .then(update => {
        if(update){
            let cal = document.querySelector('#calories')
            cal.innerText = update.calories
        }
    })   
    
}

resetCal.addEventListener('click', function(e){
    let charId = e.target.previousElementSibling[0].id
    updateCal(0, charId)
})
