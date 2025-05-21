import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private currentValue = '0';
  private previousValue: number | null = null;
  private operation: string | null = null;
  private isNewNumber = true;
  private readonly MAX_DISPLAY_LENGTH = 13;

  public get display(): string {
    if (this.currentValue === 'Infinity' || this.currentValue === 'NaN') {
      return 'Error';
    }
    return this.addCommas(this.currentValue);
  }

  private addCommas(value: string): string {
    if (/e/i.test(value)) {
      const parts = value.split(/e/i);
      const coefficient = parts[0];
      const exponent = parts[1] || '';
      const [int, frac] = coefficient.split('.');
      const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${formattedInt}${frac ? `.${frac}` : ''}e${exponent}`;
    }

    const sign = value.startsWith('-') ? '-' : '';
    const v = sign ? value.slice(1) : value;
    const [intPart, fracPart] = v.split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + formattedInt + (fracPart ? `.${fracPart}` : '');
  }

  public handleInput(value: string): void {
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
    if (this.isNewNumber) {
      this.currentValue = input === '.' ? '0.' : input;
      this.isNewNumber = false;
    } else {
      if (this.currentValue.replace(/[^0-9]/g, '').length >= this.MAX_DISPLAY_LENGTH) return;
      if (input === '.') {
        if (!this.currentValue.includes('.')) {
          this.currentValue += '.';
        }
      } else {
        this.currentValue += input;
      }
    }
    this.currentValue = this.currentValue.replace(/^0+(\d)/, '$1').replace(/^\./, '0.');
  }

  private handleOperator(operator: string): void {
    if (operator === '=') {
      this.calculate();
    } else {
      if (this.operation !== null) this.calculate();
      this.previousValue = parseFloat(this.currentValue);
      this.operation = operator;
      this.isNewNumber = true;
    }
  }

  private calculate(): void {
    if (this.operation === null || this.previousValue === null) return;

    const current = parseFloat(this.currentValue);
    let result: number;

    switch (this.operation) {
      case '+': result = this.previousValue + current; break;
      case '-': result = this.previousValue - current; break;
      case '×': result = this.previousValue * current; break;
      case '÷': result = current === 0 ? Infinity : this.previousValue / current; break;
      default: return;
    }

    this.currentValue = this.formatResult(result);
    this.operation = null;
    this.previousValue = null;
    this.isNewNumber = true;
  }

  private formatResult(value: number): string {
    if (!isFinite(value)) return value.toString();

    let strValue: string;
    if (Number.isInteger(value)) {
      strValue = value.toString();
    } else {
      strValue = value.toPrecision(12)
        .replace(/(\..*?[1-9])0+$/, '$1')
        .replace(/\.$/, '');
    }

    if (strValue.length > this.MAX_DISPLAY_LENGTH || strValue.includes('e')) {
      strValue = value.toExponential(5)
        .replace(/(\.\d*?[1-9])0+e/, '$1e')
        .replace(/\.e/, 'e')
        .replace(/e\+?/, 'e');
    }

    return strValue.replace('e+', 'e');
  }

  private negate(): void {
    if (this.currentValue !== '0') {
      this.currentValue = this.currentValue.startsWith('-')
        ? this.currentValue.slice(1)
        : `-${this.currentValue}`;
    }
  }

  private handlePercentage(): void {
    const value = parseFloat(this.currentValue) / 100;
    this.currentValue = this.formatResult(value);
    this.isNewNumber = true;
  }

  private reset(): void {
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.isNewNumber = true;
  }
}