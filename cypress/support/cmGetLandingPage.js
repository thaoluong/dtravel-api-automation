/**
 * @memberOf cy
 * @method getLandingPage
 * */

Cypress.Commands.add('getLandingPage', ()=> {
    cy.request({
        method: 'GET',
        url: '/account-service/v1/user/landing-page/',
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json, text/plain, */*'
        }
    })
})