'use strict'

function loadData () {
  return window
  .fetch('https://randomuser.me/api/?nat=us&results=12')
    .then((response) => {
      return response.json()
    })
    .then((data => {
      data.results.forEach((entry) => {
        const card = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${entry.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${entry.name.first} ${entry.name.last}</h3>
            <p class="card-text">${entry.email}</p>
            <p class="card-text cap">city, state</p>
        </div>
    </div>`
        document.querySelector('#gallery').insertAdjacentHTML('beforeend', card)
      })
    }))
}