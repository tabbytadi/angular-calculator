import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  constructor(public calculator: CalculatorService) { }

  shouldShrinkFont(): boolean {
    return this.calculator.display.length > 6;
  }
}