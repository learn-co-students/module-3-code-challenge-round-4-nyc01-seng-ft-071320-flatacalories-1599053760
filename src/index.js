document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/characters"
  const divBar = document.querySelector('#character-bar')

  const clickHandler = () => {
    document.addEventListener('click', e => )
  }






  // rendering
  const renderCharacters = (characters) => {
    characters.forEach(character => renderCharacter(character))
  }

  const renderCharacter = character => {

    const span = document.createElement('span')

    span.innerText = character.name
    divBar.append(span)


    span.dataset.characterId = character.id

  }



  //init fetch
  const getCharacters = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(characters => renderCharacters(characters))
  }




  clickHandler()
  getCharacters()
})


/*
 - See all characters names in a div with the id of "character-bar".√
On page load, request data from the server to get all of the characters objects.√
 When you have this information, you'll need to add a span tag with the character's name to the character bar.√


 - Select a character from the character bar and see character's info inside #detailed-info div.
*/
