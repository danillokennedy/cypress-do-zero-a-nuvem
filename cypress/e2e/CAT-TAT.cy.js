//info: https://docs.cypress.io/api/table-of-contents#Commands

describe('Central de Atendimento ao Cliente TAT', () => {
const textolongo = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

  beforeEach(() => {
    cy.visit('./src/index.html')
    })
  
  it('verifica o título da aplicação', () => { // Esse cenario inteiro é o execicio 1 - Aula 01
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => { // Esse cenario inteiro é o execicio 1 - Aula 02
    cy.get('#firstName').type('Danillo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('Teste@cypress.com')
    cy.get('#open-text-area').type(textolongo, { delay: 0 }) // Esse é o execicio extra 1 - Aula 02
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Danillo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('EMAILERRADO') // Esse é o execicio extra 2 - Aula 02
    cy.get('#open-text-area').type('Ola Mundo 123, Sem elogios no momento', {delay: 0})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('validando se o campo telefone aceita apenas dados do tipo num', () => { // Esse cenario inteiro é o execicio extra 3 - Aula 02
    cy.get('#phone')
      .should('not.have.value')
      .type('Teste')
    cy.get('#phone')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { // Esse cenario inteiro é o execicio extra 4 - Aula 02
    cy.get('#firstName').type('Danillo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('Teste@cypress.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Ola Mundo 123, Sem elogios no momento', {delay: 0})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => { // Esse cenario inteiro é o execicio extra 5 - Aula 02
    cy.get('#firstName').as('nome').type('Danillo')
    cy.get('#lastName').as('sobrenome').type('Teste')
    cy.get('#email').as('email').type('Teste@cypress.com')
    cy.get('#phone').as('telefone').type('908908908')

    cy.get('@nome')
      .should('have.value', 'Danillo')
      .clear()
      .should('have.value', '')
    cy.get('@sobrenome')
      .should('have.value', 'Teste')
      .clear()
      .should('have.value', '')
    cy.get('@email')
      .should('have.value', 'Teste@cypress.com')
      .clear()
      .should('have.value', '')
    cy.get('@telefone')
      .should('have.value', '908908908')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { // Esse cenario inteiro é o execicio extra 6 - Aula 02
    cy.contains('button', 'Enviar').click() // Esse é o execicio extra 8 - Aula 02 uso de cy.contains
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => { // Esse cenario inteiro é o execicio extra 7 - Aula 02
    const data = {
      firstName: 'Hasnna',
      lastName: 'TesteTeste', 
      email: 'haahTeste@cypress.com', 
      text: 'Ola Mundo 123, Sem elogios no momento'
    }
        
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .each((tipodeservico) => {
          cy.wrap(tipodeservico)
            .check()
            .should('be.checked')
        })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
  })
})
