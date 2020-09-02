document.addEventListener("DOMContentLoaded", function() {

    const baseUrl = "http://localhost:3000/characters/"

    const getCharacters = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(data => renderCharacters(data))
    }

    const renderCharacters = (characters) => {
        for (let char of characters) {
            createCharBar(char)
        }
    }

    function createCharBar(char) {
        const charBar = document.querySelector('#character-bar')

        charBar.insertAdjacentHTML('beforeend', `
        <span data-id="${char.id}">${char.name}</span>
        `)
        // calories:
        // id:
        // image: 
        // name:
    }

    function getInfo(char) {
        const charInfo = document.querySelector('#detailed-info')

        let charP = charInfo.firstElementChild
        let charImg = document.querySelector('#image')

        charP.innerText = char.name
        charImg.src = char.image
    }

    function clickHandler() {
        document.addEventListener("click", (e) => {
            let click = e.target

            if (click.matches('span')) {
                console.log(click)
                let id = click.dataset.id

                fetch(baseUrl + id)
                .then(resp => resp.json())
                .then(data => getInfo(data))
            }
        })
    }

    
    getCharacters()
    clickHandler()
})


/*
1) render all characters name in a div with id of 'character-bar' via GET request
2) add span tag with characters name to the character bar
3) when selected characted from character bar, see info inside #detailed-info div
4) make add calorie button to add caolries, patch request
*/