document.addEventListener('DOMContentLoaded', () => {
    let charDiv = document.querySelector('#character-bar')
    // console.dir(charDiv)
    let charDetail = document.querySelector('#detailed-info')
    // console.log(charDetail)
    
    function fetchChars() {
        fetch('http://localhost:3000/characters/')
        .then(res => res.json())
        .then(chars => renderChars(chars));
    }
    fetchChars();

    function renderChar(char) {
        let charSpan = document.createElement('span')
        // charSpan.dataset.id = charId
        charSpan.innerHTML = char.name
        charDiv.append(charSpan)
    }

    function renderChars(charsData) {
        charsData.forEach(charData => {
            renderChar(charData)
        });
    }

    charDiv.addEventListener('click', function(e){
        if(e.target.nodeName === 'SPAN'){
            const charName = e.target
            // const allNames = charName.innerHTML
            console.log(charName)
        }
    })
});