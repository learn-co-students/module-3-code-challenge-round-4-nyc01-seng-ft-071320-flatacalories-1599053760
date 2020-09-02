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
  
    spanName.innerHTML = character.name

    characterBar.appendChild(spanName)
}

const clickMe = () => {
    const span = document.querySelector('span')
    console.log(span)
    span.addEventListener('click', (e) => {
        console.log(e.target)
    })
            // const characterInfo = document.querySelector('.characterInfo')
            // const detailedInfo = document.querySelector('#detailed-info')
            // const nameId = document.querySelector('#name')
            // const imgId = document.querySelector('#image')
            // const caloriesSpan = document.querySelector('#calories')

            // nameId.innerHTML = character.name
            // imgId.innerHTML = character.image
            // caloriesSpan.innerHTML = character.calories

            // characterInfo.appendChild(detailedInfo)
            // detailedInfo.appendChild(nameId)
            // detailedInfo.appendChild(imgId)
            // detailedInfo.appendChild(caloriesSpan)
  
   
       
}


getCharacters()
clickMe()



















// })