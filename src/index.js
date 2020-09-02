document.addEventListener("DOMContentLoaded", function(e) {
    const baseUrl = "http://localhost:3000/characters/"
    const characterDiv = document.querySelector('#character-bar')
    const charCal = document.querySelector('#calories')
    const detailedInfo = document.querySelector('#detailed-info')

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
    

    // add click listener to CharacterSpan
    // on click, grab the delatailed-info div
    // fetch request w/ id!
    // set detailed-info div.name = character.name & image = character.image
    // will need to set calories = charaters' calories but its in a separate h4

}
            const clickHandler = () => {
                document.addEventListener('click', function(e){
                    if (e.target.matches('.character-span')) {
                        const button = e.target
                        const id = button.dataset.id
    
                        fetch(baseUrl + id)
                        .then(resp => resp.json())
                        .then(character => renderOneCharacter(character))

                        const renderOneCharacter = (character) => {
                            console.log(character)
                            // console.log(detailedInfo.childNodes[3]['src'])
                            detailedInfo.childNodes[1]['textContent'] = character.name
                            detailedInfo.childNodes[3]['src'] = character.image
                            console.log(charCal.innerText)

                        }


                        

                    }
    
    
                })
            }
    
    
    
            clickHandler()



    

    fetchCharacters()


})