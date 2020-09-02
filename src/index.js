const baseUrl = 'http://localhost:3000/characters/'
charBar = document.getElementById('character-bar')
charInfo = document.querySelector('.characterInfo')
charDetails = document.getElementById('detailed-info')
caloriesForm = document.getElementById('calories-form')

function getCharacters() {
   fetch(baseUrl)
      .then(response => response.json())
      .then(characters => renderCharacters(characters))
}

// render characters individually then push to the DOM
function renderCharacter(characterObj) {
   const charDiv = document.createElement('div')
   charDiv.dataset.id = characterObj.id

   charDiv.innerHTML = `
   <span>${characterObj.name}</span>
   `
   charBar.append(charDiv)
}

// pull array of all characters
function renderCharacters(characters) {
   characters.forEach(character =>{
      renderCharacter(character)
   })
}

// render to seperate part of the page
function renderCharacterFull(character) {
   const charId = character.id
   const name = character.name
   const image = character.image
   const calories = character.calories

   charDetails.innerHTML = `
      <p id="name">${character.name}</p>
      <img id="image" src="${character.image}">
      <h4>
      Total Calories: <span id="calories">${character.calories}</span>
      </h4>
      <form id="calories-form">
         <input type="hidden" value="${charId}" id="characterId"> <!-- Assign character id as a value here -->
         <input type="text" placeholder="Enter Calories" id="calories">
         <input type="submit" value="Add Calories">
      </form>
      <button id="reset-btn">Reset Calories</button>
   `
   charInfo.append(charDetails)
}

// handles all the clicks
function clickHandler() {
   charBar.addEventListener('click', e => {
      const character = e.target.closest('div')
      if (character) {
         const id = character.dataset.id
         const characterUrl = `${baseUrl}${id}`
         
         fetch(characterUrl)
            .then(response => response.json())
            .then(data => renderCharacterFull(data))

         // const options = {
         //    method: "POST",
         //    headers: {
         //       "content-type": "application/json",
         //       "accept": "application/json"
         //    },
         //    body: JSON.stringify({name: name, image: image, calories: calories})
         // }

         // fetch(baseUrl + id, options)
         //    .then(response => response.json())
         //    .then(console.log)
      }

   })

   // charDetails.addEventListener('click', e => {
   //    if (e.target.textContent === 'Reset Calories') {
   //       const button = e.target.previousElementSibling.previousElementSibling
   //       const span = button.childNodes[1]
   //       let calories = parseInt(span.textContent)
   //       // const reset = 0
   //       let updatedCalories = 0
   //       calories.textContent = updatedCalories
   //       const id = span.parentNode.nextElementSibling.childNodes[1].value

   //       console.log(calories)

   //       fetch(baseUrl + id, {
   //       method: 'PATCH',
   //          headers: {
   //             "content-type": "application/json",
   //             "accept": "application/json"
   //          },
   //          body: JSON.stringify({calories: calories.textContent})
   //       }).then(response => response.json())
   //          .then(data => renderCharacterFull(data))
   //    }
   // })
}

function submitHandler() {
   document.addEventListener('submit', e => {
      e.preventDefault()
      const form = e.target
      const h4Tag = form.previousElementSibling
      const calories = h4Tag.childNodes[1]
      let currentCalories = parseInt(calories.textContent)
      const formcalories = parseInt(form.calories.value)
      let updatedCalories = currentCalories + formcalories
      calories.textContent = updatedCalories
      console.log(calories)
      const id = form.childNodes[1].value
      console.log(id)
      
      if (calories === "") {

      } else {
         fetch(baseUrl + id, {
            method: 'PATCH',
            headers: {
               "content-type": "application/json",
               "accept": "application/json"
            },
            body: JSON.stringify({calories: calories.textContent})
         }).then(response => response.json())
            .then(data => renderCharacterFull(data))
      }

   })
}




getCharacters()
clickHandler()
submitHandler()


/*
As a user, I can:

1. √ See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.

2. √ Select a character from the character bar and see character's info inside `#detailed-info` div. 

3. √ Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.

## Advanced Deliverables

These deliverables are not required to pass the code challenge, but if you have the extra time, or even after the code challenge, they are a great way to stretch your skills. Consider refactoring your current code before moving on.

> Note: If you are going to attempt these advanced deliverables, please be sure to have a working commit with all the Core Deliverables first!

As a user, I can:
- Clicks on a `Reset Calories` button to set calories to `0`. Persist calories value to the server and update the DOM.
- Change character's name
- Add a new character
 */











