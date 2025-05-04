import testData from "../../fixtures/host-name.json";
describe('Test update Host\'s name', () => {
    beforeEach(() => {
        Cypress.env('token');
    });
    testData.forEach(({testType, firstName, lastName, description}) => {
        it(`Case: ${description}`, () => {
            cy.updateHostName(firstName, lastName).then(response => {
                switch (testType) {
                    case 'valid':
                        expect(response.status).to.eq(201);
                        cy.getProfile().then((response) => {
                            expect(response.body.data.firstName).to.eq(firstName);
                            expect(response.body.data.lastName).to.eq(lastName);
                        });
                        break;
                    case'missingFirstName':
                    case'missingLastName':
                    case'nullFirstName':
                    case'nullLastName':
                        expect(response.status).to.eq(201);
                        break;
                    default:
                        throw new Error(`Error: ${description}`);
                }
            })
        });
    })
});