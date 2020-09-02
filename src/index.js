//This is the code Challenge. Please don't fail me Steven!

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    get()
});

function get(){
    fetch('http://localhost:3000/characters')
    .then(res=>res.json())
    .then(string=>string.forEach(render))
}

function render(char){
    const bar = document.querySelector('#character-bar')
    const span = document.createElement('span')
    bar.append(span)
    span.innerText=char.name
    span.dataset.id=char.id
    span.addEventListener('click',(e)=>{//console.log("you in the span, man")
        const detail = document.querySelector('#detailed-info')
        detail.dataset.id=char.id
        const name = detail.firstElementChild
        name.innerText=char.name
        const image = detail.querySelector('img')
        image.src=char.image
        const span = detail.querySelector('span')
        span.innerText=char.calories
        const form = detail.querySelector('form')
        const idHolder = form.firstElementChild
        idHolder.value=char.id
        form.addEventListener('submit',(e)=>{
            console.log("ya be pushing the submit button, fool")
            e.preventDefault()
            console.log(form)
            const calories = parseInt(char.calores) + form.calories.value
            fetch(`http://localhost:3000/characters/${char.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "accept": "application/json"
                },
                    body: JSON.stringify({
                        calories:calories
                    })
                })//end of my fetch
        })

    })//This is the end of the Span Event Listerner
}//This is the end of my render