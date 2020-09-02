# Flatacalories
Today you'll be building an app for counting calories!! You will be using a local API and building out the frontend for our app, Flatacalories.

## Demo
Use this gif as an example of how the app should work.

![Demo](assets/demo.gif)

## Setup

- Fork and clone this repository
- Run `json-server --watch db.json` to get the backend started
- Open the `index.html` file on your browser

## Endpoints

Your base URL for your API will be: http://localhost:3000

The endpoints you will need are:

- GET `/characters`
- GET `/characters/:id`
- PATCH `/characters/:id`

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

## Rubric

You can find the rubric for this assessment [here](https://github.com/learn-co-curriculum/se-rubrics/blob/master/module-3.md).






```
/*
See all character names in a div#character-bar

- make function called getAllCharacters
    - makes fetch request using url
    - in 2nd then, take array characters and pass it to renderCharacters() as its argument

- make function called renderCharacters that takes an array as its argument
    - select div#character bar
    - set the innerHTML of div#character-bar to an empty string
    - forEach character of characters array, call renderChar(character) 

- make function called renderCharacter that takes an individual character object
    - select div#character-bar
    - create span element
    - add a dataset for character id
    - set innerText of span to character.name
    - append the span to div

see detailed info about a character


- make a function called renderInfo that takes a character object as its argument
    - select the div#detailed-info
    - set div innerHTML to the below and replace appropriate with interpolated character object property
        <p id="name">Character's Name</p>
        <img id="image" src="assets/dummy.gif"><!-- display character image here -->
        <h4>Total Calories: <span id="calories">Character's Calories</span> </h4>
        <form id="calories-form">
            <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
            <input type="text" placeholder="Enter Calories" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>
        <button id="reset-btn">Reset Calories</button>

- make a function called getOneCharacter that takes character id as its argument
    - make fetch request
        - interpolate url and id
        - in 2nd .then
            - call renderInfo and pass the character response object as its argument
    
add calories to character's calorie property and also be able to reset a character's calories property to 0

- make function called changeCalories that takes character id and calories as its argument
    - declare configObj
        - PATCH method
        - headers of content-type and accept
        - body with JSON.stringify({})
            - inside braces put id and calories and set values to the passed arguments
    - make fetch statement to patch the character object on the server and update its calories property
        - interpolate id with url
        - pass configObj as second argument
    - in 2nd .then
        - take character response object and pass it to renderInfo to rerender the detailed-info area


- make function called submitHandler
    - addEventListener for "submit" event
        - select form#calories-form
        - if e.target === form.children[2]
            e.preventDefault()
            const id = parseInt(form.children[0].id, 10)
            const calories = parseInt(form.children[1].value, 10)
            - call changeCalories and pass in id and calories as arguments


- make function called clickHandler for "click" event
    - if e.target closest is a span element
        - declare const id and set it equal to e.target.dataset.id
        - call getOneCharacter and pass id argument
    - else if e.target matches #reset-btn
        - declare const calories equal to 0
        - select form (only one form element)
        - declare const id equal to form children[0] value
        - call changeCalories and pass in id and calories as arguments


*/
```