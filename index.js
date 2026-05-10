// Objects
const calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => {
        if (b === 0) return "/ᐠ - ˕ -マ Ⳋ Please don't do that";
        return a / b;
    },
}

const calculatorUI = {
    outputBox: document.querySelector("#calculator-screen").firstElementChild,
    inputBox: document.querySelector("#calculator-screen").lastElementChild,
    buttons: document.querySelector("#buttons"),
}

const inputType = {
    deleteButton: ["Backspace", "Delete"],
    allClearButton: "All clear",
    showRecordButton: "Records",
    numberButton: "12345678900",
    decimalButton: ".",
    operatorButton: "+-x*/",

    checkInputType: function(input) {
        if (this.deleteButton.includes(input)) return "deleteButton";
        else if (input === this.allClearButton) return "allClearButton";
        else if (input === this.showRecordButton) return "showRecordButton";
        else if (this.numberButton.includes(input)) return "numberButton";
        else if (input === this.decimalButton) return "decimalButton";
        else if (this.operatorButton.includes(input))return "operatorButton";
    },
}

const calculatorManager = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    currentDisplay: "",
    currentSate: "idle",
    tempResult: null,
    results: [],

    checkState: function(input) {
        switch (this.currentSate) 
        {
            case "idle":
                idle.handleInput(input);
                break;
            case "enteringFirstNumber":
                enteringFirstNumber.handleInput(input);
                break;
            case "enteringOperator":
                enteringOperator.handleInput(input);
                break;
            case "enteringSecondNumber":
                enteringSecondNumber.handleInput(input);
                break;
        }
    },
    changeState: function(state) {
        this.currentSate = state;
    }
}

const idle = {
    handleInput: function(input) {
        switch (inputType.checkInputType(input))
        {
            case "operatorButton":
                this.onOperatorHandling(input);
                break;
            case "numberButton":
                this.onNumberHandling(input);
                break;
            case "decimalButton":
                this.onDecimalHandling();
                break;
        }
    },
    onOperatorHandling: operator => {
        if (operator === "-") 
        {
            updateScreenDisplay(operator);
            calculatorManager.changeState("enteringFirstNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);
        }
    },
    onNumberHandling: number => {
        if (number === "00") number = "0";
        updateScreenDisplay(number);
        calculatorManager.changeState("enteringFirstNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: () => {
        fillPrefixDecimal();
        calculatorManager.changeState("enteringFirstNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    }
}

const enteringFirstNumber = {
    handleInput: function(input) {
        switch (inputType.checkInputType(input))
        {
            case "operatorButton":
                this.onOperatorHandling(input);
                break;
            case "deleteButton":
                this.onDeletionHandling();
                break;
            case "allClearButton":
                this.onClearAllHandling();
                break;
            case "numberButton":
                this.onNumberHandling(input);
                break;
            case "decimalButton":
                this.onDecimalHandling(input);
                break;
        }
    },
    onOperatorHandling: operator => {
        if (calculatorUI.inputBox.value === "-") return;
        if (calculatorManager.currentDisplay.endsWith(".")) fillSuffixDecimal();
        calculatorManager.firstNumber = +calculatorManager.currentDisplay;
        changeCurrentDisplay(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        deleteScreenDisplay();
        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.changeState("idle");

            console.log(calculatorManager.currentSate);
        }

        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        reset();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
    // There'll be 1 zero allowed when a number starts with it, but the rule changed when there's a decimal 
        if (!calculatorManager.currentDisplay.includes("."))
        {
            if (calculatorManager.currentDisplay.startsWith("-") && number === "00") number = "0"; 
            if ((calculatorManager.currentDisplay.startsWith("0") ||
                calculatorManager.currentDisplay.startsWith("-0")) && number[0] === "0") return;
        }
        updateScreenDisplay(number);

        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        // Consider change this into function
        if (calculatorManager.currentDisplay.includes(".")) return;
        if (calculatorManager.currentDisplay === "-") 
        {
            fillPrefixDecimal();
            return;
        }
        updateScreenDisplay(decimal);

        console.log(calculatorManager.currentDisplay);
    }
}

const enteringOperator = {
    handleInput: function(input) {
        switch (inputType.checkInputType(input))
        {
            case "operatorButton":
                this.onOperatorHandling(input);
                break;
            case "deleteButton":
                this.onDeletionHandling();
                break;
            case "allClearButton":
                this.onClearAllHandling();
                break;
            case "numberButton":
                this.onNumberHandling(input);
                break;
            case "decimalButton":
                this.onDecimalHandling(input);
                break;
        }
    },
    onOperatorHandling: operator => {
        if ((calculatorManager.currentDisplay === "x" || calculatorManager.currentDisplay === "/") && operator === "-")
        {
            calculatorUI.inputBox.value += operator;
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-2);
        }
        else if (calculatorManager.currentDisplay.length === 2) 
        {
            calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -2) + operator;
            calculatorManager.currentDisplay = operator;
        }
        else if (calculatorManager.currentDisplay.length === 1)
        {
            calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -1) + operator;
            calculatorManager.currentDisplay = operator;
        }

        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        deleteScreenDisplay();
        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value;
            calculatorManager.changeState("enteringFirstNumber");
            console.log(calculatorManager.currentSate);
        }

        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        reset();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
        if (number === "00") number = "0";
        calculatorManager.operator = calculatorManager.currentDisplay[0];
        if (calculatorManager.currentDisplay.length === 2)
        {
            calculatorUI.inputBox.value += number;
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-2);
        }
        else changeCurrentDisplay(number);
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;

        // Do not show output when didvide 0
        if (checkDividedByZero(calculatorManager.secondNumber, calculatorManager.operator)) 
        {
            calculatorManager.changeState("enteringSecondNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);

            return;
        }
        displayResult();
        calculatorManager.changeState("enteringSecondNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        calculatorManager.operator = calculatorManager.currentDisplay[0];
        if (calculatorManager.currentDisplay.length === 2)
        {
            fillPrefixDecimal();
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-3);
        }
        else 
        {
            fillPrefixDecimal();
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-2);
        }
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;

        // Do not show output when didvide 0
        if (checkDividedByZero(calculatorManager.secondNumber, calculatorManager.operator)) 
        {
            calculatorManager.changeState("enteringSecondNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);

            return;
        }
        displayResult();
        calculatorManager.changeState("enteringSecondNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    }
}

const enteringSecondNumber = {
    handleInput: function(input) {
        switch (inputType.checkInputType(input))
        {
            case "operatorButton":
                this.onOperatorHandling(input);
                break;
            case "deleteButton":
                this.onDeletionHandling();
                break;
            case "allClearButton":
                this.onClearAllHandling();
                break;
            case "numberButton":
                this.onNumberHandling(input);
                break;
            case "decimalButton":
                this.onDecimalHandling(input);
                break;
        }
    },
    onOperatorHandling: operator => {
        if (typeof(calculatorUI.outputBox) !== Number);
        calculatorManager.firstNumber = calculatorManager.results[calculatorManager.results.length - 1];
        calculatorUI.inputBox.value = calculatorManager.results[calculatorManager.results.length - 1];
        calculatorUI.outputBox.innerText = "";
        calculatorManager.results = [];
        changeCurrentDisplay(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentDisplay);
        console.log(calculatorManager.currentSate);
    },
    onDeletionHandling: () => {
        deleteScreenDisplay();
        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-1);
            calculatorManager.changeState("enteringOperator");

            console.log(calculatorManager.currentSate);
        }

        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        reset();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
        if (!calculatorManager.currentDisplay.includes("."))
        {
            if (calculatorManager.currentDisplay.startsWith("-") && number === "00") number = "0"; 
            if ((calculatorManager.currentDisplay.startsWith("0") ||
                calculatorManager.currentDisplay.startsWith("-0")) && number[0] === "0") return;
        }
        updateScreenDisplay(number);

        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        // Consider change this into function
        if (calculatorManager.currentDisplay.includes(".")) return;
        if (calculatorManager.currentDisplay.includes("-")) 
        {
            fillPrefixDecimal();
            return;
        }
        updateScreenDisplay(decimal);
        
        console.log(calculatorManager.currentDisplay);
    }
}

