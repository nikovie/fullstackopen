describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    const user = {
      username: 'bob',
      password: 'thebot'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('form#loginForm')
  })

  describe('Login', function () {
    it('succeeds with correct crendentials', function() {
      cy.get('form#loginForm').within(function() {
        cy.get('input[name=username]').type('bob')
        cy.get('input[name=password]').type('thebot')
        cy.get('button').contains('Login').click()
      })
      cy.contains('Add new blog')

    })
    it('fails with wrong crendentials', function() {
      cy.get('form#loginForm').within(function() {
        cy.get('input[name=username]').type('rob')
        cy.get('input[name=password]').type('thebot')
        cy.get('button').contains('Login').click()
      })
      cy.contains('Oops, invalid username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('form#loginForm').within(function() {
        cy.get('input[name=username]').type('bob')
        cy.get('input[name=password]').type('thebot')
        cy.get('button').contains('Login').click()
      })
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('form').within(function() {
        cy.get('#title').type('Bob\'s blog')
        cy.get('#author').type('Bob the Bot')
        cy.get('#url').type('www.fi')
        cy.get('button').contains('Add blog').click()
      })
      cy.contains('A new blog Bob\'s blog has been added')
      cy.get('#blogList').contains('Bob\'s blog by Bob the Bot')
    })
  })

  afterEach(function() {
    cy.clearLocalStorage()
  })
})
