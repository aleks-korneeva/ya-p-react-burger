import '../support/commands'
describe('constructor ingredients test', () => {
  const bunName = 'Краторная булка N-200i';
  const mainName = 'Филе Люминесцентного тетраодонтимформа';
  const sauceName = 'Соус фирменный Space Sauce'

  beforeEach(() => {
    cy.visit('/');
    cy.get(`[data-testid="ingredient-${bunName}"]`).as('bunIngredient');
  })

  it('should handle drag and drop ingredients', () => {
    cy.get('[data-testid=bun-element').as('bunTarget');
    cy.get('[data-testid="ingredient-element"]').as('fillingTarget');

    cy.dragAndDrop('@bunIngredient', '@bunTarget');
    cy.dragAndDrop(`[data-testid="ingredient-${sauceName}"]`, '@fillingTarget');
    cy.dragAndDrop(`[data-testid="ingredient-${mainName}"]`, '@fillingTarget');

    cy.get(`[data-testid="bun-element-${bunName}"]`).should('exist');
    cy.get(`[data-testid="selected-ingredient-${sauceName}"]`).should('exist');
    cy.get(`[data-testid="selected-ingredient-${mainName}"]`).should('exist');
  })

  it('should handle open ingredient details', () => {
    cy.openIngredientDetails('@bunIngredient');
    cy.get('[data-testid=modal-header').contains('Детали ингредиента');
    cy.get('[data-testid="ingredient-details-name"]').contains(bunName);
  })

  it('should handle close ingredient details by click on button', () => {
    cy.openIngredientDetails('@bunIngredient');
    cy.get('[data-testid=modal-header]').find('svg').trigger('click');
    cy.get('[data-testid=modal-dialog').should('not.exist');
  })

  it('should handle close ingredient details by click on overlay', () => {
    cy.openIngredientDetails('@bunIngredient');
    cy.get('[data-testid=modal-overlay]').trigger('click', { force: true });
    cy.get('[data-testid=modal-dialog').should('not.exist');
  })
})