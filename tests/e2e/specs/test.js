// https://docs.cypress.io/api/introduction/api.html

describe('Sanity test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    // contains(selector, text)
    cy.contains('h1', 'Listen to Great Music!');
  });
});
