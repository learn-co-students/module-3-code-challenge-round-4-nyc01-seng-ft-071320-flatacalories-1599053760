document.addEventListener("DOMContentLoaded", e => {

    //global variables
    const baseUrl = "http://localhost:3000/characters/"
    const bar = document.querySelector("#character-bar")
    const name = document.querySelector("#name")
    const image = document.querySelector("#image")
    const caloriesSpan = document.querySelector("#calories")

    //functions
    function getChar(){
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(characters => characters.forEach(character => renderCharacter(character)))
      }
    
    function renderCharacter(character) {
      let charSpan = document.createElement("span")
      charSpan.dataset.id = character.id
      charSpan.dataset.name = character.name
      charSpan.dataset.image = character.image
      charSpan.dataset.calories = character.calories
      charSpan.className = "icon"
      charSpan.innerText = `${character.name}`
      bar.append(charSpan)
    }
    
    //event listeners
    document.addEventListener("click", e => {
        if(e.target.className === ("icon")){
            name.innertext = e.target.dataset.name 
            image.src = e.target.dataset.image
            caloriesSpan.innerText = e.target.dataset.calories
        }

    })

    document.addEventListener("submit", e => {
        e.preventDefault()
        

    })

//invoke functions
getChar()
})


/*
CORE DELIVERABLES
1) User can see character names in div on #character-bar
    - fetch request for characters
    - create a span for each object and include title
    - add dataset and other info

2) When character is clicked, see info in #detailed-info div


3) Click on "Add Calories", update front end and back end
    -submit listener for form


*/