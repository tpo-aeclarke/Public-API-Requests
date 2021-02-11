
// Fetch that retrieves random data for population onto page
// Calls generateGallery to populate page
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then((response) => {
    return response.json()
  })
  .then(data => {
    generateGallery(data)
  })

/**
 * Generates and inserts gallery HTML based off of data fetch
 * @param {array of objects} data
 * Contains event listener for Modal Window creation
 */
function generateGallery (data) {
  data.results.forEach((user) => {
    const card = document.createElement('DIV')
    card.className = 'card'

    const cardHTML =
    `<div class="card-img-container">
          <img class="card-img" src="${user.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}</p>
      </div>`

    card.insertAdjacentHTML('beforeend', cardHTML)

    // Event listener for modal window creation
    card.addEventListener('click', () => createModal(user))

    document.querySelector('#gallery').insertAdjacentElement('beforeend', card)
  })
}

/**
 * Generates and inserts modal window HTML
 * @param {array of objects (passed from generateGallery)} person
 * Contains event listener for Modal Window closure
 */
function createModal (person) {
  const modal = document.createElement('DIV')
  modal.className = 'modal-container'

  // Combined street number and name
  const personStreetAddress = `${person.location.street.number} ${person.location.street.name}`

  // Formats date of birth (ISODOB) from ISO format to MM/DD/YY:
  const ISODOB = person.dob.date.substr(0, 10).replaceAll('-', '')
  const month = ISODOB.substr(4, 2)
  const day = ISODOB.substr(6, 2)
  const year = ISODOB.substr(2, 2)
  const DOB = `${month}/${day}/${year}`

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
        <p class="modal-text">Birthday: ${DOB}</p>
    </div>
</div>
</div>`

  modal.insertAdjacentHTML('beforeend', modalHTML)
  document.body.insertAdjacentElement('beforeend', modal)

  // Event listener for modal close button - removes modal element
  document.querySelector('#modal-close-btn').addEventListener('click', () => {
    modal.remove()
  })
}
