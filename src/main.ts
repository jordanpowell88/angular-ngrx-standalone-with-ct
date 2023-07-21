import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { countFeature } from './app/store/count/count.reducer';
import * as countEffects from './app/store/count/count.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideStore(),
    provideState({ name: countFeature.name, reducer: countFeature.reducer }),
    provideStoreDevtools(),
    provideEffects(countEffects),
  ],
}).catch((err) => console.error(err));
