describe('Home', () => {
  it('Should mark as plan to watch', () => {
    cy.intercept('http://localhost:3000/1', { fixture: 'movies.json' }).as(
      'getData',
    );

    cy.intercept('placehold/poster.png', { fixture: 'placeholder.png' }).as(
      'getImage',
    );

    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:3000/user/planning',
      },
      [1],
    ).as('postData');

    cy.visit('/movies');

    cy.wait(['@getData', '@getImage']);

    const identifier: string = '[data-cy="IconPlanToWatch-1"]';

    cy.get(identifier).click();

    cy.wait(['@postData']);
    cy.get(identifier).should('have.class', 'text-emerald-500');
    cy.get(identifier).should('be.visible');
  });
});
