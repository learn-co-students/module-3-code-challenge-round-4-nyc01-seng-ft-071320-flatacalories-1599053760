document.addEventListener("DOMContentLoaded", e => {
    const baseUrl = 'http://localhost:3000/characters/'
    const charBar = document.getElementById("character-bar")

    const fetchChars = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(renderChars)
    }

    const renderChars = charArray => {
        for (const char of charArray) {
            renderChar(char)
        }
    }

    const renderChar = ( {id, name, iamge, calories} ) => {
        const span = document.createElement('span')
        span.dataset.id = id 
        span.innerText = name 
        charBar.append(span)
    } 

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('div span')) {
                const charId = parseInt(e.target.dataset.id)
                const infoContainer = document.getElementById('detailed-info')
                fetch(baseUrl + charId)
                .then(res =>res.json())
                .then(charInfo => {
                    showInfo(charInfo)
                })
                const showInfo = ( {id, name, image, calories} ) => {
                    infoContainer.children[0].innerHTML = name 
                    infoContainer.children[1].src = image 
                    infoContainer.children[2].children[0].innerText = calories
                    infoContainer.children[3].dataset.charId = id
                }
            }   
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            if (e.target.matches('#calories-form')){
                const infoContainer = document.getElementById('detailed-info')
                const charId = parseInt(e.target.dataset.charId)
                const form = e.target
                const oldCals = parseInt(infoContainer.children[2].children[0].innerText)
                console.log(oldCals)
                
                form.children[0].value = charId
                const newCals = parseInt(form.children[1].value) + oldCals
                

                const options = {
                    method: 'PATCH',
                    headers: {
                        'content-type':'application/json',
                        'accept':'application/json'
                    },
                    body: JSON.stringify({
                        calories: newCals
                    })
                }

                fetch(baseUrl + charId, options)
                .then(res => res.json())
                .then(data => {
                    const infoContainer = document.getElementById('detailed-info')
                    infoContainer.children[2].children[0].innerText = ''
                    infoContainer.children[2].children[0].innerText = data.calories
                    form.reset()
                })

            }
        })
    }

    submitHandler()
    clickHandler()
    fetchChars()
})