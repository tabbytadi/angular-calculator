import { Component } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent],
  template: `<app-calculator></app-calculator>`,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f0f0;
    }
  `]
})
export class AppComponent { }