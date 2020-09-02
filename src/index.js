document.addEventListener('DOMContentLoaded', () => {
    let charDiv = document.querySelector('#character-bar')
    
    function fetchChars() {
        fetch('http://localhost:3000/characters/')
        .then(res => res.json())
        .then(chars => renderChars(chars));
    }
    fetchChars();


});