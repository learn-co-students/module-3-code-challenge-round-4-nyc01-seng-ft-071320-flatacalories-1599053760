
document.addEventListener('DOMContentLoaded', e=> {

    const baseURL = 'http://localhost:3000/characters/'
    
    const getCharacters = () => {
        
        fetch(baseURL)
        .then(resp => resp.json())
        .then(renderCharacters)
    }

    const renderCharacters = (characters) => {

        for (const character of characters){
            renderCharacter(character)
        }
    }
    
    const renderCharacter = (character) => {

        const {id, name, image, calories} = character
        let characterContainer = document.querySelector('#character-bar')
        let characterProfile = document.createElement('span')
        characterProfile.innerHTML = `${name}`
        characterProfile.dataset.id = id
        characterProfile.className = "characters"
        characterContainer.append(characterProfile)

    }

    const clickHandler = () => {

        document.addEventListener('click', e=>{
            
            if (e.target.matches('.characters')){
            
                let charID = parseInt(e.target.dataset.id,10)
                
                fetch(baseURL+ charID)
                .then(resp => resp.json())
                .then(char =>{
                    const {name, id, image, calories} = char
                    let charName = document.querySelector('#name')
                    charName.innerText = name
                    let charImg = document.querySelector('#image')
                    charImg.src = image
                    let charCals = document.querySelector('#calories')
                    charCals.innerText = calories
                    let charID = document.querySelector('#characterId')
                    charID.value = id
                    }
                )
            }
        })
    }

    const submitHandler = () => {
        
        document.addEventListener('submit', e=>{
            e.preventDefault()

            if (e.target.matches('#calories-form')){
                let form = e.target
                let charIDElement = document.querySelector('#characterId')
                let charID = charIDElement.value
                console.log(charID)
                let charCaloriesElement = charIDElement.nextElementSibling
                let charCalories = charCaloriesElement.value
                console.log(charCalories)
                let oldCharCals = document.querySelector('#calories').innerText
                newCharCals = parseInt(oldCharCals,10) + parseInt(charCalories,10)
                console.log(newCharCals)

                options = {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        calories: newCharCals
                    })
                }
            
                fetch(baseURL+charID, options)
                .then(resp => resp.json())
                .then(char =>{
                    let charCals = document.querySelector('#calories')
                    charCals.innerText = newCharCals
                    form.reset()
                })
            }
        })
    }



    getCharacters()
    clickHandler()
    submitHandler()

})