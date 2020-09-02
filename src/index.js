/*
## Core Deliverables

As a user, I can:

1. See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.


2. Select a character from the character bar and see character's info inside `#detailed-info` div. 

3. Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.

## Advanced Deliverables

These deliverables are not required to pass the code challenge, but if you have the extra time, or even after the code challenge, they are a great way to stretch your skills. Consider refactoring your current code before moving on.

> Note: If you are going to attempt these advanced deliverables, please be sure to have a working commit with all the Core Deliverables first!

As a user, I can:
- Clicks on a `Reset Calories` button to set calories to `0`. Persist calories value to the server and update the DOM.
- Change character's name
- Add a new character
*/
document.addEventListener('DOMContentLoaded', ()=>{
const baseUrl = 'http://localhost:3000/characters'

const getCharacters = () =>{
  fetch(baseUrl)
  .then(response => response.json())
  .then(characters=> renderCharacters(characters));

}
const renderCharacters = characters =>{

    const divP = document.querySelector('#character-bar')
    divP.innerHTMl = characters.forEach(character=>renderCharacter(character, divP))
    //console.log(divP)


}
const renderCharacter = (character, divP) => {
    const charac = document.createElement('div')
    charac.textContent = `${character.name}`
    divP.append(charac)




}

const clicker = () => {
    document.addEventListener("click", e =>{
        if (e.target.innerHTML === 'Add Calories'){

            const charac = e.target.closest('divP')
            const attr = charac.children
            const itsName = attr[0].textContent
            const itsImage = attr[1].innerHTML.baseUrl
            const calorie = attr[2].textContent
             
            const form = document.querySelector('#detailed-info')
            form.itsName.value = name
            form.itsImage.value = image
            form.calorie = calorie
            
    



        }








    })
}
 



getCharacters()

})