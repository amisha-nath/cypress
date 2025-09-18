describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
});

it('login', function() {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  cy.get('#app [name="username"]').clear();
  cy.get('#app [name="username"]').type('A');
  cy.get('#app [name="username"]').clear();
  cy.get('#app [name="username"]').type('Admin');
  cy.get('#app [name="password"]').click();
  cy.get('#app [name="password"]').clear();
  cy.get('#app [name="password"]').type('admin');
  cy.get('#app [name="password"]').clear();
  cy.get('#app [name="password"]').type('admin123');
  cy.get('#app .oxd-button').click();
  
});