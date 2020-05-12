class Calculator {
  constructor(currentOperandTextElement, perivousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.perivousOperandTextElement = perivousOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.perivousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (this.final) {
      this.currentOperand = "";
    }
    this.final = false;
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperator(operation) {
    if (this.currentOperand === "") return;
    if (this.perivousOperand !== "") {
      this.compite();
    }
    this.operation = operation;
    this.perivousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compite() {
    let compulation;
    const prev = parseFloat(this.perivousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "÷":
        compulation = prev / current;
        break;
      case "*":
        compulation = prev * current;
        break;
      case "+":
        compulation = prev + current;
        break;
      case "-":
        compulation = prev - current;
        break;
      default:
        return;
    }
    this.operation = undefined;
    this.currentOperand = compulation;
    this.perivousOperand = "";
    this.final = true;
  }
  updateDisplay() {
    currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != undefined) {
      this.perivousOperandTextElement.innerText =
        this.perivousOperand + this.operation;
    } else {
      this.perivousOperandTextElement.innerText = this.perivousOperand;
    }
  }
}

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const clearAllBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-equals]");
const perivousOperandTextElement = document.querySelector(
  "[data-perivous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  currentOperandTextElement,
  perivousOperandTextElement
);
numbers.forEach((number) =>
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  })
);

operations.forEach((operation) =>
  operation.addEventListener("click", () => {
    calculator.chooseOperator(operation.innerText);
    calculator.updateDisplay();
  })
);
resultBtn.addEventListener("click", () => {
  calculator.compite();
  calculator.updateDisplay();
});
deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

clearAllBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
