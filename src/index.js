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
  charBar.insertAdjacentHTML('beforeend', `<span class="nav-bar" data-id="${charObj.id}">${charObj.name}</span>`)
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
      <button data-id="${charObj.id}" id="change-name">Change Character Name</button><br><br>
      <img id="image" src="${charObj.image}">
      <h4>Total Calories: <span data-id="${charObj.id}" id="calories">${charObj.calories}</span> </h4>
      <form data-id="${charObj.id}" id="calories-form">
          <input name="charId" type="hidden" value="${charObj.id}" id="characterId"/>
          <input name="calories" type="number" placeholder="Enter Calories" id="calories"/>
          <input type="submit" value="Add Calories"/>
      </form>
      <button id="reset-btn">Reset Calories</button>
  `)
  addClickHandler()
}

charShow.addEventListener('submit', e => {
  e.preventDefault()
  if (e.target.matches('form#calories-form')){
    const currentCals = document.querySelector('span#calories').innerText
    const newCals = e.target.calories.value
    updateLikes(currentCals, newCals, e.target.charId.value)
    e.target.reset() 
  }
})

function updateLikes(currentCals, newCals, charId){
  if (newCals === ""){newCals=0}
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

//EXTRA DELIVERABLES HERE//

function addClickHandler(){
  const resetButton = document.getElementById('reset-btn')
  const nameButton = document.getElementById('change-name')
  
  resetButton.addEventListener('click', e => {
    const charId = e.target.previousElementSibling.dataset.id
    resetCalories(charId)
  })

  nameButton.addEventListener('click', e => {
    const charName = e.target.previousElementSibling.innerText
    showNameForm(e.target.dataset.id, charName)
    nameButton.style.display = "none"
  })
}

function resetCalories(charId){
  const options = {
    method: 'PATCH', 
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({calories: 0})
  }
  fetch(baseURL+charId, options)
  .then(resp=>resp.json())
  .then(renderCharacterShow)
}

function showNameForm(charId, charName){
  charShow.insertAdjacentHTML('afterbegin', `
    <form id="new-name-form">
      <input name="name" type="text" placeholder="${charName}">
      <input type="submit" value="Change Name">
    </form>
  `)
  form = document.querySelector('form#new-name-form')
  form.dataset.id = charId
  addListenerForForm(form)
}

function addListenerForForm(form){
  form.addEventListener('submit', e=>{
    e.preventDefault()
    changeName(form.name.value, form.dataset.id)
    form.remove()
  })
}

function changeName(newName, charId){
  const options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({name: newName})
  }

  fetch(baseURL+charId, options)
  .then(resp=>resp.json())
  .then(results=>{
    renderCharacterShow(results)

    const foundSpan = document.querySelector(`span.nav-bar[data-id="${results.id}"]`)
    foundSpan.innerText = `${results.name}`
  })

}


getCharacters()
