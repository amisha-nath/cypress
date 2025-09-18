// cypress/e2e/my_first_test.cy.js

describe('Basic Website Navigation and Assertion', () => {
  it('should successfully load the homepage and verify its title', () => {
    cy.visit('https://example.cypress.io');
    cy.title().should('eq', 'Cypress.io: Kitchen Sink');
  });

  it('should navigate to the actions page and check a heading', () => {
    cy.visit('https://example.cypress.io');

    // Click the "Commands" card
    cy.contains('Commands').click();

    // Wait for the page to load and click "Actions" in the sidebar
    cy.contains('Actions').click();

    // Assert the URL includes '/commands/actions'
    cy.url().should('include', '/commands/actions');

    // Assert the heading on the new page
    cy.get('h1').should('contain.text', 'Actions');
  });
});
