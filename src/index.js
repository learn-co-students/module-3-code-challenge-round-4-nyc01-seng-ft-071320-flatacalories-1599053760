document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://localhost:3000/characters/'
  const ce = tag => document.createElement(tag)
  const qs = selector => document.querySelector(selector)
  const charBar = qs('#character-bar')
  const infoDiv = qs('#detailed-info')
  const calorieForm = qs('#calories-form')
  
  const getChars = () => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(renderChars)
  }

  const renderChars = chars => {
    chars.forEach(renderChar)
  }

  const renderChar = char => {
    const charSpan = ce('span')
    charBar.append(charSpan)
    charSpan.textContent = char.name
    charSpan.className = 'character'
    charSpan.dataset.id = char.id
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      switch (true) {
        case e.target.matches('.character'):
          getChar(e.target)
          break
        default:
          break
      }
    })
  }

  const getChar = target => {
    fetch(`${BASE_URL}${target.dataset.id}`)
    .then(res => res.json())
    .then(showChar)
  }

  const showChar = char => {
    // infoDiv.dataset.charId = char.id
    qs('#characterId').value = char.id
    qs('#name').textContent = char.name
    qs('#image').src = char.image
    qs('#calories').textContent = char.calories
  }

  const submitHandler = () => {
    document.addEventListener('submit', e => {
      e.preventDefault()
      switch (true) {
        case e.target === calorieForm:
          addCalorie(e.target)
          break
        default:
          break
      }
    })
  }

  const addCalorie = target => {
    const currentCalorie = parseInt(qs('#calories').textContent)
    const addCalorie = parseInt(target[1].value)
    const charId = target[0].value
    debugger
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify({
        calories: currentCalorie + addCalorie
      })
    }

    fetch(`${BASE_URL}${charId}`, options)
    .then(res => res.json())
    .then(char => {
      qs('#calories').textContent = char.calories
    })
  }



  getChars()
  clickHandler()
  submitHandler()
})
