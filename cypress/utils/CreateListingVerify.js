export function verifyCreatePropertyStep1Response(response, expectedPayload) {
    let {propertyTypeId, roomType, squareType, squareMeters, minNights, maxNights, timezone, address} = response.body.data;

    expect(response.status).to.eq(201, `${response.body.data.id} has created`)
    expect(propertyTypeId).to.eq(expectedPayload.propertyTypeId);
    expect(roomType).to.eq(expectedPayload.roomType);
    // expect(squareType).to.eq(expectedPayload.squareType);
    // expect(squareMeters).to.eq(expectedPayload.squareMeters);
    expect(minNights).to.eq(expectedPayload.minNights);
    expect(maxNights).to.eq(expectedPayload.maxNights);
    expect(timezone).to.eq(expectedPayload.timezone);
    expect(address.country).to.eq(expectedPayload.address.country);
    expect(address.state).to.eq(expectedPayload.address.state);
    expect(address.city).to.eq(expectedPayload.address.city);
    expect(address.street).to.eq(expectedPayload.address.street);
    expect(address.publicAddress).to.eq(expectedPayload.address.publicAddress);
    expect(address.zipcode).to.eq(expectedPayload.address.zipcode);
    expect(address.lat).to.eq(expectedPayload.address.lat);
    expect(address.lng).to.eq(expectedPayload.address.lng);
    cy.log(JSON.stringify(response.body))
}
