const baseUrl = "http://localhost:3000/characters/"
const characterBar = document.querySelector("#character-bar")
const formId = document.querySelector("#calories-form")

//fetch
const fetchCharacters = () => {
    fetch(baseUrl)
        .then(resp => resp.json())
        .then(characters => characters.forEach(character => renderCharacter(character)))
}

const fetchSingleCharacter = id => {
    fetch(baseUrl + id)
        .then(resp => resp.json())
        .then(character => putCharacterOnInfo(character))
}


//put character on bar
const renderCharacter = character => {
    const characterDiv = document.createElement("div")
    characterDiv.id = "character-bar"
    characterDiv.innerHTML = `
        <span id=${character.id}>${character.name}</span>
    `
    characterBar.append(characterDiv)
}

//click handling
const clickHandler = () => {
    document.addEventListener("click", e => {
        if(e.target.tagName==="SPAN"){
            id = e.target.id
            fetchSingleCharacter(id)
        }
    })
}

//put character on info
const putCharacterOnInfo = character => {
    
    const detailedInfo = document.querySelector("#detailed-info")

    //name
    const name = document.querySelector("#name")
    name.textContent = character.name
    // //image
    const image = document.querySelector("#image")
    image.src = character.image
    
    // //calories
    const calories = document.querySelector("#calories")
    calories.textContent = character.calories
}

//submit handling
const submitHandler = () => {
    document.addEventListener("submit", e => {
        e.preventDefault()
        console.log(e.target)
    })
}



fetchCharacters()
clickHandler()
submitHandler()