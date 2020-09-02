document.addEventListener("DOMContentLoaded",function(event){
    const baseUrl = "http://localhost:3000/characters/"
    const characterBar = document.querySelector("#character-bar")
    // const detailedInfo = document.querySelector("#detailed-info")
    const imgDi = document.querySelector("#image")
    const nameDi = document.querySelector("#name")
    const caloriesDi = document.querySelector("#calories")
    const form = document.querySelector("#calories-form")
    

    function loadCharacters(){
            fetch(baseUrl)
            .then(response => response.json())
            .then(characterData => {iterateCharacters(characterData)})
    }

    function iterateCharacters(characterData) {
        for (let character of characterData){
            renderCharacter(character)
        }
    }

    function renderCharacter(character) {
        const newSpan = document.createElement("span")
        newSpan.innerHTML = `
        <h2 data-set=${character.id}>${character.name}</h2>
        `
        characterBar.append(newSpan)
        characterListener(character)
    }

    function characterListener(character){
        document.addEventListener("click", function(event){
            
            if (event.target.innerText == character.name){ 
                let charName = character.name
                let charImg = character.image 
                let charCalories = character.calories
                let charId = character.id
                let formId = form.children[0].value
                
                
                formId.innerHTML = `${charId}`
                imgDi.src.innerHTML = charImg //not rendering image
                nameDi.innerHTML = charName
                caloriesDi.innerHTML = charCalories
                
                debugger
            }
        })
    }
    
    
    function submitListener() {
        form.addEventListener("submit", function(event) {
            // debugger
            event.preventDefault();
            if (event.target) {
                let newCal = event.target.children[1].value
                let id = form.children[0].value //need an idea
                updateCalories(newCal,id)
            }

        })
    }
    
    function updateCalories(newCal,id) {
        options = {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
               calories: + newCal
            }) 
        }

            fetch(baseUrl + id,options).then(response => response.json).then(data => {
                console.log(data) // update calories TOTAL CAL not whole page
            })
        

    }







loadCharacters();
submitListener();
// characterListener();
})