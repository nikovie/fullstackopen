// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', function(username = 'bob', password = 'thebot') {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(function(response) {
      localStorage.setItem('loggedUser', JSON.stringify(response.body))
    })
})

Cypress.Commands.add('createBlog', function(blogObject) {
  const loggedUserJSON = localStorage.getItem('loggedUser')
  const loggedUser = JSON.parse(loggedUserJSON).token

  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blogObject,
    headers: { 'Authorization': `bearer ${loggedUser}` }
  })
})