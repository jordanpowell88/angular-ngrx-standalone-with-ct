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
  provideState,
  provideStore,
} from '@ngrx/store';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { MountResponse, createOutputSpy, mount } from 'cypress/angular';
import { countFeature } from 'src/app/store/count/count.reducer';
import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  Provider,
  makeEnvironmentProviders,
} from '@angular/core';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      createStoreSpy: typeof createStoreSpy;
    }
  }
}

type MountParams = Parameters<typeof mount>;

function createStoreSpy<T>(componentResponse?: MountResponse<MountParams[0]>) {
  // @ts-expect-error
  const { store } = componentResponse.component as Store<T>;

  cy.spy(store, 'dispatch').as('dispatchSpy');

  return cy.wrap(componentResponse);
}

Cypress.Commands.add('createStoreSpy', { prevSubject: true }, createStoreSpy);

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

// Example use:
// cy.mount(MyComponent)
