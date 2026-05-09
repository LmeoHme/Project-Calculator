// Objects
const calculatorUI = {
    outputBox: document.querySelector("#calculator-screen").firstElementChild,
    inputBox: document.querySelector("#calculator-screen").lastElementChild,
    buttons: document.querySelector("#buttons"),
}

const inputType = {
    deleteButton: "Delete",
    allClearButton: "All clear",
    showRecordButton: "Records",
    numberButton: "12345678900",
    decimalButton: ".",
    operatorButton: "+-x/",

    checkInputType: function(input) {
        if (input === this.deleteButton) return "deleteButton";
        else if (input === this.allClearButton) return "allClearButton";
        else if (input === this.showRecordButton) return "showRecordButton";
        else if (this.numberButton.includes(input)) return "numberButton";
        else if (input === this.decimalButton) return "decimalButton";
        else return "operatorButton";
    },
}

const calculatorManager = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    currentDisplay: "",
    currentSate: "idle",

    checkState: function(input) {
        switch (this.currentSate) 
        {
            case "idle":
                idle.handleInput(input);
                break;
            case "enteringFirstNumber":
                enteringFirstNumber.handleInput(input);
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
            // Consider change to function later
            calculatorUI.inputBox.value += operator;
            calculatorManager.currentDisplay = calculatorUI.inputBox.value;

            calculatorManager.changeState("enteringFirstNumber");
            console.log(calculatorManager.currentSate);
        }
    },
    onNumberHandling: number => {
        if (number === "00") number = "0";

        // Consider change to function later
        calculatorUI.inputBox.value += number;
        calculatorManager.currentDisplay = calculatorUI.inputBox.value;

        calculatorManager.changeState("enteringFirstNumber");
        console.log(calculatorManager.currentSate);
    },
    onDecimalHandling: () => {
        fillPrefixDecimal();
        calculatorManager.changeState("enteringFirstNumber");
        console.log(calculatorManager.currentSate);
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

        // Consider change to function later
        calculatorUI.inputBox.value += operator;
        calculatorManager.firstNumber = +calculatorManager.currentDisplay;
        calculatorManager.currentDisplay = "";

        calculatorManager.changeState("enteringOperator");
        console.log(calculatorManager.currentSate);
    },
    onDeletionHandling: () => {
        // Consider change to function later
        calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -1);
        calculatorManager.currentDisplay = calculatorUI.inputBox.value;

        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.changeState("idle");
            console.log(calculatorManager.currentSate);
        }
    },
    onClearAllHandling: () => {
        reset();
        console.log(calculatorManager.currentSate);
    },
    onNumberHandling: number => {
    // There'll be 1 zero allowed when a number starts with it, but the rule changed when there's a decimal 
        if (!calculatorManager.currentDisplay.includes("."))
        {
            if (calculatorManager.currentDisplay.startsWith("-") && number === "00") number = "0"; 
            if ((calculatorManager.currentDisplay.startsWith("0") ||
                calculatorManager.currentDisplay.startsWith("-0")) && number[0] === "0") return;
        }
        calculatorUI.inputBox.value += number;
        calculatorManager.currentDisplay = calculatorUI.inputBox.value;
    },
    onDecimalHandling: decimal => {
        if (calculatorManager.currentDisplay.includes(".")) return;
        if (calculatorManager.currentDisplay.includes("-")) 
        {
            fillPrefixDecimal();
            return;
        }
        calculatorUI.inputBox.value += decimal;
        calculatorManager.currentDisplay = calculatorUI.inputBox.value;
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
    calculatorUI.inputBox.value += prefixFilledDecimal;
    calculatorManager.currentDisplay = calculatorUI.inputBox.value;
}

function fillSuffixDecimal()
{
    let suffixFilledDecimal = ".0";
    return suffixFilledDecimal;
}

function reset()
{
    calculatorUI.inputBox.value = "";
    calculatorManager.currentDisplay = "";
    calculatorManager.firstNumber = null;
    calculatorManager.secondNumber = null;
    calculatorManager.operator = null;
    calculatorManager.changeState("idle");
}

// Invalid Input Handling
const invalidInputHandling = invalidInputHandler();

calculatorUI.inputBox.addEventListener("input", e => {
    e.preventDefault();
    invalidInputHandling();
});

calculatorUI.inputBox.addEventListener("click", e => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
});

calculatorUI.buttons.addEventListener("click", e => {
    if (e.target && e.target.nodeName === "LI")
    {
        calculatorManager.checkState(e.target.innerText);
    }
});
// Align operator to center vertically needs adding a span element with display: inline-flex, will be 
// applied when implement EnteringOperator state