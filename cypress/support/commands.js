const textolongo = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
      firstName: 'Danillo',
      lastName: 'Teste',            //Desta forma, se caso eu fornecer os dados no teste é usado o mesmo
      email: 'Teste@cypress.com',   //se não é usado este padrão ao lado
      text: textolongo
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text, {delay: 0})
    cy.get('button[type="submit"]').click()
})