/**
 * @memberOf cy
 * @method updateLegalName
 * */

Cypress.Commands.add('updateLegalName', (legalName) => {
    cy.request({
        method: 'POST',
        url: '/account-service/v1/user/landing-page/setting',
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json'
        },
        body: {
            legalName
        },
        failOnStatusCode: false
    })

})