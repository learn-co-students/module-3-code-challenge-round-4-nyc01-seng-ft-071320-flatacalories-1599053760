document.addEventListener("DOMContentLoaded", function(e) {
    const baseUrl = "http://localhost:3000/characters/"
    const characterDiv = document.querySelector('#character-bar')
    const charCal = document.querySelector('#calories')
    const detailedInfo = document.querySelector('#detailed-info')
    const calForm = document.querySelector('#calories-form')

    function fetchCharacters() {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(characters => characters.forEach(character => renderCharacter(character)))
    }

    const renderCharacter = (character) => {
        // console.log(character)
        // create span
        // add inner HTML w/ interpolated character.name
        // append span to div
        const characterSpan = document.createElement('span')
        characterSpan.dataset.id = `${character.id}`
        characterSpan.className = 'character-span'
        characterSpan.innerText = `${character.name}`
        characterDiv.append(characterSpan)
    }

    // add click listener to CharacterSpan
    // on click, grab the delatailed-info div
    // fetch request w/ id!
    // set detailed-info div.name = character.name & image = character.image
    // will need to set calories = charaters' calories but its in a separate h4


    const clickHandler = () => {
        document.addEventListener('click', function(e){
            if (e.target.matches('.character-span')) {
                const button = e.target
                const id = button.dataset.id

                fetch(baseUrl + id)
                .then(resp => resp.json())
                .then(character => renderOneCharacter(character))

                const renderOneCharacter = (character) => {
                    // console.log(character)
                    // console.log(detailedInfo.childNodes[3]['src'])
                    detailedInfo.childNodes[1]['textContent'] = character.name
                    detailedInfo.childNodes[3]['src'] = character.image
                    charCal.innerText = character.calories
                    charCal.dataset.charId = character.id
                }
            }
        })
    }

    // add submit listener to whole form + e.preventDefault
    // find the current cal in the DOM
    // parseIn current cal
    // find input.value in form
    // add that number to the current cal
    // set the cal node's inner text to new current cal
    // fetch request (PATCH + options) (will need id)
    const submitHandler = () => {
        calForm.addEventListener('submit', function(e){
            e.preventDefault()
            const button = e.target
            const cal = charCal.innerText
            const currentCal = parseInt(cal, 10)
            // console.log(typeof currentCal)
            // console.dir(typeof button[1]["value"])
            const upCal = button[1]["value"]
            const addCals = parseInt(upCal, 10)
            const updatedCals = currentCal + addCals
            // console.log(updatedCals)
            charCal.innerText = updatedCals
            // console.log(charCal.innerText)

            const options = {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"}, 
                body: JSON.stringify({calories: updatedCals})
            }

            // const id = 
            console.dir(button.previousElementSibling.firstElementChild.dataset.charId)
            // fetch(baseUrl + id, options)
            // .then(resp => resp.json())
            // .then(console.log)


        })
    }
    
    




    submitHandler()
    clickHandler()
    fetchCharacters()

})