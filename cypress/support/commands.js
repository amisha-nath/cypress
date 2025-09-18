Cypress.Commands.add('getSafely', (selector, timeout = 10000) => {
return cy.get(selector, { timeout: timeout }).should('exist');
});
// Custom command for login with error handling
Cypress.Commands.add('loginSafely', (username, password) => {
cy.visit('/web/index.php/auth/login');
cy.getSafely('input[name="username"]').type(username);
cy.getSafely('input[name="password"]').type(password);
cy.getSafely('button[type="submit"]').click();
// Handle both success and failure cases
cy.url().then((url) => {
if (url.includes('/auth/login')) {
throw new Error('Login failed - check credentials');
}
});
});