// Functions
function invalidInputHandler()
{
    const EMPTY_STRING = "";
    const VALID_MULTIPLY = "x";

    let invalidInput = /[^0-9.+\-\*x\/]/g;
    let invalidMultiply = /\*/g;

    return () => {
        calculatorUI.inputBox.value = calculatorUI.inputBox.value.replace(invalidInput, EMPTY_STRING).replace(invalidMultiply, VALID_MULTIPLY);
    };
}

function fillPrefixDecimal()
{
    let prefixFilledDecimal = "0.";
    updateScreenDisplay(prefixFilledDecimal);
}

function fillSuffixDecimal()
{
    let suffixFilledDecimal = "0";
    updateScreenDisplay(suffixFilledDecimal);
}

function reset()
{
    calculatorUI.inputBox.value = "";
    calculatorUI.outputBox.innerText = "";
    calculatorManager.currentDisplay = "";
    calculatorManager.firstNumber = null;
    calculatorManager.secondNumber = null;
    calculatorManager.operator = null;
    calculatorManager.changeState("idle");
    calculatorManager.results = [];
}

function updateScreenDisplay(value)
{
    calculatorUI.inputBox.value += value;
    calculatorManager.currentDisplay += value;
}

function deleteScreenDisplay()
{
    calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -1);
    calculatorManager.currentDisplay = calculatorManager.currentDisplay.slice(0, -1);
}

function changeCurrentDisplay(value)
{
    calculatorUI.inputBox.value += value;
    calculatorManager.currentDisplay = value;
}

function calculateResult()
{
    calculatorManager.tempResult = calculator[calculatorManager.operator](calculatorManager.firstNumber, calculatorManager.secondNumber);
    calculatorManager.results.push(calculatorManager.tempResult);
}

function displayResult()
{
    calculateResult();
    calculatorUI.outputBox.innerText = calculatorManager.results[calculatorManager.results.length - 1];
}

function checkDividedByZero(number, operator)
{
    if (number === 0 && operator === "/") return true;
    else return false;
}

// Invalid Input Handling
const invalidInputHandling = invalidInputHandler();

calculatorUI.inputBox.addEventListener("click", e => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
});

calculatorUI.inputBox.addEventListener("keydown", e => {
    calculatorManager.checkState(e.key);
    invalidInputHandling();
    e.preventDefault();
});

calculatorUI.buttons.addEventListener("click", e => {
    if (e.target && e.target.nodeName === "LI")
    {
        calculatorManager.checkState(e.target.innerText);
    }
});

// Align operator to center vertically needs adding a span element with display: inline-flex, will be 
// applied when implement EnteringOperator state