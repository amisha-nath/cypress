describe('OrangeHRM Screenshot Examples', () => {
  it('demonstrates screenshot capabilities', () => {
    // Visit login page
    cy.visit('/web/index.php/auth/login');

    // Wait for the login branding to be visible
    cy.get('.orangehrm-login-branding', { timeout: 10000 }).should('be.visible');

    // Capture entire page
    cy.screenshot('login-page');

    // Capture specific element
    cy.get('.orangehrm-login-branding').screenshot('login-logo');

    // Wait for username and password fields to be visible
    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('admin123');

    // Capture filled form
    cy.screenshot('login-form-filled');

    // Submit form
    cy.get('button[type="submit"]').should('be.enabled').click();

    // Wait for dashboard to load
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Optionally wait for a dashboard element to confirm it's fully loaded
    cy.get('.oxd-topbar-header-title', { timeout: 10000 }).should('be.visible');

    // Capture dashboard page
    cy.screenshot('dashboard-page');
  });
});
