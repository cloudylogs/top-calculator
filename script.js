class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let solution;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                solution = prev + current;
                break;
            case "-":
                solution = prev - current;
                break;
            case "*":
                solution = prev * current;
                break;
            case "÷":
                solution = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = solution;
        this.operation = undefined;
        this.previousOperand = "";
    }
    percent() {
        let percentage;
        switch (this.operation) {
            case "%":
                percentage = parseFloat(this.currentOperand / 100)
                break
        }
        this.currentOperand = percentage;
        this.operation = undefined;
        this.previousOperand = "";
        console.log(percentage);
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation !== undefined) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const percentButton = document.querySelector("[data-percent]");
const invertButton = document.querySelector("[data-invert]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

operationButton.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

percentButton.addEventListener("click", () => {
    calculator.percent();
    calculator.updateDisplay();
});

invertButton.addEventListener("click", () => {
    calculator.invert();
    calculator.updateDisplay();
});
