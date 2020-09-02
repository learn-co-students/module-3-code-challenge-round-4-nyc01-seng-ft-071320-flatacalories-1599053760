// √ Get characters from the db
// √ Render characters onto the page into spans

// √ Add click listener for each span
// √ Get single character data on click
// √ Render character data to page

// √ Add click listener for add calories form
// √ Send Patch request to db to update data
// √ Update DOM using pessimistic rendering


const baseURL = 'http://localhost:3000/characters/'
const charBar = document.getElementById('character-bar')
const charShow = document.getElementById('detailed-info')

let allCharacters = []


function getCharacters(){
  fetch(baseURL)
  .then(resp=>resp.json())
  .then(renderCharacters)
}

function renderCharacters(charArray){
  for (const char of charArray){
    renderCharacter(char)
    allCharacters.push(char)
  }
}

function renderCharacter(charObj){
  charBar.insertAdjacentHTML('beforeend', `<span data-id="${charObj.id}">${charObj.name}</span>`)
}

charBar.addEventListener('click', e => {
  if (e.target.matches('span')){
    getCharacterShow(e.target.dataset.id)
  }
})

function getCharacterShow(charId){
  fetch(baseURL+charId)
  .then(resp=>resp.json())
  .then(renderCharacterShow)
}

function renderCharacterShow(charObj){
  charShow.innerHTML = ""
  charShow.insertAdjacentHTML('afterbegin', `
      <p id="name">${charObj.name}</p>
      <img id="image" src="${charObj.image}">
      <h4>Total Calories: <span data-id="${charObj.id}" id="calories">${charObj.calories}</span> </h4>
      <form data-id="${charObj.id}" id="calories-form">
          <input name="charId" type="hidden" value="${charObj.id}" id="characterId"/>
          <input name="calories" type="text" placeholder="Enter Calories" id="calories"/>
          <input type="submit" value="Add Calories"/>
      </form>
      <button id="reset-btn">Reset Calories</button>
  `)
}

charShow.addEventListener('submit', e => {
  e.preventDefault()
  if (e.target.matches('form#calories-form')){
    const currentCals = document.querySelector('span#calories').innerText
    const newCals = e.target.calories.value
    updateLikes(currentCals, newCals, e.target.charId.value)
  }
})

function updateLikes(currentCals, newCals, charId){
  let calNum = parseInt(currentCals, 10) + parseInt(newCals, 10)

  const options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({calories: calNum})
  }
  
  fetch(baseURL+charId, options)
  .then(resp=>resp.json())
  .then(renderCharacterShow)
}





getCharacters()
