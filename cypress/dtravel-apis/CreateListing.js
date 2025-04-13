describe('Create Native Property API', () => {
    before(() => {
        Cypress.env('token');
    });



    it('should create a new property successfully', () => {
        cy.fixture('property.json').then((data) => {
            cy.createProperty(data).then((response) => {
                cy.deleteProperty((Number(Cypress.env('createdPropertyId'))).toString())
            })
        });
    });
});
