//HELPER METHODS
const qs = (tag) => document.querySelector(tag)
const ce = (item) => document.createElement(item)
//GLOBAL VARIABLES
const baseUrl = 'http://localhost:3000/characters/'
const charBar = qs('#character-bar')
const charPage = qs('.characterInfo')
const calForm = qs('#calories-form')

//FETCH ALL THE CHARACTER DATA
const getChars = () => {
  fetch(baseUrl)
    .then(res => res.json())
    .then(chars => renderChars(chars))
}

//ITERATE THROUGH AND RENDER ALL THE CHARACTERS
const renderChars = (chars) => {
  charBar.innerHTML = ''
  for (const char of chars) {
    renderCharBar(char)
  }
}

//RENDER INDIVIDUAL CHARACTERS
const renderCharBar = (char) => {
  const span = ce('span')
  span.id = char.id
  span.innerText = char.name

  charBar.append(span)
}

//RENDER INDIVIDUAL CHARACTERS
/*
√ 1. ADDEVENTLISTENER TO CHAR SPANS
√ 2. ON CLICK RENDER INDIVIDUAL CHAR IN DETAILED INFO DIV
*/
const clickHandler = () => {
  charBar.addEventListener('click', e => {
    if (e.target.matches('span')) {
      const charId = e.target.id
      fetch(baseUrl + charId)
        .then(resp => resp.json())
        .then(char => renderChar(char))
    }
  })
  charPage.addEventListener('click', e => {
    const charId = parseInt(qs('#characterId').value)
    if (e.target.matches('#reset-btn')) {
      resetCal(charId)
    }
    if (e.target.matches('#edit-btn')) {
      e.target.style.visibility = 'hidden'
      editButton()
    }
  })
}

const renderChar = (char) => {
  charPage.innerHTML = `
  <div id="detailed-info">
  <p id="name">${char.name}</p>
  <button id="edit-btn" style="{visibility: visible}">Edit Name</button>
  <br><br>
  <img id="image" src="${char.image}"><!-- display character image here -->
  <h4>Total Calories: <span id="calories">${char.calories}</span> </h4>
  <form id="calories-form">
  <input type="hidden" value="${char.id}" id="characterId"/> <!-- Assign character id as a value here -->
  <input type="text" placeholder="Enter Calories" id="calories"/>
  <input type="submit" value="Add Calories"/>
  </form>
  <button id="reset-btn">Reset Calories</button>
  </div>
  `
}

//ADD CALORIES TO CHAR
/*
 √ 1. ADD SUBMITHANDLER EVENTLISTENER
 √ 2. SEND PATCH REQUEST TO SERVER WITH UPDATED INFO
*/
const submitHandler = () => {
  charPage.addEventListener('submit', e => {
    e.preventDefault()
    const form = e.target
    const charId = form.characterId.value
    const div = form.parentElement
    const h4Text = div.children[2].children

    const calCount = parseInt(h4Text[0].innerText)
    const addedCalCount = parseInt(form.calories.value)
    newCalCount = calCount + addedCalCount

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "calories": newCalCount
      })
    }

    fetch(baseUrl + charId, options)
      .then(resp => resp.json())
      .then(char => renderChar(char))
  })
}

//RESET CALORIE COUNTER
/*
 √ 1. ADD RESET BUTTON TO CLICKHANDLER
 √ 2. SEND PATCH REQUEST MUCH LIKE SUBMITHANDLER
*/
const resetCal = (charId) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "calories": 0
    })
  }

  fetch(baseUrl + charId, options)
    .then(resp => resp.json())
    .then(char => renderChar(char))
}

// ADD CHAR EDIT FORM
/*
  1. ADD EDIT BUTTON TO TOP OF SHOW PAGE
  2. ADD BUTTON TO CLICKHANDLER
  3. ONCE CLICKED POPULATE FORM TO EDIT NAME
  4. SEND PATCH REQUEST WITH NEW NAME
*/
const editButton = () => {
  const form = ce('form')
  form.innerHTML = `
  <input type="text" placeholder="Enter Name" id="edit-name"/>
  <input type="submit" value="Submit Name"/>
  `

  const editVal = form.querySelector('#edit-name').value


  const p = qs('#name')

  p.append(form)
  debugger
}
/*
Change character's name
Add a new character
*/

clickHandler()
getChars()
submitHandler()
