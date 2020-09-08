// ######### DELIVERABLES ##############//

document.addEventListener('DOMContentLoaded', function (e){
    fetchNames()

}) // end of Content Loaded 

let baseUrl = 'http://localhost:3000/characters/'

let characterBar= document.querySelector('#character-bar')

let detailedInfo = document.querySelector('#detailed-info')

function fetchNames(){
    fetch(baseUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(names){
        console.log(names)
        parseNames(names)
    })
} // end of fetechNames 

function parseNames(names){
    names.forEach(renderNames)
}

function renderNames(character){
    let barName = document.createElement('div')
    barName.setAttribute('span', character.name)
    barName.setAttribute('id', character.id)
    barName.innerText=character.name
    console.log(barName)
    characterBar.append(barName)
}

// click listener to run fetch
// functions to render the datat 

function fetchCharacter(id){
    fetch(baseUrl + id )
    .then(function(response){
        return response.json()
    })
    .then(function(info){
        console.log(info)
        renderCharacterInfo(info)
    })
} // end of fetchCharacter

function renderCharacterInfo(info){
console.log('entereed renderCharacterInfo')

//grab all the DOM nodes I want to change
// set them to data from my fetch 

document.querySelector('#name').innerText = info.name
document.querySelector('#image').src = info.image
document.querySelector('#calories').innerText = info.calories 
document.querySelector('#characterId').value = info.id 
document.querySelector('#calories-form').setAttribute('cal', info.calories)

}// end of renderCharacterInfo 

document.addEventListener('click', function(e){
    if(e.target.parentNode === characterBar){
        console.log('character clicked')
        console.log(e.target.id)
        console.dir(e.target)
        fetchCharacter(e.target.id)
    }
}) // end of click listener 

document.addEventListener('submit', function(e){
    e.preventDefault()

    let charId = document.querySelector('#calories-form').children[0].value

    let newCalories = document.querySelector('#calories-form').children[1].value
   
    let oldCalories = document.querySelector('#calories').innerText

    let updatedCal = parseInt(newCalories, 10) + parseInt(oldCalories, 10) 
  
    updateCalories(charId, updatedCal)
    console.log(charId, updatedCal)
}) // end of my submit listener

function updateCalories(id, calories){
    // update page rendering  
    document.querySelector('#calories').innerText = calories 
    // run patch request
    let data = {calories: calories}
    let options = { 
        method: 'PATCH',
        headers: { 
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(baseUrl + id, options)
}

