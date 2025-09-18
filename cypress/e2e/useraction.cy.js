describe('Cypress DOM Actions Demo', () => {
  it('Performs various DOM actions', () => {
    // Visit the Dropdown page
    cy.visit('https://practice.expandtesting.com/dropdown');

    // Select an option from the dropdown using a specific ID
    cy.get('#dropdown').select('Option 2');

    // Visit the Checkboxes page
    cy.visit('https://practice.expandtesting.com/checkboxes');

    // Check and uncheck the first checkbox
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
    cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked');

    // Visit the Hovers page
    cy.visit('https://practice.expandtesting.com/hovers');

    // Trigger a mouseover event
    cy.get('.figure').first().trigger('mouseover');

    // Visit the Drag and Drop page
    cy.visit('https://practice.expandtesting.com/drag-and-drop');

    // Trigger a mousedown event
    cy.get('#column-a').trigger('mousedown');
  });
});
