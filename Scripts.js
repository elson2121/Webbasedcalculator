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