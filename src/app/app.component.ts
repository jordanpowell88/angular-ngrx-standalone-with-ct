import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, StepperComponent],
})
export class AppComponent {
  title = 'angular-ngrx';
}
