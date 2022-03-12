'use strict';

class Calculator {
  constructor(prevOperand, currOperand) {
    this.prevOperand = prevOperand;
    this.currOperand = currOperand;
  }

  allClear() {
    this.prevOperand = '';
    this.currOperand = '';
    this.operator = '';
  }

  delete() {
    console.log(this.currOperand);

    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currOperand.includes('.')) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === '') {
      this.operation = operation;
      return;
    }
    if (this.prevOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let prev = parseFloat(this.prevOperand);
    let curr = parseFloat(this.currOperand);
    let computation;

    console.log(this.prevOperand, this.currOperand, this.operation);
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;

      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '/':
        computation = prev / curr;
        break;
      case '%':
        computation = (curr / 100) * prev;
        break;
      default:
        return;
    }

    // return computation;

    this.prevOperand = '';
    this.operation = undefined;
    this.currOperand = computation;
  }

  updateDisplay() {
    prevOpsDisp.textContent = this.prevOperand;
    nowOpsDisp.textContent = this.currOperand;
    operatorDisp.textContent = this.operation;
  }
}

const prevOpsDisp = document.querySelector('.prevOpsDisp');
const nowOpsDisp = document.querySelector('.nowOpsDisp');
const operatorDisp = document.querySelector('.operatorDisp');
const keyPad = document.querySelector('.keyPad');

let calculator = new Calculator(
  prevOpsDisp.textContent,
  nowOpsDisp.textContent
);

keyPad.addEventListener('click', function (e) {
  if (e.target.classList.contains('key')) {
    let key = e.target.textContent;
    console.log(key);

    // figure out what has been clicked

    switch (key) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        calculator.chooseOperation(key);
        calculator.updateDisplay();
        break;

      case '=':
        calculator.compute();
        calculator.updateDisplay();
        break;

      case 'C':
        calculator.allClear();
        calculator.updateDisplay();
        break;

      case 'DEL':
        calculator.delete();
        calculator.updateDisplay();
        break;

      default:
        calculator.appendNumber(key);
        calculator.updateDisplay();

        break;
    }
  }
});
