document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://localhost:3000/characters/'
  const ce = tag => document.createElement(tag)
  const qs = selector => document.querySelector(selector)
  const charBar = qs('#character-bar')
  const infoDiv = qs('#detailed-info')
  
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
    infoDiv.dataset.charId = char.id
    qs('#name').textContent = char.name
    qs('#image').src = char.image

  }




  getChars()
  clickHandler()
})
