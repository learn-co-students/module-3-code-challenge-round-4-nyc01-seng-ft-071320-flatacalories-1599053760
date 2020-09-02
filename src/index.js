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
                    infoContainer.children[4].dataset.charId = id
                    infoContainer.children[5].dataset.charId = id
                }
            }
            else if (e.target.matches('#reset-btn')) {
                const button = e.target 
                const infoContainer = document.getElementById('detailed-info')
                const charId = parseInt(button.dataset.charId)
                
                options = {
                    method: 'PATCH',
                    headers: {
                        'content-type':'application/json',
                        'accept':'application/json'
                    },
                    body: JSON.stringify({
                        calories: 0
                    })
                }

                fetch(baseUrl + charId, options)
                .then(res => res.json())
                .then(data => {
                    const infoContainer = document.getElementById('detailed-info')
                    infoContainer.children[2].children[0].innerText = ''
                    infoContainer.children[2].children[0].innerText = data.calories
                })
            }
            else if (e.target.matches('#new-bttn')) {
                if (e.target.innerText === "New Character!") {
                    addNewForm()
                    e.target.innerText = "Hide"
                } else if (e.target.innerText === "Hide") {
                    const form = document.getElementById('new-form')
                    form.remove()
                    e.target.innerText = "New Character!"
                }
            }
            else if (e.target.matches('#edit-name-bttn')) {
                if (e.target.innerText === "Edit Name") {
                    addNameForm()
                    e.target.innerText = "Hide"
                } else if (e.target.innerText === "Hide") {
                    const nameForm = document.getElementById('edit-name-form')
                    nameForm.remove()
                    e.target.innerText = "Edit Name"
                }
            }
        })
    }

    const addNameForm = () => {
        const button = document.getElementById('edit-name-bttn') 


        button.insertAdjacentHTML('afterend', `
        <form id="edit-name-form">
            <input type="text" placeholder="Name" id="edit-name"/>
            <input type="submit" value="Submit Name Change"/>
        </form>
        `)
    }

    const addNewForm = () => {
        const button = document.getElementById('new-bttn')

        button.insertAdjacentHTML('afterend', `
        <form id="new-form">
            <input type="text" placeholder="Name" id="new-name"/>
            <input type="text" placeholder="Img Url" id="new-image"/>
            <input type="text" placeholder="Enter Calories" id="new-calories"/>
            <input type="submit" value="Add Character"/>
        </form>
        `)
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
            else if (e.target.matches('#new-form')) {
                const newForm = e.target 
                
                const name = newForm.children[0].value 
                const url = newForm.children[1].value 
                const cals = newForm.children[2].value 

                options = {
                    method: 'POST',
                    headers: {
                        'content-type':'application/json',
                        'accept':'application/json'
                    },
                    body: JSON.stringify({
                        name: name, 
                        image: url,
                        calories: cals
                    })
                }

                fetch(baseUrl, options)
                .then(res => res.json())
                .then(data => {
                    charBar.innerHTML = '<button id="new-bttn">New Character!</button>'
                    fetchChars()
                })
            }
            else if (e.target.matches('#edit-name-form')) {
                const form = e.target 
                const name = form.children[0].value
                const button = document.getElementById('edit-name-bttn')
                const charId = parseInt(button.dataset.charId)                 
                options = {
                    method: 'PATCH',
                    headers: {
                        'content-type':'application/json',
                        'accept':'application/json'
                    },
                    body: JSON.stringify({
                        name: name
                    })
                }

                fetch(baseUrl + charId, options)
                .then(res => res.json())
                .then(data => {
                    const infoContainer = document.getElementById('detailed-info')
                    infoContainer.children[0].innerHTML = ""
                    charBar.innerHTML = '<button id="new-bttn">New Character!</button>'
                    fetchChars()
                    infoContainer.children[0].innerHTML = data.name
                })
            }
        })
    }

    submitHandler()
    clickHandler()
    fetchChars()
})