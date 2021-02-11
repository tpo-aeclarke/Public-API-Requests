'use strict'

function loadData () {
  return window
    .fetch('https://randomuser.me/api/?nat=us&results=12')
    .then((response) => {
      return response.json()
    })
    .then((data => {
      generateGallery(data)
    }))
}

// Generates Gallery HTML based off data fetch
function generateGallery (data) {
  data.results.forEach((entry) => {
    const card = document.createElement('DIV')
    card.className = 'card'
    const cardHTML =
     `<div class="card-img-container">
          <img class="card-img" src="${entry.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${entry.name.first} ${entry.name.last}</h3>
          <p class="card-text">${entry.email}</p>
          <p class="card-text cap">${entry.location.city}</p>
      </div>`
    card.insertAdjacentHTML('beforeend', cardHTML)

    card.addEventListener('click', () => createModal(entry))
    document.querySelector('#gallery').insertAdjacentElement('beforeend', card)
  })
}

function createModal (person) {
  const modal = document.createElement('DIV')
  modal.className = 'modal-container'
  const personStreetAddress = `${person.location.street.number} ${person.location.street.name}`
  const ISODOB = person.dob.date.substr(0, 10).replaceAll('-', '')
  const month = ISODOB.substr(4, 2)
  const day = ISODOB.substr(6, 2)
  const year = ISODOB.substr(2, 2)
  
  const modalHTML = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${person.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${person.email}</p>
        <p class="modal-text cap">${person.location.city}</p>
        <hr>
        <p class="modal-text">${person.cell.replace(/-/, ' ')}</p>
        <p class="modal-text">${personStreetAddress}, ${person.location.city}, ${person.location.state}  ${person.location.postcode}</p>
        <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
    </div>
</div>
</div>`
  modal.insertAdjacentHTML('beforeend', modalHTML)
  document.body.insertAdjacentElement('beforeend', modal)
  document.querySelector('#modal-close-btn').addEventListener('click', () => {
    modal.remove()
  })
}