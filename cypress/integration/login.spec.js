describe('Login', () => {
  beforeEach('successfully loads', () => {
    cy.intercept('POST', '**/login').as('login')
    cy.visit('/login')
  })

  it('can switch to language EN', () => {
    cy.get('[data-locale-switcher]').click()
    cy.get('[data-locale-list]').click()
    cy.url().should('include', '/en/login')

    cy.get('.t-login__logo').should('contain', 'Your logo here')
    cy.get('.t-form__link').should('contain', 'Forgot your password?')
    cy.get('.t-button--full').should('have.value', 'Login')
    cy.get('.t-account__sentence').should(
      'contain',
      'No account yet? Sign up here!',
    )
    cy.get('.t-button--empty').should('contain', 'I create my account')
    cy.get('.t-login__bottom-sentence').should(
      'contain',
      'Excessive alcohol consumption can be damaging to your health',
    )

    cy.get('form').submit()
    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Required field')

    cy.get('[data-input-username]').type('helloworld')
    cy.get('[data-input-password]').type('vino01')
    cy.get('form').submit()
    cy.get('.t-form__errors')
      .should('be.visible')
      .should(
        'contain',
        'Your credentials are incorrect, or there is no such user',
      )

    cy.get('[data-input-username]').clear()
    cy.get('[data-input-password]').clear()
    cy.get('[data-input-username]').type('syndicat')
    cy.get('[data-input-password]').type('vino01')
    cy.get('form').submit()
    cy.wait('@login')
    cy.wait(1500)

    cy.get('.t-snackbar')
    .should('be.visible')
    .should('contain', 'Successful login')
  })

  it('should reject auth if empty fields', () => {
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject auth if empty password', () => {
    cy.get('[data-input-username]').type('syndicat')
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject auth if empty username', () => {
    cy.get('[data-input-password]').type('vino01')
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject auth if wrong username', () => {
    cy.get('[data-input-username]').type('helloworld')
    cy.get('[data-input-password]').type('vino01')
    cy.get('form').submit()
    cy.wait('@login')
    cy.wait(500)

    cy.get('.t-form__errors')
      .should('be.visible')
      .should(
        'contain',
        "Vos informations d'identification sont incorrectes ou l'utilisateur n'existe pas.",
      )
  })

  it('should reject auth if wrong password', () => {
    cy.get('[data-input-username]').type('syndicat')
    cy.get('[data-input-password]').type('helloWorld')
    cy.get('form').submit()
    cy.wait('@login')
    cy.wait(500)

    cy.get('.t-form__errors')
      .should('be.visible')
      .should(
        'contain',
        "Vos informations d'identification sont incorrectes ou l'utilisateur n'existe pas.",
      )
  })

  it('should enable auth if valid credentials', () => {
    cy.get('[data-input-username]').type('syndicat')
    cy.get('[data-input-password]').type('vino01')
    cy.get('form').submit()
    cy.wait('@login')
    cy.wait(1500)

    cy.get('.t-snackbar')
      .should('be.visible')
      .should('contain', 'Connexion réussie')
  })

  it('should reject auth if too many attemps', () => {
    cy.get('[data-input-username]').type('syndicat')
    cy.get('[data-input-password]').type('vino02')
    cy.get('form').submit()
    cy.wait('@login')

    cy.get('form').submit()
    cy.wait('@login')

    cy.get('form').submit()
    cy.wait('@login')

    cy.get('form').submit()
    cy.wait('@login')

    cy.get('.t-form__errors')
      .should('be.visible')
      .should('contain', 'Trop d\'essais. Vous pouvez réessayer dans une minute.')
  })
})
