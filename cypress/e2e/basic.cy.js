/// <reference types="cypress" />

//Prevent Cypress from failing on cross-origin script errors
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Cypress demo covering Playwright equivalents on demoqa.com', () => {
  it('should perform navigation, UI actions, and network handling', () => {
    
    //Navigation and control 
    cy.visit('https://demoqa.com');       // Navigates to the homepage
    cy.reload();                          // Reloads the current page
    cy.go('back');                        // Navigates back in browser history
    cy.go('forward');                     // Navigates forward in browser history
    cy.viewport(1280, 720);               // Sets the viewport size

    //Querying and finding elements 
    cy.visit('https://demoqa.com/text-box'); // Navigates to the text box page

    cy.get('#userName')                      // Finds the username input field
      .should('be.visible')                  // Asserts it's visible
      .click()                               // Clicks the input
      .type('John Doe');                     // Types into the input

    cy.get('#userEmail')                     // Finds the email input field
      .click()
      .type('john@example.com');             // Types into the input

    cy.contains('Full Name').click();        // Finds element containing text and clicks it

    cy.get('.text-field-container')          // Finds parent container
      .find('#userEmail')                    // Finds child element inside it
      .click();

    cy.get('input').first().click();         // Gets and clicks the first input element
    cy.get('input').last().click();          // Gets and clicks the last input element

    //User actions 
    //cy.get('[type="checkbox"]').check(); // Check all checkboxes
    //cy.get('[type="radio"]').first().check(); // Check the first radio button
    cy.get('#userEmail')                     // Re-selects the email input
      .clear()                               // Clears the input
      .type('new@example.com');              // Types new value

    cy.visit('https://demoqa.com/checkbox'); // Navigates to checkbox page
    cy.get('.rct-checkbox').first().click(); // Clicks the first checkbox (check/uncheck)

    cy.visit('https://demoqa.com/select-menu'); // Navigates to dropdown page
    cy.get('#oldSelectMenu').select('Blue');    // Selects an option from dropdown

    cy.visit('https://demoqa.com/tool-tips');   // Navigates to tooltip page
    cy.get('#toolTipButton').trigger('mouseover'); // Triggers hover event

    //Network interception
    cy.intercept('GET', 'https://dummyjson.com/posts/1', {
      statusCode: 200,
      body: {
        id: 1,
        title: 'Mocked Post Title',
        body: 'This is a mocked post body for Cypress intercept demo.'
      }
    }).as('mockedPost'); // Intercepts and mocks the GET request

    //Trigger the request from browser context
    cy.window().then((win) => {
      win.fetch('https://dummyjson.com/posts/1');
    });

    //Wait for the intercepted request and assert response
    cy.wait('@mockedPost').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log('Intercepted Response:', interception.response.body);
    });

    //Fixture data
    cy.fixture('example.json').then((data) => {
      cy.log('Fixture Data:', data); // Logs fixture data from file
    });
  });
});
