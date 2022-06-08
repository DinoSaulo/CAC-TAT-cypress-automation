/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(()=>{
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Verifica se é exibida uma mensagem de sucesso ao enviar o formulário', function() {

        cy.get('#firstName').type('Scott')
        cy.get('#lastName').type('Pilgrim')
        cy.get('#email').type('scoot.pilgrim@email.com')
        cy.get('#phone').type('4002-8922')
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('Estou com prolemas em pipipipopopo...')

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('.success').should('contain', 'Mensagem enviada com sucesso')
    })
})