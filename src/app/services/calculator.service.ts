import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private currentValue = '0';
  private previousValue: number | null = null;
  private operation: string | null = null;
  private isNewNumber = true;
  private readonly MAX_DISPLAY_LENGTH = 10;

  public get display(): string {
    // Handle overflow and special values
    if (this.currentValue === 'Infinity' || this.currentValue === 'NaN') return 'Error';
    if (this.currentValue.length > this.MAX_DISPLAY_LENGTH) {
      const num = parseFloat(this.currentValue);
      return num.toExponential(5)
        .replace(/e\+?(-?)0*/, 'e$1')
        .replace(/\.?0+e/, 'e');
    }
    return this.currentValue;
  }

  handleInput(value: string): void {
    if (value === 'AC') {
      this.reset();
    } else if (value === '±') {
      this.negate();
    } else if (value === '%') {
      this.handlePercentage();
    } else if (/\d|\./.test(value)) {
      this.handleNumber(value);
    } else {
      this.handleOperator(value);
    }
  }

  private handleNumber(input: string): void {
    // Prevent multiple leading zeros
    if (this.currentValue === '0' && input === '0') return;

    // Handle new number input
    if (this.isNewNumber) {
      this.currentValue = input === '.' ? '0.' : input;
      this.isNewNumber = input === '.';
    } else {
      // Prevent overflow
      if (this.currentValue.replace('-', '').length >= this.MAX_DISPLAY_LENGTH) return;

      // Replace initial zero with new digit
      if (this.currentValue === '0' && input !== '.') {
        this.currentValue = input;
      } else {
        // Prevent multiple decimals
        if (input === '.' && this.currentValue.includes('.')) return;
        this.currentValue += input;
      }
    }

    if (input !== '.') {
      this.isNewNumber = false;
    }
  }

  private calculate(): void {
    if (!this.operation || this.previousValue === null) return;

    const current = parseFloat(this.currentValue);
    let result: number;

    switch (this.operation) {
      case '+':
        result = this.previousValue + current;
        break;
      case '-':
        result = this.previousValue - current;
        break;
      case '×':
        result = this.previousValue * current;
        break;
      case '÷':
        result = current === 0 ? Infinity : this.previousValue / current;
        break;
      default:
        return;
    }

    // Format result with overflow protection
    this.currentValue = this.formatResult(result);
    this.previousValue = null;
    this.operation = null;
    this.isNewNumber = true;
  }

  private formatResult(value: number): string {
    if (!isFinite(value)) return value.toString();

    // Format number with maximum display length
    const strValue = value.toPrecision(this.MAX_DISPLAY_LENGTH)
      .replace(/(\.\d*?[1-9])0+$/, '$1') // Remove trailing zeros
      .replace(/\.$/, ''); // Remove trailing decimal

    return strValue.length > this.MAX_DISPLAY_LENGTH
      ? value.toExponential(5)
      : strValue;
  }

  private negate(): void {
    if (this.currentValue !== '0') {
      this.currentValue = this.currentValue.startsWith('-')
        ? this.currentValue.slice(1)
        : `-${this.currentValue}`;
    }
  }

  private handlePercentage(): void {
    const current = parseFloat(this.currentValue);
    this.currentValue = (current / 100).toString();
    this.isNewNumber = true;
  }

  private handleOperator(operator: string): void {
    if (operator === '=') {
      this.calculate();
      return;
    }

    this.previousValue = parseFloat(this.currentValue);
    this.operation = operator;
    this.isNewNumber = true;
  }

  private reset(): void {
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.isNewNumber = true;
  }
}