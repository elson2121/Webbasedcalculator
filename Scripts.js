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
