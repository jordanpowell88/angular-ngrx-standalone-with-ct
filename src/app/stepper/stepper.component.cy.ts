import { StepperComponent } from './stepper.component';
import { incrementCount } from '../store/count/count.actions';

describe('StepperComponent', () => {
  it('can mount with store', () => {
    cy.mount(StepperComponent);
  });

  it('can increment the count', () => {
    cy.mount(StepperComponent);
    cy.get('button').contains('+').click();
    cy.get('span').should('have.text', '1');
  });

  it('can decrement the count', () => {
    cy.mount(StepperComponent);
    cy.get('button').contains('-').click();
    cy.get('span').should('have.text', '-1');
  });

  it('can spy on increment invocation', () => {
    cy.mount(StepperComponent).then(({ component }) => {
      cy.spy(component, 'increment').as('increment');
    });
    cy.get('button').contains('+').click();
    cy.get('@increment').should('have.been.calledOnce');
    cy.get('span').should('have.text', 1);
  });

  it('can spy on decrement invocation', () => {
    cy.mount(StepperComponent).then(({ component }) => {
      cy.spy(component, 'decrement').as('decrement');
    });
    cy.get('button').contains('-').click();
    cy.get('@decrement').should('have.been.calledOnce');
    cy.get('span').should('have.text', -1);
  });

  it('can spy on store.dispatch', () => {
    cy.mount(StepperComponent).then(({ component }) => {
      // @ts-expect-error
      cy.spy(component.store, 'dispatch').as('dispatch');
    });
    cy.get('button').contains('+').click();
    cy.get('@dispatch').should('have.been.calledWith', incrementCount());
  });

  it('can use cy.store()', () => {
    cy.mount(StepperComponent)
      .store('store')
      .then((store) => {
        cy.spy(store, 'dispatch').as('dispatch');
      });
    cy.get('button').contains('+').click();
    cy.get('@dispatch').should('have.been.called');
    cy.get('span').should('have.text', 1);
  });

  it('can use cy.dispatch()', () => {
    cy.mount(StepperComponent).store('store').dispatch();
    cy.get('button').contains('+').click();
    cy.get('@dispatch').should('have.been.calledWith', incrementCount());
    cy.get('span').should('have.text', 1);
  });
});
