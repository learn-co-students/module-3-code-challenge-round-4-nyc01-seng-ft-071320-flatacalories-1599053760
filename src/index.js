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
        // newSpan.dataset.id = character.id

        newSpan.innerHTML = `
        <h2 data-set=${character.id}>${character.name}</h2>
        `
        characterBar.append(newSpan)
        characterListener(character)
    }

    function characterListener(character){
        document.addEventListener("click", function(event){
            
            debugger
        if (event.target.innerText == character.name){ 
            let charName = character.name
            let charImg = character.image
            let charCalories = character.calories
            let charId = character.id

            const li = document.createElement("li")
            li.innerHTML = `
               <h2>${charId}<h2>
            `

            form.append(li)
            imgDi.src.innerHTML = charImg
            nameDi.innerHTML = charName
            caloriesDi.innerHTML = charCalories
            
            }
        })
    }
    
    
    function submitListener() {
        form.addEventListener("submit", function(event) {
            // debugger
            event.preventDefault();
            if (event.target) {
                let newCal = event.target.children[1].value
                let id = //
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
                console.log(data)
            })
        

    }







loadCharacters();
submitListener();
// characterListener();
})