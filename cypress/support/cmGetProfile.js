/**
 * @memberOf cy
 * @method getProfile
 * */
Cypress.Commands.add('getProfile', ()=> {
    cy.request({
        method: 'GET',
        url: 'https://api.dataismist.com/account-service/v1/user/profile',
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json, text/plain, */*'
        }
    })
})