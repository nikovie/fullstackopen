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

  describe('When logged in', function() {
    const blogs = [
      { title: 'Bob\'s blog', author: 'Bob the Bot', url: 'www.fi' },
      { title: 'Another blog', author: 'Someone Else', url: 'www.fi' }
    ]

    beforeEach(function() {
      cy.login()
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy
        .visit('http://localhost:3000')
        .get('#blogList > div')
        .should(($blog) => {
          expect($blog).to.have.length(2)
          expect($blog.eq(0)).to.contain('Bob\'s blog by Bob the Bot')
          expect($blog.eq(1)).to.contain('Another blog by Someone Else')
        })
        
    })

    it('User can like blogs and most liked are shown on top', function() {
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy
        .visit('http://localhost:3000')
        .get('#blogList > div')
        .eq(1)
        .contains('view')
        .click()
      cy.get('button')
        .contains('Like')
        .click()
      cy
        .get('#blogList > div')
        .should(($blog) => {
          expect($blog).to.have.length(2)
          expect($blog.eq(0)).to.contain('Another blog by Someone Else')
          expect($blog.eq(1)).to.contain('Bob\'s blog by Bob the Bot')
        })
    })

    it('User can remove blogs', function() {
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy
        .visit('http://localhost:3000')
        .get('#blogList > div')
        .eq(0)
        .contains('view')
        .click()
      cy.get('button')
        .contains('Remove')
        .click()
      cy.contains('Blog removed')
    })
  })

  afterEach(function() {
    cy.clearLocalStorage()
  })
})
