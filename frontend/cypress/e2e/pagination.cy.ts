describe('Home', () => {
  it('Should go to next page', () => {
    cy.intercept('http://localhost:3000/1', {
      page: 1,
      results: [
        {
          id: 1,
          title: 'Movie 1',
          vote: 1,
          image: 'placehold/poster.png',
        },
      ],
      total_pages: 3,
    }).as('getDataFirst');

    cy.intercept('http://localhost:3000/2', {
      page: 2,
      results: [
        {
          id: 3,
          title: 'Movie 2',
          vote: 1,
          image: 'placehold/poster.png',
        },
      ],
      total_pages: 3,
    }).as('getDataSecond');

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

    cy.wait(['@getDataFirst', '@getImage']);

    cy.get('[data-cy="IconNextPage"]').click();

    cy.wait(['@getDataSecond']);

    cy.get('[data-cy="Poster-3"]').should('exist');
  });

  it('Should return to previous page', () => {
    cy.intercept('http://localhost:3000/1', {
      page: 1,
      results: [
        {
          id: 1,
          title: 'Movie 1',
          vote: 1,
          image: 'placehold/poster.png',
        },
      ],
      total_pages: 1,
    }).as('getDataFirst');

    cy.intercept('http://localhost:3000/2', {
      page: 2,
      results: [
        {
          id: 3,
          title: 'Movie 2',
          vote: 1,
          image: 'placehold/poster.png',
        },
      ],
      total_pages: 3,
    }).as('getDataSecond');

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

    cy.wait(['@getDataFirst', '@getImage']);

    cy.get('[data-cy="IconNextPage"]').click();

    cy.get('[data-cy="PageNumber"]').should('have.text', '2');

    cy.wait(['@getDataSecond']);

    cy.get('[data-cy="IconPreviousPage"]').click();

    cy.wait('@getDataFirst');

    cy.get('[data-cy="PageNumber"]').should('have.text', '1');

    cy.get('[data-cy="Poster-1"]').should('exist');
  });
});
