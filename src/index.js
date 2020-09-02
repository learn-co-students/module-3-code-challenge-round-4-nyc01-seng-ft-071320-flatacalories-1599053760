document.addEventListener("DOMContentLoaded", e => {

    //global variables
    const baseUrl = "http://localhost:3000/characters/"
    const bar = document.querySelector("#character-bar")
    const name = document.querySelector("#name")
    const image = document.querySelector("#image")
    const infoPage = document.querySelector("#detailed-info")
    const charInfo = document.querySelector("#characterInfo")
    const caloriesSpan = document.querySelector("#calories")
    const form = document.querySelector("#calories-form")
    const formInput = document.querySelector("[type=text]")
    const resetBtn = document.querySelector("#reset-btn")
    //functions
    function clearPage() {
      infoPage.style.display="none"
    }

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
            infoPage.style.display="block"

            form.dataset.id = e.target.dataset.id
            name.textContent = e.target.dataset.name 
            image.src = e.target.dataset.image
            caloriesSpan.innerText = e.target.dataset.calories
        }
        else if(e.target === resetBtn){
            // debugger
        }
    })

    document.addEventListener("submit", e => {
        e.preventDefault()
        // addCal = formInput.value
        // debugger
        // if(typeof addCal == "number"){
        calNum = parseInt(caloriesSpan.innerText)
        addCalnum = parseInt(formInput.value)
        caloriesSpan.innerText = addCalnum + calNum
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
        // } 
        // else
        // (alert("Please enter a valid number of calories"))
        
    })

//invoke functions
clearPage()
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
3) √Click on "Add Calories", update front end and back end
    -√submit listener for form
    -√ persists to database without refresh


*/