document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/characters/"
    const charDiv = document.getElementById('character-bar');
    // const fullChar = document.getElementById('detailed-info');
    const charP = document.getElementById('name');
    const charImg = document.getElementById('image');
    const charSpan = document.getElementById('calories')
    const form = document.getElementById('calories-form')

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
        console.log(form)
    }

    const submitYandler = () => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // let charId = e.target.children[0].value
            let newVal = e.target.children[1].value;
        })
    }


    getChars();
    clickYandler();
    submitYandler();
});

