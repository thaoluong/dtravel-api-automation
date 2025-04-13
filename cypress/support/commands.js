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
    })
});

/**
 * @memberOf cy
 * @method uploadImageFile
 * */
Cypress.Commands.add('uploadImageFile', (propertyId, fileName) => {
    cy.fixture(fileName, 'base64').then((fileContent) => {
        cy.window().then((win) => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
            const formData = new win.FormData();
            formData.append('file', blob, fileName);

            return win.fetch(`${Cypress.config('baseUrl')}/native-property/${propertyId}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cypress.env('token')}`,
                },
                body: formData,
            }).then(async (res) => {
                const body = await res.json();
                // cy.log('📥 Upload response:', JSON.stringify(body));
                return body;
            });
        });
    });
});


/**
 * @memberOf cy
 * @method saveImages
 * */
Cypress.Commands.add('saveImages', (propertyId, createImagePayload) => {
    cy.request({
        method: 'POST',
        url: `/native-property/${propertyId}/images`,
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json'
        },
        body: createImagePayload
    })
})



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
        }
    })
})