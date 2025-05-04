import legalNameDataSet from "../../fixtures/legal-name.json";
describe('Test update legal name', () => {
    beforeEach(() => {
        Cypress.env('token');
    });
    legalNameDataSet.forEach(({testType, legalName, description}) => {
        it(`Case: ${description}`, () => {
            cy.updateLegalName(legalName).then(response => {
                switch (testType) {
                    case 'valid':
                        cy.log(legalName)
                        expect(response.status).to.eq(201);
                        cy.getLandingPage().then((response) => {
                            expect(response.body.data.legalName).to.eq(legalName);
                        })
                        break;

                    case 'blankLegalName':
                    case 'duplicatedLegalName':
                    case 'nullLegalName':
                        expect(response.status).to.eq(201,
                            `Error: ${description}`);
                        break;
                    default:
                }
            })
        })
    })

});