

describe('SauceDemo Test Suite with Full Hooks', () => {
  before(() => {
    cy.task('log','[before] One-time setup: Visiting login page');
    cy.visit('https://www.saucedemo.com/');
  });

  beforeEach(() => {
    cy.task('log','[beforeEach] Logging in before each test');
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').clear().type('standard_user');
    cy.get('#password').clear().type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
  });

  it('Should display inventory items', () => {
    cy.task('log','Checking inventory items');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
  });

  it('Should validate visual elements with named color logging', () => {
    cy.task('log','Validating button color and label');
    cy.get('.btn_inventory').first().then(($btn) => {
      const bgColor = $btn.css('background-color');
      cy.task('log',`Button background color: ${bgColor}`);
      expect(bgColor).to.exist;
    });
  });

  afterEach(() => {
  cy.url().then((url) => {
    if (url.includes('/inventory.html')) {
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('eq', 'https://www.saucedemo.com/');
    } else {
      cy.log('Skipping logout: Not on inventory page');
    }
  });
});

  after(() => {
    cy.log('[after] Final cleanup: Writing summary log');
    cy.task('log','All tests completed for SauceDemo suite');
  });
});