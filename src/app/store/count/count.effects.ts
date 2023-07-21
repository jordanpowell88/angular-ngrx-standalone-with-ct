import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as CountActions from './count.actions';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { countFeature } from './count.reducer';

export const doubleCountEffects = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(CountActions.incrementCount),
      concatLatestFrom(() => store.select(countFeature.selectCount)),
      map((action, count) => count),
      filter((count) => count >= 10),
      map(() => CountActions.doubleCount())
    );
  },
  { functional: true }
);
