document.addEventListener("DOMContentLoaded", function() {

    const baseUrl = "http://localhost:3000/characters/"

    const charForm = document.querySelector('#calories-form')
    const charCalories = document.querySelector('#calories')
    const resetBtn = document.querySelector('#reset-btn')
    const charInfo = document.querySelector('#detailed-info')

    const getCharacters = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(data => renderCharacters(data))
    }

    const renderCharacters = (characters) => {
        for (let char of characters) {
            createCharBar(char)
        }
    }

    function createCharBar(char) {
        const charBar = document.querySelector('#character-bar')

        charBar.insertAdjacentHTML('beforeend', `
        <span data-id="${char.id}">${char.name}</span>
        `)
    }

    function getInfo(char) {
        let charP = charInfo.firstElementChild
        let charImg = document.querySelector('#image')

        charP.innerText = char.name
        charImg.src = char.image
        charCalories.innerText = char.calories

        charForm.characterId.id = char.id
        charForm.lastElementChild.dataset.id = char.id
        resetBtn.dataset.id = char.id

        charInfo.insertAdjacentHTML('beforeend', `
        <button id="edit" data-id=${char.id}>Edit Name</button>`
        )

        editName(char)
    }

    function clickHandler() {
        document.addEventListener("click", (e) => {
            let click = e.target

            if (click.matches('span')) {
                let id = click.dataset.id

                fetch(baseUrl + id)
                .then(resp => resp.json())
                .then(data => getInfo(data))
            }

            if (click.matches('#reset-btn')) {
                let id = click.dataset.id
                
                fetch(baseUrl + id, { 
                    method: "PATCH",
                    headers: { 
                        "Content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        calories: 0
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    charCalories.innerText = 0
                })   
            }

            if (click.matches('#edit')) {
                
            }
        })
    }

    function submitHandler() {
        charForm.addEventListener("submit", (e) => {
            e.preventDefault()

            let click = e.target
            
            if (click.lastElementChild.value === "Add Calories") {
                let id = click.lastElementChild.dataset.id
                let formInput = charForm.calories.value 
                let oldNum = parseInt(charCalories.innerText)

                if (oldNum === 0) {
                    charCalories.innerText = formInput
                } else {
                    charCalories.innerText = parseInt(oldNum) + parseInt(formInput)
                }
                
                fetch(baseUrl + id, { 
                    method: "PATCH",
                    headers: { 
                        "Content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        calories: parseInt(oldNum) + parseInt(formInput)
                    })
                })            
            }

            charForm.reset()
        })
    }

    function editName(char) {
        charInfo.insertAdjacentHTML('beforeend', `
        <form id='edit' display='none'>
        <input type='text' placeholder=${char.name} id='new-name'>
        <input type='submit' data-id=${char.id}>
        </form>
        `)
                
    }

    getCharacters()
    clickHandler()
    submitHandler()
})


/*
1) render all characters name in a div with id of 'character-bar' via GET request
2) add span tag with characters name to the character bar
3) when selected characted from character bar, see info inside #detailed-info div
    - send another GET request with ID to get specific info
    - update form with character ID
4) make add calorie button to add caolries, patch request

5) click on "reset calories" to set calories to 0
    - persist to server and DOM
6) change character's name 
    - make edit button on detailed-info div
    - once edit is clicked, show input field + submit button 
    - grab new name and create submit handler
    - patch request to persist and update DOM

*/