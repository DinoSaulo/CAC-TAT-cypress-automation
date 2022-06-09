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
        cy.get('#phone').type('40028922')
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('Estou com problemas em pipipipopopo...')

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('.success').should('contain', 'Mensagem enviada com sucesso')
    })

    it.only('Verifica se é exibida uma mensagem de sucesso ao enviar o formulário digitando lentamente', function() {
        const longText = 'Estou com problemas em pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo,pipipipopopo...'

        cy.get('#firstName').type('Scott', {delay: 500})
        cy.get('#lastName').type('Pilgrim', {delay: 500})
        cy.get('#email').type('scoot.pilgrim@email.com', {delay: 500})
        cy.get('#phone').type('40028922', {delay: 500})
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type(longText, {delay: 0})

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('.success').should('contain', 'Mensagem enviada com sucesso')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Scott')
        cy.get('#lastName').type('Pilgrim')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
    })

    it('Validar que o campo de telefone só aceita números', () => {
        const characters_strings = 'qwertyuiop\\`[{asdfghjklç~^]|zxcvbnm,<.>;:/?!"@#$%¨&*()_-+='

        const characters = characters_strings.split("")
        characters.forEach((character) => {
            cy.get('#phone').type(character)
        })

        cy.get('#phone').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Scott')
        cy.get('#lastName').type('Pilgrim')
        cy.get('#email').type('scoot.pilgrim@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Estou com problemas em pipipipopopo...')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Scott').should('have.value', 'Scott')
        cy.get('#lastName').type('Pilgrim').should('have.value', 'Pilgrim')
        cy.get('#email').type('scoot.pilgrim@email.com').should('have.value', 'scoot.pilgrim@email.com')
        cy.get('#phone').type('40028922').should('have.value', '40028922')

        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        const firstName = 'Scott', lastName = 'Pilgrim', email = 'scoot.pilgrim@email.com', phone = '40028922'
        const product = 'Blog', helpType = "Feedback", emailOrPhone = 'phone', howCanWeHelpYou = 'Estou com problemas em pipipipopopo...'

        cy.fillMandatoryFieldsAndSubmit(firstName, lastName, email, phone, product, helpType, emailOrPhone, howCanWeHelpYou)

        cy.get('.success').should('be.visible')
        cy.get('.success').should('contain', 'Mensagem enviada com sucesso')
    })

    it('Encontrando o botão de enviar de forma alternativa', () => {
        cy.contains('button', 'Enviar').click()
    })
})