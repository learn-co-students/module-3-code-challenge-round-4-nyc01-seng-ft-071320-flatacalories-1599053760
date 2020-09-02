
document.addEventListener('DOMContentLoaded', e=> {

    const baseURL = 'http://localhost:3000/characters/'
    
    const getCharacters = () => {
        
        fetch(baseURL)
        .then(resp => resp.json())
        .then(renderCharacters)
    }

    const renderCharacters = (characters) => {
        let characterContainer = document.querySelector('#character-bar')
        characterContainer.innerHTML = ''
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

                    let editButton = document.createElement('button')
                    editButton.innerText = 'Edit Name'
                    editButton.dataset.id = id
                    editButton.id = "edit-button"
                    charName.append(editButton)
                    
                    
                    }
                )
            }
            else if(e.target.matches('#reset-btn')){
                let charID = parseInt((e.target.previousElementSibling.firstElementChild.value),10)
                let resetCals = 0

                const options = {
                    method: "PATCH",
                    headers:{
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        calories: resetCals
                    })
                }

                fetch(baseURL+charID, options)
                .then(resp => resp.json())
                .then(char =>{
                    let charCals = document.querySelector('#calories')
                    charCals.innerText = resetCals
                })
            }
        else if(e.target.matches('#edit-button')){
            let editTag = document.querySelector('#name').firstElementChild
            console.log(editTag)
            if (e.target.innerText === 'Edit Name'){
                editTag.insertAdjacentHTML('afterend', `
                <form id="name-form">
                    <input type="text" placeholder="New Name" id="new-name"/>
                    <input type="submit" value="Change Name"/>
                </form>
                `)
                e.target.innerText = 'Close'    
            }
            else if(e.target.innerText === 'Close'){
                document.querySelector('#name-form').innerText = ''
                e.target.innerText = 'Edit Name'
            }
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

                const options = {
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
            else if (e.target.matches('#name-form')){
                let form = e.target
                let newName = form.firstElementChild.value
                let charID = e.target.previousElementSibling.dataset.id
                console.log(charID, newName)

                const options = {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newName
                    })
                }

                fetch(baseURL+charID, options)
                .then(resp => resp.json())
                .then(char =>{
                    let charName = document.querySelector('#name')
                    charName.innerText = newName
                    form.reset()
                    getCharacters()
                })





            }
        })
    }



    getCharacters()
    clickHandler()
    submitHandler()

})