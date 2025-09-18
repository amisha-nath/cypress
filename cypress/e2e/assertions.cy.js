describe('SauceDemo Login and Inventory Tests', () => {
  const baseUrl = 'https://www.saucedemo.com/';
  const validUser = 'standard_user';
  const invalidUser = 'invalid_user';
  const password = 'secret_sauce';
 
  it('Valid login and inventory page assertions', () => {
    cy.visit(baseUrl);
    cy.get('#user-name').type(validUser);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
    cy.task('log','Logged in and navigated to inventory page');
 
    // Existence and Visibility
    cy.get('.inventory_list').should('exist').and('be.visible');
    cy.get('.shopping_cart_link').should('exist').and('be.visible');
    cy.get('.product_sort_container1').should('not.exist');
    cy.task('log','Inventory list and cart icon are visible');
 
    // Text Content
    cy.get('.title').should('have.text', 'Products');
    cy.get('.inventory_item_name').first().should('include.text', 'Sauce');
    cy.get('.title').should('not.have.text', 'Dashboard');
    cy.task('log','Title and product name text validated');
 
    // Attribute and Class
    cy.get('.inventory_item_img img').first()
      .should('have.attr', 'alt')
      .and('match', /Sauce Labs/);
    cy.get('.shopping_cart_link').should('have.class', 'shopping_cart_link');
    cy.get('.shopping_cart_link').should('not.have.class', 'disabled');
    cy.task('log','Image alt and cart class assertions passed');
 
    // Input and Value
    cy.get('.inventory_item').should('have.length.greaterThan', 5);
    cy.get('.inventory_item_price').first().invoke('text').then((priceText) => {
      expect(priceText).to.match(/^\$\d+\.\d{2}$/);
      cy.task('log',`Price format validated: ${priceText}`);
    });
 
    // URL and Window
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    cy.window().should('have.property', 'localStorage');
    cy.task('log','URL and window.localStorage verified');
 
    // Chained Assertions
    cy.get('.btn_inventory').first()
      .should('be.visible')
      .and('include.text', 'Add to cart')
      .and('not.have.class', 'disabled');
    cy.task('log','Add to cart button is active and visible');
 
    // Function-based Assertions
    cy.get('.inventory_item_name').then(($items) => {
      expect($items).to.have.length.greaterThan(5);
      expect($items.first()).to.contain('Sauce');
      cy.task('log',`Found ${$items.length} items, first contains: ${$items.first().text()}`);
    });
  });
 
  it('Invalid login should show error message', () => {
    cy.visit(baseUrl);
    cy.get('#user-name').type(invalidUser);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
 
    cy.get('[data-test="error"]')
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Username and password do not match');
    cy.task('log','Error message displayed for invalid login');
    cy.task('log','Invalid login test completed');
  });
});
 