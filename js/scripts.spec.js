/* eslint-env mocha */

'use strict'

/**
 * MEETS EXPECTATIONS REQUIREMENTS:
 * 12 random users are pulled from the API in a single request
 * 
 * New random employee information displays each time the page refreshes
 * 
 * The directory displays 12 users from the Random User API, and includes the following for each user:
 *    Employee Image
 *    First and Last Name
 *    Email
 *    City or location
 * 
 * Modal window displays at least the following details:
 *    Employee image
 *    Name
 *    Email
 *    City or location
 *    Cell Number
 *    Detailed Address, including street name and number, state or country, and post code.
 *    Birthday
 *    There is a way to close the modal window
 * 
 * The major elements of the directory and modal window are in place and roughly match the mockups.
 * Note: Modal window address can have the state's full name, rather than the two letter state code
 */


const expect = window.chai.expect

// describe('meets expectations', () => {​​
//   // before <- this code runs before the tests
//   // after <- this code runs after the tests
//   // describe <- the thing we are testing
//   // context <- under specific circumstances
//   // it <- an actual test   
// }​​);

describe('meets expectations', () => {
  describe('user gallery', () => {
    it('must have 12 entries', () => {
      const expected = 12
      const actual = document.querySelector('#gallery').children.length

      expect(actual).to.equal(expected)
    })
  })
  describe('each entry', () => {
    it('must be a DIV element', () => {
      const expected = 'DIV'
      document.querySelector('#gallery').children.forEach((child) => {
        const actual = child.tagName
        expect(actual).to.equal(expected)
      })
    })
    it('must have the correct CSS class name', () => {
      const expected = 'card'

      document.querySelector('#gallery').children.forEach((child) => {
        const actual = child.className
        expect(actual).to.equal(expected)
      })
    })
  })
  describe('the card contents', () => {
    it('must have the expected children', () => {
      const expected = [
        'DIV.card-img-container',
        'DIV.card-info-container'
      ]
      const firstCard = document.querySelector('#gallery').children[0]
      const actual = Array.from(firstCard.children).map((child) => {
        return `${child.tagName}.${child.className}`
      })
      expect(actual).to.deep.equal(expected)
    })
  })
})

