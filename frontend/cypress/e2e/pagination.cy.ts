describe('Pagination', () => {
  beforeEach(() => {
    createIntercepter(
      getAPIUrl('1'),
      {
        page: 1,
        results: [createMovie(1)],
        total_pages: 3,
      },
      'getDataFirst',
    );
    createIntercepter(
      getAPIUrl('2'),
      {
        page: 2,
        results: [createMovie(2)],
        total_pages: 3,
      },
      'getDataSecond',
    );

    createImageInterceptor('getImage');
  });

  it('Should go to next page', () => {
    cy.visit('/movies');

    cy.wait(['@getDataFirst', '@getImage']);

    cy.get('[data-cy="IconNextPage"]').click();

    cy.wait(['@getDataSecond']);

    cy.get('[data-cy="Poster-2"]').should('exist');
  });

  it('Should return to previous page', () => {
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

  it("Shouldn't go to previous page if is first", () => {
    createIntercepter(
      getAPIUrl('/tv?page=1'),
      {
        page: 1,
        results: [createMovie(1)],
        total_pages: 3,
      },
      'getDataTVFirst',
    );

    cy.visit('/tv');

    cy.wait(['@getDataTVFirst', '@getImage']);

    cy.get('[data-cy="IconPreviousPage"]').click();

    cy.get('[data-cy="PageNumber"]').should('have.text', '1');

    cy.get('[data-cy="Poster-1"]').should('exist');
  });

  it.only("Shouldn't go to next page if is last", () => {
    createIntercepter(
      getAPIUrl('/tv?page=1'),
      {
        page: 1,
        results: [createMovie(1)],
        total_pages: 1,
      },
      'getDataTVFirst',
    );

    cy.visit('/tv');

    cy.wait(['@getDataTVFirst', '@getImage']);

    cy.get('[data-cy="IconNextPage"]').click();

    cy.get('[data-cy="PageNumber"]').should('have.text', '1');

    cy.get('[data-cy="Poster-1"]').should('exist');
  });
});

function createImageInterceptor(interceptorName: string) {
  cy.intercept('placehold/poster.png', { fixture: 'placeholder.png' }).as(
    interceptorName,
  );
}

function createIntercepter(
  url: string,
  placeholder: any,
  interceptorName: string,
) {
  cy.intercept(url, placeholder).as(interceptorName);
}

function getAPIUrl(endpoint: string) {
  return `http://localhost:3000/${endpoint.replace('/', '')}`;
}

function createMovie(id: number) {
  return {
    id,
    title: `Movie ${id}`,
    vote: 1,
    image: 'placehold/poster.png',
  };
}
