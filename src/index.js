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
        data.forEach(character => makeCharacters(character))
    } // end of parseNames

    function renderName(character){
        // take character info and add names to bar, add IDs to be clicked on later 
        // console.log(character)
        // console.log(characterBar)
        let nameSpan =document.createElement('span')
        nameSpan.setAttribute('dataset', `${character.id}`)
        nameSpan.classList.add('image')
        nameSpan.image = character.image
        nameSpan.classList.add('calories')
        nameSpan.calories=character.calories
        nameSpan.setAttribute('name', character.name)
        nameSpan.id= character.id
        nameSpan.innerText= `${character.name}`
        characterBar.append(nameSpan)
        // console.log(nameSpan)
        console.log('end of renderName')
    }// end of renderName to characterBar 

    function makeCharacters(data){
        //create div of character card, same as detailed-info 
        // don't append it to anything 
        // on name click, edit detailedInfo to be the charcter div 
        console.log('entered makeCharacters')
        // console.log(data)
        // create new div that I will swap out on click event 
        let characterCard =document.createElement('div')
        characterCard.dataset.id= data.id
        // set the p tag for div
        let characterP = document.createElement('p')
        characterP.id=`${data.name}`
        characterP.innerText=`${data.name}`
        // set image tag for div
        let characterPic= document.createElement('img')
        characterPic.setAttribute('id', 'image')
        characterPic.setAttribute('src', `${data.image}`)
        // set the h4 tag with calory info by character
        let characterCal= document.createElement('h4')
        characterCal.innerHTML= `Total Calories: <span id="calories"> ${data.calories}</span>`
        // add them all to characterCard
        characterCard.append(characterP)
        characterCard.append(characterPic)
        characterCard.append(characterCal)
        // not appending characterCard, but will swap it for characterInfo on button click
        // console.log(characterCard)
        
    } // end of makeCharacters 

    document.addEventListener('click', function(e){
        console.log('click heard')
        let bttn = e.target
        console.log(bttn)
        if(bttn.parentNode === characterBar){
            console.log('name clicked')
            console.log(bttn.id)
            console.log(bttn.image)
            console.log(bttn.calories)
            console.log(detailedInfo.children) 
         let name = document.querySelector('#name')
         name.innerText =    bttn.innerText

         let pic = document.querySelector('#image')
         pic.src =    bttn.image

         let cal = document.querySelector('#calories')
        cal.innerText = bttn.calories
        let charId= document.querySelector('#characterId')
        charId.value = bttn.id
        }
        else if (bttn.type === 'submit'){
            addCalories()
        }
    }) // end of click listener (for character selection)

    
    function addCalories(){
         //add submit listener 
        // prevent default 
        // grab the id from the current character to use as patch id 
        // grab the value from the input field for the configObj 
        // send the patch fetch request 
        //re-run the initialPull 
        console.log('entered addCalories')
        let form = document.querySelector('#calories-form')
        id = document.querySelector('#characterId')
        console.log(form.children[3][0].value)


        // let data = {}

        // let configObj={
        //     method: 'POST', 
        //     headers: { 
        //         'content-type':'application/json', 
        //         'accept':'application/json'
        //     }
        //     body: JSON.stringify(data)
        // }

        // fetch(url +id, congifObj)
        // .then
        // .then

        // initialPull()
    } // end of add calories
    







    initialPull()
    
}) // end of DOM Loaded 