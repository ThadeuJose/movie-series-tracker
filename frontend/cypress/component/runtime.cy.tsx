import { Runtime } from '../../src/components/runtime';

describe('Runtime.cy.jsx', () => {
  it("Shouldn't show if runtime is 0", () => {
    cy.mount(
      <div>
        <Runtime runtime={0} />
      </div>,
    );

    cy.get('[data-cy="runtime"]').should('not.exist');
  });

  it('Should show 3 minutes', () => {
    cy.mount(
      <div>
        <Runtime runtime={3} />
      </div>,
    );

    cy.get('[data-cy="runtime"]').should('have.text', '3m');
  });

  it('Should show 45 minutes', () => {
    cy.mount(
      <div>
        <Runtime runtime={45} />
      </div>,
    );

    cy.get('[data-cy="runtime"]').should('have.text', '45m');
  });

  it('Should show 1 hour', () => {
    cy.mount(
      <div>
        <Runtime runtime={60} />
      </div>,
    );

    cy.get('[data-cy="runtime"]').should('have.text', '1h');
  });

  it('Should show 1 hour 30 minutes', () => {
    cy.mount(
      <div>
        <Runtime runtime={90} />
      </div>,
    );

    cy.get('[data-cy="runtime"]').should('have.text', '1h30m');
  });
});
