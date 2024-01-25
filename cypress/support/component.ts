// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import {
  Action,
  FeatureSlice,
  State,
  Store,
  provideState,
  provideStore,
} from '@ngrx/store';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { MountResponse, mount } from 'cypress/angular';
import { countFeature } from 'src/app/store/count/count.reducer';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      store(storePropertyName: string): Cypress.Chainable<Store>;
      dispatch(): Cypress.Chainable;
    }
  }
}

type MountParams = Parameters<typeof mount>;

Cypress.Commands.add(
  'store',
  { prevSubject: true },
  (subject: MountResponse<MountParams>, storePropertyName: string) => {
    const { component } = subject;

    // @ts-expect-error
    const store = component[storePropertyName] as Store;

    return cy.wrap(store);
  }
);

Cypress.Commands.add('dispatch', { prevSubject: true }, (store: Store) => {
  return cy.wrap(cy.spy(store, 'dispatch').as('dispatch'));
});

Cypress.Commands.add(
  'mount',
  (component: MountParams[0], config: MountParams[1] = {}) => {
    return mount(component, {
      ...config,
      providers: [
        ...(config.providers || []),
        provideStore(),
        provideState(countFeature),
      ],
    });
  }
);
