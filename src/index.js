document.addEventListener("DOMContentLoaded", function(e){
    const url = "http://localhost:3000/characters"
    const charBar = document.querySelector("#character-bar")
    const infoDeets = document.querySelector("#detailed-info")
    console.log(infoDeets)

    fetchAllChars = ()=>{
        fetch(url)
        .then(resp => resp.json())
        .then(charData => charData.forEach(
            char => renderChars(char)
        ))
    }
    fetchAllChars()

    renderChars = (char) =>{
        const charSpan = document.createElement("span")
        charSpan.id = char.id
        charSpan.textContent = char.name
        charBar.append(charSpan)
    }

    

})


/*
DONE √ 1. See all characters names in a `div` with the id of `"character-bar"`. 
On page load, **request** data from the server to get all of the characters 
objects. When you have this information, you'll need to add a `span` 
tag with the character's name to the character bar.

2. Select a character from the character bar and see character's info inside 
`#detailed-info` div. 

3. Clicks on "Add Calories" button to add calories to a Character. 
Persist calories value to the server and update the DOM.
*/