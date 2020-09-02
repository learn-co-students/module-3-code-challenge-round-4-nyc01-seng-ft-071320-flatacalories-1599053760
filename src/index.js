document.addEventListener('DOMContentLoaded', (event) => {

const charUrl = "http://localhost:3000/characters/"
const charImage = document.querySelector("#image")
const charName = document.querySelector("#name")
const allCharNames = document.querySelector("#character-bar")
const calorieForm = document.querySelector("#calories-form")
const resetCalorieBtn = document.querySelector("#reset-btn")
const charCalories = document.querySelector("#calories")
console.log(charCalories)




// need <span> tag for each character


    function getCharacters(url){
        fetch(url).then(response => response.json()).then(charsInfo => renderCharacters(charsInfo))
    }
    getCharacters(charUrl)


    function renderCharacters(characters){
       for(let i = 0; i < characters.length; i++){
          let charSpan = document.createElement('span')
          charSpan.innerText = characters[i].name
          allCharNames.appendChild(charSpan)
          charSpan.className = `${characters[i].name}`
          renderCharacter(characters[i])


        }
              allCharNames.addEventListener('click', function(event){
                  event.preventDefault()
                //   console.log(event.target.className)
                if(event.target.className == characters[1].name){
                    renderCharacter(characters[1])
                }
                else if

              })
    }

    function renderCharacter(character){
        charImage.src = character.image
        charName.innerText = character.name
        charCalories.innerText = character.calories
    }



    // be able to click a character (event listsener), bring to corresponding info.. renderCharacter


})