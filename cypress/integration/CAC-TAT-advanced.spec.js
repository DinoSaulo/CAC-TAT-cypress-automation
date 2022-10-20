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

    // utilizando o losash
    // o lodash é utilizado através do Cypress._

    Cypress._.times(5, () => {
        it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios adiantando o relógio do navegador para agilizar o teste', () => {

            cy.clock()

            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)

            cy.get('.error').should('not.be.visible')
        })

    })

    // utilizando o .invoke()

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {

        const longText = Cypress._.repeat('0123456789 ', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('Desafio encontrar o gato', function() {
        cy.get('#cat')
            .invoke('show')
            .should('contain', '🐈')
            .should('be.visible')

        cy.get('#title')
            .invoke('text', 'CAT TAT')
    })
})