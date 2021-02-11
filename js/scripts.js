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

    card.addEventListener('click', () => {
      createModal(entry)
    })
    document.querySelector('#gallery').insertAdjacentElement('beforeend', card)
  })
}

function createModal (employeeData) {
  const modal = document.createElement('DIV')
  modal.className = 'modal-container'
  const modalHTML = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${employeeData.picture.medium}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employeeData.name.first} ${employeeData.name.last}</h3>
        <p class="modal-text">${employeeData.email}</p>
        <p class="modal-text cap">${employeeData.location.city}</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>
</div>`
modal.insertAdjacentHTML('beforeend', modalHTML)
document.body.insertAdjacentElement('beforeend', modal)
document.querySelector('#modal-close-btn').addEventListener('click', () => {
  modal.remove()    
})
}
