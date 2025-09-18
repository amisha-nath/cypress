describe('SauceDemo Wait Strategies with Logs', () => {


it('Implicit wait: Validate inventory items after login', () => {
  cy.task('log','Visiting login page');
  cy.visit('https://www.saucedemo.com/');

  cy.task('log','Logging in with standard_user');
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();

   cy.task('log','Verifying URL contains /inventory.html');
    cy.url().should('include', '/inventory.html');//implict wait

    cy.task('log','Checking for inventory items (implicit wait)');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);


  cy.task('log','Inventory items loaded successfully');
});

it('Explicit wait: Wait for inventory API and validate item count', () => {
  cy.task('log','Visiting login page');
  cy.visit('https://www.saucedemo.com/');

  cy.task('log','Logging in with standard_user');
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();

  cy.task('log','Explicit wait for inventory container to appear');
    cy.get('.inventory_list', { timeout: 10000 }).should('be.visible');

    cy.task('log','Validating visual element: Add to Cart button color');
    cy.get('.btn_inventory').first().should('be.visible').then(($btn) => {
      const bgColor = $btn.css('background-color');
      cy.task('log',`Button background color: ${bgColor}`);
      expect(bgColor).to.exist;
    });


  cy.task('log','Visual validation complete');
});
});