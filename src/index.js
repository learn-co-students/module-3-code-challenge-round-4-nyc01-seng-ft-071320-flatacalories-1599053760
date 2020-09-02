document.addEventListener("DOMContentLoaded", function() {

    const baseUrl = "http://localhost:3000/characters/"
    const charForm = document.querySelector('#calories-form')
    const charCalories = document.querySelector('#calories')

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
        // calories:
        // id:
        // image: 
        // name:
    }

    function getInfo(char) {
        const charInfo = document.querySelector('#detailed-info')

        let charP = charInfo.firstElementChild
        let charImg = document.querySelector('#image')

        charP.innerText = char.name
        charImg.src = char.image
        charCalories.innerText = char.calories

        charForm.lastElementChild.dataset.id = char.id
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
                .then(resp => resp.json())
                .then(data => {

                })                
            }

            charForm.reset()
        })
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
*/