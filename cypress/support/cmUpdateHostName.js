/**
 * @memberOf cy
 * @param payload
 * @method updateHostName */

Cypress.Commands.add('updateHostName', (firstName, lastName) => {
    cy.request({
        method: 'POST',
        url: '/account-service/v1/user/update-profile',
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json'
        },
        body: {
            firstName,
            lastName,
        },
        failOnStatusCode: false
    })
})
