describe('Header', () => {
  beforeEach('', () => {
    cy.intercept('POST', '**/login').as('login')
    cy.visit('/en')
  })

  it('should find that no user is logged', () => {
    // english language
    cy.get('[data-menu-list]').should('contain', 'Login')
    cy.get('[data-menu-icon]').click()
    cy.get('[href="/en/login"]').click()
    cy.get('[data-input-username]').type('syndicat')
    cy.get('[data-input-password]').type('vino01')
    cy.get('form').submit()
    cy.wait('@login')

    cy.get('.t-snackbar')
      .should('be.visible')
      .should('contain', 'Successful login')
    cy.get('[data-menu-list]')
      .should('contain', 'My profile')
      .and('contain', 'My visits')
      .and('contain', 'My orders')
      .and('contain', 'My favorites')
      .and('contain', 'Log Out')
    cy.get('[data-menu-icon]').click()
    cy.get('[data-logout]').click()

    // french language
    cy.wait(750)
    cy.visit('/fr/login')
    cy.get('[data-input-username]').type('syndicat')
    cy.get('[data-input-password]').type('vino01')
    // cy.get('.t-button').should('contain', 'Se connecter').click()
    cy.get('form').submit()

    cy.wait('@login')

    cy.get('.t-snackbar')
      .should('be.visible')
      .should('contain', 'Connexion réussie')
    cy.get('[data-menu-list]')
      .should('contain', 'Mon profil')
      .and('contain', 'Mes visites')
      .and('contain', 'Mes commandes')
      .and('contain', 'Mes favoris')
      .and('contain', 'Se déconnecter')
    cy.get('[data-menu-icon]').click()
    cy.get('[data-logout]').click()
  })
})
