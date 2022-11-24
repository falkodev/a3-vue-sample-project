describe('Register', () => {
  beforeEach('successfully loads', () => {
    cy.intercept('POST', '**/customer').as('register')
    cy.visit('/register')
  })

  it('can switch to language EN', () => {
    cy.get('[data-locale-switcher]').click()
    cy.get('[data-locale-list]').click()
    cy.url().should('include', '/en/register')

    cy.get('.t-login__logo').should('contain', 'Your logo here')
    cy.get('.t-form__title').eq(0).should('contain', 'Account creation')
    cy.get('.t-form__title').eq(1).should('contain', 'Personal data')
    cy.get('.t-form__warning-minor').should('contain', 'I must be an adult...')
    cy.get('.t-button--plain').should('have.value', 'Create my account')
    cy.get('.t-account__sentence').should(
      'contain',
      'I already have an account',
    )
    cy.get('.t-button--outlined').should('contain', 'Login')
  })

  it('should enable register if valid credentials', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()

    cy.wait('@register')
    cy.wait(1500)
    cy.url().should('include', '/login')

    cy.get('.t-snackbar')
      .should('be.visible')
      .should('contain', 'Inscription réussie')
  })

  it('should reject register if empty fields', () => {
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject register if empty email', () => {
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject register if empty password', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject register if empty lastname', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject register if empty firstname', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject register if empty birthdate', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Champ obligatoire')
  })

  it('should reject register if conditions are not accepted', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__errors')
      .should('be.visible')
      .should('contain', 'Vous devez accepter nos conditions')
  })

  it('should reject register if invalid email', () => {
    cy.get('[data-input-email]').type('helloworld')
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', 'Adresse mail non valide')
  })

  it('should reject register if too short password', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('he')
    cy.get('form').submit()
    cy.wait(500)

    cy.get('.t-form__label--error')
      .should('be.visible')
      .should('contain', '6 caractères min')
  })

  it('should reject register if email already exists', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-birthdate]').type('2000-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait('@register')

    cy.get('.t-form__errors')
      .should('be.visible')
      .should('contain', 'Adresse email déjà utilisée')
  })

  it('should reject register if invalid legal age', () => {
    cy.get('[data-input-email]').type('testmail@mail.fr')
    cy.get('[data-input-password]').type('pass01')
    cy.get('[data-input-lastname]').type('newman')
    cy.get('[data-input-firstname]').type('paul')
    cy.get('[data-input-birthdate]').type('2020-05-17')
    cy.get('[data-checkmark-personal-data]').click()
    cy.get('form').submit()
    cy.wait('@register')

    cy.get('.t-form__errors')
      .should('be.visible')
      .should('contain', 'Vous devez être majeur')
  })
})
