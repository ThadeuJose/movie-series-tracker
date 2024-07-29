describe('Home', () => {
  it('Should mark as watched', () => {
    cy.intercept('http://localhost:3000/1', { fixture: 'movies.json' }).as(
      'getData',
    );

    cy.intercept('placehold/poster.png', { fixture: 'placeholder.png' }).as(
      'getImage',
    );

    cy.visit('/');

    cy.wait(['@getData', '@getImage']);

    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:3000/user/watched',
      },
      [1],
    ).as('postData');

    cy.get('[data-cy="IconNotWatched-1"]').click();

    cy.wait(['@postData']);
    cy.get('[data-cy="IconWatched-1"]').should('be.visible');
    cy.get('[data-cy="IconNotWatched-1"]').should('not.exist');
  });
});
