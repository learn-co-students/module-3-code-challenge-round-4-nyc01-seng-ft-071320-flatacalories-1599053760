document.addEventListener('DOMContentLoaded', () => {
  const detailedInfoContainer = document.querySelector('#detailed-info')
  const caloriesForm = document.querySelector('#calories-form')

  const baseURL = 'http://localhost:3000/characters/'

  function loadCharacters() {
    fetch(baseURL)
      .then(resp => resp.json())
      .then(characters => characters.forEach(
        character => renderCharacter(character)
      ))
  }

  function renderCharacter(character) {
    const charBar = document.querySelector('#character-bar')
    charBar.insertAdjacentHTML('beforeend', `
      <span class="character-bar span" data-char-id=${character.id}>${character.name}</span>
    `)
  }

  function clickHandler() {
    document.addEventListener('click', e => {
      const click = e.target
      if (click.matches('.character-bar')) {
        const charId = click.dataset.charId
        loadCharacter(charId)
      } else if (click.matches('#reset-btn')) {
        const charId = caloriesForm.firstElementChild.id
        debugger
        resetCounter(charId)
      }
    })
  }

  function loadCharacter(charId) {
    fetch(baseURL + charId)
      .then(resp => resp.json())
      .then(renderCharacterDetail)
  }

  function renderCharacterDetail(character) {
    detailedInfoContainer.innerHTML = ''
    detailedInfoContainer.insertAdjacentHTML('beforeend', `
    <p id="name">${character.name}</p>
    <img id="image" src="${character.image}">
    
    <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
    <form id="calories-form">
        <input type="hidden" value="Character's id" id=${character.id} data-char-id=/> <!-- Assign character id as a value here -->
        <input type="text" placeholder="Enter Calories" id="calories"/>
        <input type="submit" value="Add Calories"/>
    </form>
    <button data-char-id=${character.id} id="reset-btn">Reset Calories</button>
    `)
  }

  function submitHandler() {
    document.addEventListener('submit', e => {
      e.preventDefault()
      
      const calorieField = caloriesForm.querySelector('#calories') 
      const addedCalories = calorieField.value
      const charId = caloriesForm.firstElementChild.id
      debugger
      const currentCal = detailedInfoContainer.querySelector('#calories').innerText
      updateCharacterCalories(currentCal, addedCalories, charId)
      // debugger
    })
  }

  function updateCharacterCalories(currentCal, addedCalories, charId) {
    const newCalCount = parseInt(currentCal) + parseInt(addedCalories)
    const config = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        calories: newCalCount
      })
    }
    fetch(baseURL + charId, config)
      .then(resp => resp.json())
      .then(char => {
        detailedInfoContainer.innerHTML = ''
        loadCharacter(charId)
      })
  }

  function resetCounter(charId) {
    console.log(charId)
    const config = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        calories: '0'
      })
    }
    fetch(baseURL + charId, config)
      .then(resp => resp.json())
      .then(char => {
        detailedInfoContainer.innerHTML = ''
        loadCharacter(char.id)
      })
  }


  loadCharacters()
  clickHandler()
  submitHandler()
})




/*
1. √fetch all characters from api
  - √render characters in the div of character-bar
  - √put character name in a span tag

2. √create clickHandler
  - √when character name is clicked render all their info in the         #detailed-info tag

3. √when value is entered and add calories button is pressed patch the updated calorie count to the api
  -√pull from totla calories field set that to varaible 
  -√patch the new number + old from get request


*/