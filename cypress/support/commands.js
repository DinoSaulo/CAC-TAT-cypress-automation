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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email, phone = '', product, helpType, emailOrPhone, howCanWeHelpYou) => {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#product').select(product)

    if(helpType === 'Ajuda') cy.get('input[type="radio"][value="ajuda"]').click()
    else if (helpType === 'Elogio') cy.get('input[type="radio"][value="elogio"]').click()
    else if (helpType === 'Feedback') cy.get('input[type="radio"][value="feedback"]').click()

    if(emailOrPhone === 'email'){
        cy.get('#email-checkbox').click()
    } else if(emailOrPhone === 'phone') {
        cy.get('#phone-checkbox').click()
    }
    cy.get('#open-text-area').type(howCanWeHelpYou)

    cy.get('button[type="submit"]').click()
})