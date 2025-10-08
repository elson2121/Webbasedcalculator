// --- Calculator State Management ---
const calculator = {
    // Current value displayed on screen
    displayValue: '0',
    // Stores the first operand for the calculation
    firstOperand: null,
    // Flag to check if the next input should start a new number
    waitingForSecondOperand: false,
    // Stores the operator (+, -, *, /)
    operator: null,
};

// --- DOM Elements ---
const display = document.getElementById('display');
const keys = document.getElementById('calculator-keys');

/**
 * Updates the calculator display element with the current displayValue.
 */
function updateDisplay() {
    display.textContent = calculator.displayValue;
}
// Initial display update
updateDisplay();

// --- Core Logic Functions ---

/**
 * Handles input of digits (0-9).
 * @param {string} digit - The number string to input.
 */
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        // If waiting for second operand, start a fresh number
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Append the digit, preventing multiple leading zeros
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}
/**
 * Handles the decimal point input.
 * @param {string} dot - The decimal point string ('.').
 */
function inputDecimal(dot) {
    // If we just finished a calculation, start the next number with "0."
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    // Only allow one decimal point per number
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

/**
 * Defines the arithmetic functions.
 */
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
};
function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);

    // If there's an existing operator and we are waiting for the second operand,
    // the user is likely changing the operator, so we update it and return.
    if (calculator.operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    } 
     // Store the current display value as the first operand if it hasn't been set
    if (calculator.firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        // If an operator exists, perform the calculation
        const result = performCalculation[calculator.operator](calculator.firstOperand, inputValue);

        // Display the result, ensuring a clean output (avoiding excessive floating point errors)
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
      // Set the state for the next number and operator
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

}

/**
 * Resets the calculator state to its initial values.
 */
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
//deletion function
function deleteDigit() {
    const displayValue = calculator.displayValue;
    // Remove the last character, if the result is an empty string, set it back to '0'
    calculator.displayValue = displayValue.slice(0, -1) || '0';
}
 

// Use event delegation on the calculator grid
keys.addEventListener('click', (event) => {
    // Ensure the click target is a button
    if (!event.target.matches('button')) {
        return;
    }

    const target = event.target;
    const number = target.dataset.number;
    const action = target.dataset.action;
 if (number) {
        inputDigit(number);
    } else if (action === '.') {
        inputDecimal(action);
    } else if (action === 'clear') {
        resetCalculator();
    } else if (action === 'delete') {
        deleteDigit();
    } else if (action === '=') {
        // Handle '=' separately to perform final calculation and clear operator
        if (calculator.operator) {
            handleOperator('=');
        }
        calculator.operator = null;
    } else if (action) {
        // Must be an arithmetic operator (+, -, *, /)
        handleOperator(action);
    }

    // Update the UI after every interaction
    updateDisplay();
});
