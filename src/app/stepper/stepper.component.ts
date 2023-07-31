import { Component, InjectionToken, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { countFeature } from '../store/count/count.reducer';
import * as CountActions from '../store/count/count.actions';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [AsyncPipe],
  providers: [Store],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  private store = inject(Store);
  count$ = this.store.select(countFeature.selectCount);

  increment() {
    this.store.dispatch(CountActions.incrementCount());
  }

  decrement() {
    this.store.dispatch(CountActions.decrementCount());
  }

  clear() {
    this.store.dispatch(CountActions.clearCount());
  }
}
