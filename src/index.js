document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/characters/"
    const charDiv = document.getElementById('character-bar');
    // const fullChar = document.getElementById('detailed-info');
    const charP = document.getElementById('name');
    const charImg = document.getElementById('image');
    const charSpan = document.getElementById('calories');
    const form = document.getElementById('calories-form');
    const btn = document.getElementById('reset-btn')

    const getChars = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(characters => renderChars(characters))
    }

    const renderChars = (characters) => {
        for (const character of characters){
            renderChar(character)
        }
    }

    const renderChar = (character) => {
        let span = document.createElement('span')
        span.dataset.id = character.id
        span.innerText = `${character.name}`
        charDiv.append(span)
    }

    const clickYandler = () => {
        charDiv.addEventListener('click', (e) => {
            let charId = e.target.dataset.id
            getFullChar(charId);
        })
    }

    const getFullChar = (charId) => {
        fetch(baseUrl + charId)
        .then(resp => resp.json())
        .then(charData => renderFullChar(charData, charId))
    }

    const renderFullChar = (charData, charId) => {
        charP.innerText = charData.name
        charImg.src = charData.image
        charSpan.innerText = charData.calories
        let id = charId
        form.dataset.id = id
    }

    const submitYandler = () => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let charId = e.target.dataset.id
            let newVal = e.target.children[1].value;
            updateChar(charId, newVal);
        })
    }

    const updateChar = (charId, newVal) => {
        let config = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({
                calories: newVal
            })
          }
           fetch(baseUrl + charId, config)
           .then(resp => resp.json())
           .then(data => {
               charSpan.textContent = `${data.calories} calories`
           })
           form.reset();
    }


    const resetYandler = () => {
        btn.addEventListener("click", (e) => {
            let id = parseInt(e.target.parentElement.children[3].dataset.id)
            let calories = e.target.parentElement.children[2].children[0]
            // debugger;

            let config = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                calories: 0
            })
            }
            fetch(baseUrl + id, config)
            .then(resp => resp.json())
            .then(data => {
                calories.innerText = "0"
            })
        })
    }




    getChars();
    clickYandler();
    submitYandler();
    resetYandler();
});