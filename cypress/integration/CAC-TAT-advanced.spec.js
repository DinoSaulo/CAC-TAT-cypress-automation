/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(()=>{
        cy.visit('./src/index.html')
    })

    it('Verifica se é exibida e ocultada a mensagem de sucesso adiantando o relógio do navegador para agilizar o teste', function() {
        cy.clock()

        cy.get('#firstName').type('Scott')
        cy.get('#lastName').type('Pilgrim')
        cy.get('#email').type('scoot.pilgrim@email.com')
        cy.get('#phone').type('40028922')
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('Estou com problemas em pipipipopopo...')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios adiantando o relógio do navegador para agilizar o teste', () => {

        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

})