describe('Audio Player', () => {
  it('plays audio', () => {
    cy.visit('/');
    cy.get('.play-button:first').click();
    cy.wait(5000);
    cy.get('.play-button:first').click();

    cy.get('.song-name:last').click();
    cy.get('#play-button').click();
    cy.wait(5000);
    cy.get('#player-play-button').click();
  });
});
