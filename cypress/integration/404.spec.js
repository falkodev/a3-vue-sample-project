describe('NotFound', () => {
  beforeEach('successfully loads', () => {
    cy.visit('/en/404', { failOnStatusCode: false })

    cy.request({ url: '/en/404', failOnStatusCode: false })
      .its('status')
      .should('equal', 404)
    cy.visit('/en/404', { failOnStatusCode: false })
  })

  it('check page content', () => {
    cy.get('.t-background-404__text').should(
      'contain',
      '404 error: The page cannot be found or no longer exists.',
    )
    cy.get('.t-button--empty').should('contain', 'Back to Home')
  })
})
