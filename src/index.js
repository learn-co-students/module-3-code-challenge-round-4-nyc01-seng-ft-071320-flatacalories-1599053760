//GET CHARACTERS USING FETCH
//RENDER CHARACTERS TO CHARACTER-BAR DIV 
//ADD EVENT TO CHARACTER NAME THAT DISPLAYS CHARACTER INFORMATION IN CHARACTER INFO DIV 


const baseURL = 'http://localhost:3000/characters/'




function getCharacters() {
    fetch(baseURL)
    .then(response => response.json())
    .then(characters => {
        console.log(characters)
        characters.forEach(function(character) {
            renderCharacters(character)
        })
        
    })
}

function renderCharacters(character) {
    const characterBar = document.querySelector('#character-bar')
    const spanName = document.createElement('span')
    const characterInfo = document.querySelector('.characterInfo')
    const detailedInfo = document.querySelector('#detailed-info')

  

    spanName.innerHTML = character.name

    characterBar.appendChild(spanName)

    characterInfo.appendChild(detailedInfo)


}




getCharacters()



















// })