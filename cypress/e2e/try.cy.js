// cypress/e2e/todo_app.cy.js

describe('Todo Application Tests', () => {
  // 1. ONE-TIME SETUP: Run before any test in this block
  before(() => {
    cy.log('Setting up test data via API...');
    // Use Cypress API commands to reset the database to a known state
    cy.request('POST', '/test/seed', { fixtures: ['initial-todos'] });
  });

  // 2. PER-TEST SETUP: Run before every single test
  beforeEach(() => {
    cy.log('Visiting the app before each test.');
    // This runs for every `it()` block. Each test starts on the homepage.
    cy.visit('https://todo-app.com');
  });

  // 3. PER-TEST CLEANUP: Run after every single test
  afterEach(() => {
    cy.log('Cleaning up UI state after test.');
    // If a test logs in, we log out to ensure the next test starts fresh.
    cy.window().then((win) => {
      if (win.app?.user?.isLoggedIn) {
        cy.get('button#logout').click();
      }
    });
  });

  // 4. ONE-TIME TEARDOWN: Run after all tests are done
  after(() => {
    cy.log('Final cleanup of test data.');
    cy.request('DELETE', '/test/cleanup');
  });

  // --- THE ACTUAL TESTS ---
  it('should display the initial list of todos', () => {
    cy.get('.todo-list li').should('have.length', 5); // Assumes seed data created 5 items
  });

  it('should add a new todo', () => {
    const newTodo = 'Learn Cypress Hooks';
    cy.get('input.new-todo').type(`${newTodo}{enter}`);
    cy.get('.todo-list li').should('have.length', 6); // 5 initial + 1 new
    cy.contains('.todo-list li', newTodo).should('be.visible');
  });
  cy.url().then(console.log);
cy.get('body').then(console.log);

});
