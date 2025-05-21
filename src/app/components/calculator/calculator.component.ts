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

  get fontShrinkLevel(): '' | 'once' | 'twice' {
    const len = this.calculator.display.length;
    if (len > 12) return 'twice';
    if (len > 8) return 'once';
    return '';
  }
}