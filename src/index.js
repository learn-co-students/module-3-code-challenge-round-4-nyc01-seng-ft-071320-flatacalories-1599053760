document.addEventListener('DOMContentLoaded', function (e){
    fetchNames()
}) 
// ############## common variables ################
let baseUrl = 'http://localhost:3000/characters/'
let characterBar= document.querySelector('#character-bar')
let detailedInfo = document.querySelector('#detailed-info')
// ################################################

// click listener for names on character bar 
document.addEventListener('click', function(e){
    if(e.target.parentNode === characterBar){
        console.log('character clicked')
        console.log(e.target.id)
        console.dir(e.target)
        fetchCharacter(e.target.id)
    } 
}) 

// fetch for name bar 
function fetchNames(){
    fetch(baseUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(names){
        console.log(names)
        parseNames(names)
    })
} 

// iterate through initial fetch 
function parseNames(names){
    names.forEach(renderNames)
}

// render names onto name bar 
function renderNames(character){
    let barName = document.createElement('span')
    barName.setAttribute('id', character.id)
    barName.innerText=character.name
    console.log(barName)
    characterBar.append(barName)
}

// fetch character info based on id of name click 
function fetchCharacter(id){
    fetch(baseUrl + id )
    .then(function(response){
        return response.json()
    })
    .then(function(info){
        console.log(info)
        renderCharacterInfo(info)
    })
} 

//change character card based on fetch 
function renderCharacterInfo(info){
    //grab all the DOM nodes I want to change
    // set them to data from my fetch 
    document.querySelector('#name').innerText = info.name
    document.querySelector('#image').src = info.image
    document.querySelector('#calories').innerText = info.calories 
    document.querySelector('#characterId').value = info.id 
    document.querySelector('#calories-form').dataset.cal=info.calories
    
}

//submit listener for add calories button 
document.addEventListener('submit', function(e){
    e.preventDefault()
    console.log(e.target)
    //e.target is already the form 
    if(e.target.id === 'calories-form'){
    let charId = e.target.children[0].value
    //no need for chilren in line above, inputs are already indexed by being wrapped in a form 

    let newCalories = document.querySelector('#calories-form').children[1].value
   
    let oldCalories = document.querySelector('#calories').innerText

    let updatedCal = parseInt(newCalories, 10) + parseInt(oldCalories, 10) 
  
    updateCalories(charId, updatedCal)
    console.log(charId, updatedCal)
    } 
}) 

// update DOM and patch request to add calories to API 
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

// reset button click listen 
document.addEventListener('click', function(e){
    if (e.target.id === 'reset-btn'){
        console.log(e.target)
        let charId = document.querySelector('#calories-form').children[0].value
        updateCalories(charId, 0)
    }
})

// ################## change character name ####################



// notes ##################
// data binding: taking stuff from API and binding it to DOM 
// barName.setAttribute('id',character.id) is the same as barName.id=character.id 
// using id (attribute) should be saved for styling, dataset is a better place to keep properties 
