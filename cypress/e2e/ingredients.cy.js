describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should handle drag and drop ingredients', () => {
    cy.get('[data-testid="ingredient-Краторная булка N-200i"]').trigger('dragstart');
    cy.get('[data-testid=bun-element').trigger('drop')

    cy.get('[data-testid="ingredient-Соус фирменный Space Sauce"]').trigger('dragstart');
    cy.get('[data-testid="ingredient-element"]').trigger('drop');

    cy.get('[data-testid="ingredient-Филе Люминесцентного тетраодонтимформа"]').trigger('dragstart');
    cy.get('[data-testid="ingredient-element"]').trigger('drop');

    cy.get('[data-testid="bun-element-Краторная булка N-200i"]').should('exist');
    cy.get('[data-testid="selected-ingredient-Соус фирменный Space Sauce"]').should('exist');
    cy.get('[data-testid="selected-ingredient-Филе Люминесцентного тетраодонтимформа"]').should('exist');
  })

  it('should handle open ingredient details', () => {
    cy.get('[data-testid="ingredient-Краторная булка N-200i"]').trigger('click');
    cy.get('[data-testid=modal-dialog').should('exist');
    cy.get('[data-testid=modal-header').contains('Детали ингредиента');
    cy.get('[data-testid="ingredient-details-name"]').contains('Краторная булка N-200i');
  })

  it('should handle close ingredient details by click on button', () => {
    cy.get('[data-testid="ingredient-Краторная булка N-200i"]').trigger('click');
    cy.get('[data-testid=modal-dialog').should('exist');
    cy.get('[data-testid=modal-header]').find('svg').trigger('click');
    cy.get('[data-testid=modal-dialog').should('not.exist');
  })

  it('should handle close ingredient details by click on overlay', () => {
    cy.get('[data-testid="ingredient-Краторная булка N-200i"]').trigger('click');
    cy.get('[data-testid=modal-dialog').should('exist');
    cy.get('[data-testid=modal-overlay]').trigger('click', { force: true });
    cy.get('[data-testid=modal-dialog').should('not.exist');
  })
})