document.addEventListener("DOMContentLoaded", e => {

    //global variables
    const baseUrl = "http://localhost:3000/characters/"
    const bar = document.querySelector("#character-bar")
    const name = document.querySelector("#name")
    const image = document.querySelector("#image")
    const infoPage = document.querySelector("#detailed-info")
    const caloriesSpan = document.querySelector("#calories")
    const form = document.querySelector("#calories-form")
    const formInput = document.querySelector("[type=text]")
    
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
            form.dataset.id = e.target.dataset.id
            name.textContent = e.target.dataset.name 
            image.src = e.target.dataset.image
            caloriesSpan.innerText = e.target.dataset.calories
        }
    })

    document.addEventListener("submit", e => {
        e.preventDefault()
        calNum = parseInt(caloriesSpan.innerText)
        addCal = parseInt(formInput.value)
        caloriesSpan.innerText = addCal + calNum
        // debugger
        charId = form.dataset.id

        const configObj = {
           method: "PATCH",
           headers: {
             "content-type": "application/json",
             "accept": "application/json"
           },
           body: JSON.stringify({calories: caloriesSpan.innerText})
           } 
            fetch(baseUrl + charId, configObj)
            .then(response => response.json())
            .then(character => {
                form.reset()
                bar.innerHTML = ""
                getChar()
            })
        

    })

//invoke functions
getChar()
})


/*
CORE DELIVERABLES
1) √User can see character names in div on #character-bar
    - √fetch request for characters
    - √create a span for each object and include title
    - √add datasets

2) √When character is clicked, see info in #detailed-info div
    - √click listener
3) Click on "Add Calories", update front end and back end
    -√submit listener for form
    -√ persists to database without refresh


*/