import {verifyCreatePropertyStep1Response} from "../utils/CreateListingVerify";

describe('Create Native Property API', () => {
    before(() => {
        Cypress.env('token');
    });


    it('should create a new property successfully', () => {
        cy.fixture('property.json').then((data) => {
            cy.createProperty(data).then((response) => {
                verifyCreatePropertyStep1Response(response, data);
                Cypress.env('propertyId', response.body.data.id)
                // cy.deleteProperty((Number(Cypress.env('propertyId'))).toString()).then((response) => {
                //     expect(response.status).to.eq(201, `${Cypress.env('propertyId')} has deleted`)
                //     cy.log(response.body)
                // })
            })
        });
    });

    xit('Upload file using fetch and check response', () => {
        cy.fixture('238490951.jpeg', 'base64').then((fileContent) => {
            cy.window().then((win) => {
                const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
                const formData = new win.FormData();
                formData.append('file', blob, '238490951.jpeg');

                return win.fetch('https://api.dataismist.com/listing-service/v1/native-property/357728/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${Cypress.env('token')}`,
                    },
                    body: formData,
                }).then(async (res) => {
                    const body = await res.json();
                    cy.log('✅ Upload success:', JSON.stringify(body));
                    expect(body.success).to.be.true;
                    expect(body.data).to.include('https://images.dataismist.com/');
                });
            });
        });
    });

    // const propertyId = 357728;
    const files = ['238490951.jpeg', '295587754.jpeg','35077182.jpeg',
        '35154696.jpeg',
        '43301761.jpeg',
        '43301820.jpeg',
        '210389499.jpeg',
        '214994353.jpeg',
        '214994699.jpeg',
        '214994775.jpeg',
        '219028904.jpeg',
        '238490951.jpeg',
        '346327001.jpeg',
        '238699414.jpeg']

    xit('should be able to upload file using custom command', () => {
        const imageUrls =[];
        const imageFiles = files.map((file) => `imageFiles/${file}`);
        cy.log(JSON.stringify(imageFiles, null, 2));
        imageFiles.forEach((file, index) => {
            cy.uploadImageFile(`${Cypress.config('baseUrl')}/native-property/${propertyId}/upload`,file).then(async (response) => {
                expect(await response.success).to.be.true;
                expect(await response.data).to.include('https://images.dataismist.com/');
                imageUrls.push(await response.data);
            }).then(() => {
                cy.request({
                    method: 'POST',
                    url: `${Cypress.config('baseUrl')}/native-property/357728/images`,
                    headers: {
                        Authorization: `Bearer ${Cypress.env('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: createImagePayload(imageUrls)
                }).then((response) => {
                    expect(response.status).to.eq(201)
                    cy.log("ABC: " + JSON.stringify(createImagePayload(imageUrls)))
                })
            })
        })

    });


    it('should be able to upload file using custom command', () => {
        const imageUrls =[];
        const imageFiles = files.map((file) => `imageFiles/${file}`);
        cy.log(JSON.stringify(imageFiles, null, 2));
        imageFiles.forEach((file, index) => {
            cy.uploadImageFile(Cypress.env('propertyId') ,file).then(async (response) => {
                expect(await response.success).to.be.true;
                expect(await response.data).to.include('https://images.dataismist.com/');
                imageUrls.push(await response.data);
            }).then(() => {
                cy.saveImages(Cypress.env('propertyId'), createImagePayload(imageUrls))
                }).then((response) => {
                    expect(response.status).to.eq(201)
                    cy.log("ABC: " + JSON.stringify(createImagePayload(imageUrls)))
                })
            })
        })

    function createImagePayload(imageUrls) {
        return {
            images: imageUrls.map((url, index) => ({
                caption: '',
                url,
                sortOrder: index + 1
            }))
        };
    }


})