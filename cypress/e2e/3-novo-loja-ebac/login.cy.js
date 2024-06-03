/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('fabiana.teste@teste.com.br')
        cy.get('#password').type('Juli160710')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, fabiana.teste (não é fabiana.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuario invalido', () => {
        cy.get('#username').type('fabianafr@teste.com.br')
        cy.get('#password').type('Juli160710')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')

    });

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {
        cy.get('#username').type('fabiana.teste@teste.com.br')
        cy.get('#password').type('Juli')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail fabiana.teste@teste.com.br está incorreta. Perdeu a senha?')

    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, fabiana.teste (não é fabiana.teste? Sair)')

    });

    it.only('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario , { log: false })
            cy.get('#password').type(dados.senha , { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, fabiana.teste (não é fabiana.teste? Sair)')
    
        })

    });

})