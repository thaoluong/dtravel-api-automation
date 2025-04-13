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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/**
 * @memberOf cy
 * @method createProperty
 * @param {Object} payload
 * */

Cypress.Commands.add('createProperty', (payload) => {
    cy.request({
        method: 'POST',
        url: '/native-property',
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json'
        },
        body: payload,
    }).then((response) => {
        expect(response.status).to.eq(201, `${response.body.data.id} has created`)
        cy.log(response.body)
        Cypress.env('createdPropertyId', response.body.data.id) //set createdPropertyId for environment variable
    });
});


/**
 * @memberOf cy
 * @method deleteProperty
 * @param {String} deleteNum
 * */
Cypress.Commands.add('deleteProperty', deleteNum => {
    cy.request({
        method: 'POST',
        url: `/property/${deleteNum}/delete`,
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        expect(response.status).to.eq(201, `${deleteNum} has deleted`)
        cy.log(response.body)
    })
})