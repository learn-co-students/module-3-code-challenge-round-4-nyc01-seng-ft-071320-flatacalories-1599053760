// ######### DELIVERABLES ##############//

// 1 - See all characters names in a div with the id of "character-bar". On page load, request data from the server to get all of the characters objects. When you have this information, you'll need to add a span tag with the character's name to the character bar.

// 2 -Select a character from the character bar and see character's info inside #detailed-info div.

// 3 - Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.

document.addEventListener('DOMContentLoaded', function(e){
    //global variables ##################################
    const baseURL = 'http://localhost:3000'
    const characterBar = document.querySelector('#character-bar')
    const detailedInfo= document.querySelector('#detailed-info')

    function initialPull(){
    fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(data => parseNames(data))
    } //end of initialPull

    function parseNames(data){
        console.log('entered addNames')
        console.log(data)
        data.forEach(character => renderName(character))
    } // end of parseNames

    function renderName(character){
        console.log(character)
        console.log(characterBar)
        let nameSpan =document.createElement('span')
        nameSpan.innerText= `${character.name}`
        characterBar.append(nameSpan)
        console.log('end of renderName')
    }// end of renderName to characterBar 

    
    
    
    
    
 
    







    initialPull()
    
}) // end of DOM Loaded 