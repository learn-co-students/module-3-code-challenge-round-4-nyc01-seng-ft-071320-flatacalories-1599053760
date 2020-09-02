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
}

const renderChar = (char) => {
  charPage.innerHTML = `
    <div id="detailed-info">
      <p id="name">${char.name}</p>
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
  1. ADD SUBMITHANDLER EVENTLISTENER
  2. SEND PATCH REQUEST TO SERVER WITH UPDATED INFO
*/

const addSubmitHandler = () => {
  calForm.addEventListener('submit', e => {
    e.preventDefault()
    debugger
  })
}

/*
Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.
*/

addSubmitHandler()
clickHandler()
getChars()
