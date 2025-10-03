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