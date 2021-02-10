/* eslint-env mocha */
/* global loadData */

'use strict'

/**
 * MEETS EXPECTATIONS REQUIREMENTS:
 * 12 random users are pulled from the API in a single request
 * 
 * New random employee information displays each time the page refreshes
 * 
 * The directory displays 12 users from the Random User API, and includes the following for each user:
 *    Employee Image x
 *    First and Last Name x
 *    Email x
 *    City or location x
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

before(() => {
  return loadData()
})

describe('meets expectations', () => {
  // before <- this code runs before the tests
  // after <- this code runs after the tests
  // describe <- the thing we are testing
  // context <- under specific circumstances
  // it <- an actual test

  describe('user gallery', () => {
    it('must have 12 entries', () => {
      const expected = 12
      const actual = document.querySelector('#gallery').children.length

      expect(actual).to.equal(expected)
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

      describe('the card contents', () => {
        let cards = null

        before(() => {
          cards = document.querySelector('#gallery').children
        })

        it('must have the expected children', () => {
          const expected = [
            'DIV.card-img-container',
            'DIV.card-info-container'
          ]

          cards.forEach((card) => {
            const actual = Array.from(card.children).map((child) => {
              return `${child.tagName}.${child.className}`
            })

            expect(actual).to.deep.equal(expected)
          })
        })

        describe('the first child', () => {
          it('must be the expected markup', () => {
            const pattern = /^<img class="card-img" src="https:\/\/randomuser\.me\/api\/portraits\/med\/(men|women)\/\d+\.jpg" alt="profile picture">$/

            cards.forEach((card) => {
              const actual = card.children[0].innerHTML.trim()
              expect(actual).to.match(pattern)
            })
          })
        })

        describe('the second child', () => {
          it('must have the expected children', () => {
            const expected = ['H3', 'P', 'P']

            cards.forEach((card) => {
              const actual = Array.from(card.children[1].children).map((child) => {
                return child.tagName})
              expect(actual).to.deep.equal(expected)
            })
          })

          describe('the first child', () => {
            it('must have the expected CSS class(es)', () => {
              const expected = ['card-name', 'cap']

              cards.forEach((card) => {
                const actual = card.children[1].children[0].className.split(' ')
                expect(actual).to.have.members(expected)
              })
            })

            it('must have the expected text content', () => {
              const pattern = /^\w+ \w+$/

              cards.forEach((card) => {
                const actual = card.children[1].children[0].textContent
                expect(actual).to.match(pattern)
              })
            })
          })

          describe('the second child', () => {
            it('must have the expected markup (email)', () => {
              const pattern = /^[^@]+@[^@.]+\.[a-z]+$/i

              cards.forEach((card) => {
                const actual = card.children[1].children[1].textContent
                expect(actual).to.match(pattern)
              })
            })
          })
          describe('the second child', () => {
            it('must have the expected markup (city, state)', () => {
              const pattern = /^\w+/

              cards.forEach((card) => {
                const actual = card.children[1].children[2].textContent
                expect(actual).to.match(pattern)
              })
            })
          })
        })
      })
    })
  })
})
