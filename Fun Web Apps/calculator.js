let display = document.getElementById('display');
let currentInput = '';
let inputEnabled = true;

const updateDisplay = () => display.value = currentInput;

const appendToDisplay = value => {
    if (inputEnabled) {
        const lastChar = currentInput.slice(-1);
        const operators = ['+', '-', '*', '/'];

        if (operators.includes(lastChar) && operators.includes(value)) {
            currentInput = currentInput.slice(0, -1);
        }

        currentInput += value;
        updateDisplay();
        display.focus();
    }
};

const clearDisplay = () => {
    currentInput = '';
    updateDisplay();
    display.focus();
};

const calculate = () => {
    try {
        const sanitizedInput = currentInput.replace(/[^-()\d/*+.]/g, '');
        if (sanitizedInput.trim() !== "") {
            display.value = currentInput = eval(sanitizedInput).toString();
        }
    } catch (error) { //error handling
        display.value = 'Error';
        alert('error');
        currentInput = '';
    }
    inputEnabled = true;
    display.focus();
};