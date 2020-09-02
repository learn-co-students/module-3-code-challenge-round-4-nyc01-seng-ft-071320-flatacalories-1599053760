//This is the code Challenge. Please don't fail me Steven!

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    get()
    reset()
    formName()
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
        name.className="cuties" // this is for the name changers
        const image = detail.querySelector('img')
        image.src=char.image
        const span = detail.querySelector('span')
        span.innerText=char.calories
        //button reeset stuff
        const reset = detail.querySelector('#reset-btn')
        reset.dataset.id=char.id
        //form stuff below
        const form = detail.querySelector('form')
        const idHolder = form.firstElementChild
        idHolder.value=char.id
        form.addEventListener('submit',(e)=>{ //console.log("ya be pushing the submit button, fool") //console.log(form)
            e.preventDefault()
            const adder = parseInt(form.calories.value)
            const calories = parseInt(form.previousElementSibling.firstElementChild.innerText)
            const newCalories=calories+adder
            fetch(`http://localhost:3000/characters/${idHolder.value}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "accept": "application/json"
                },
                    body: JSON.stringify({
                        calories:newCalories
                    })
                }).then(res=>res.json()).then(object=>{//console.log(object.calories)
                    form.previousElementSibling.firstElementChild.innerText=object.calories
                }) 
                //end of my fetch //.then starts a new conversation about the object
            form.reset()
        })

    })//This is the end of the Span Event Listerner
}//This is the end of my render

function reset(){
    btn= document.querySelector('#reset-btn')
    btn.addEventListener('click', (e)=>{//console.log("reset ")
    const id=btn.dataset.id
    console.log(id)
    fetch(`http://localhost:3000/characters/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "accept": "application/json"
        },
            body: JSON.stringify({
                calories:0
            })
        }).then(res=>res.json()).then(object=>{//console.log(cal.innerText)//console.log(object.calories)
            const cal = document.querySelector('#calories')
            cal.innerText=object.calories
        }) 
    })
}//this is the end of my reset

function formName(){
    document.addEventListener('click',(e)=>{
        if (e.target.matches('.cuties')){console.log("you have hit me in the edit")
            const parent = e.target
            
            const nameForm = document.createElement('form')
            nameForm.className=('edit-name')
            nameForm.innerHTML=`<input type="text" placeholder="Enter New Name" id="name"/>
            <input type="submit" value="Edit Name"/>`
            parent.append(nameForm)
            // nameForm.addEventListener('click',(e)=>{
            //     e.preventDefault()
            //     nameForm
            // })//This is the end of 
        }//end of name changer
    })//end of delegator
}//end for formName