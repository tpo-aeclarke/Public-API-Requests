'use strict'

function loadData () {
  return window
  .fetch('https://randomuser.me/api/?nat=us&results=12')
    .then((response) => {
      return response.json()
    })
    .then((data => {
        generateGallery(data)
      //   const modal = `<div class="modal-container">
      //   <div class="modal">
      //       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      //       <div class="modal-info-container">
      //           <img class="modal-img" src="${entry.picture.medium}" alt="profile picture">
      //           <h3 id="name" class="modal-name cap">name</h3>
      //           <p class="modal-text">email</p>
      //           <p class="modal-text cap">city</p>
      //           <hr>
      //           <p class="modal-text">(555) 555-5555</p>
      //           <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
      //           <p class="modal-text">Birthday: 10/21/2015</p>
      //       </div>
      //   </div>
      //   </div>`
      //   document.querySelector('#gallery').insertAdjacentHTML('afterend', modal)
      // })
    }))
}

// Generates Gallery HTML based off data fetch
function generateGallery(data) {
  data.results.forEach((entry) => {
    const card = `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${entry.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${entry.name.first} ${entry.name.last}</h3>
        <p class="card-text">${entry.email}</p>
        <p class="card-text cap">${entry.location.city}</p>
    </div>
</div>`
    document.querySelector('#gallery').insertAdjacentHTML('beforeend', card)
})
}

// function modalWindow(data) {
//   data.results.
// }


// if a user clicks on a gallery card (event listener), it will open a modal window
// the modal window will display the information of the employee
