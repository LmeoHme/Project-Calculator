// Objects
const calculatorUI = {
    outputBox: document.querySelector("#calculator-screen").firstElementChild,
    inputBox: document.querySelector("#calculator-screen").lastElementChild,
    buttons: document.querySelector("#buttons"),
}

const inputType = {
    specialButton: "RecordsAll clearDelete",
    numberButton: "12345678900",
    decimalButton: ".",
    operatorButton: "+-x/",

    checkInputType: function(input) {
        if (this.specialButton.includes(input)) return "specialButton";
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
            calculatorUI.inputBox.value += operator;
            calculatorManager.changeState("enteringFirstNumber");
        }
    },
    onNumberHandling: number => {
        if (number === "00") number = "0";
        calculatorUI.inputBox.value += number;
        calculatorManager.changeState("enteringFirstNumber");
    },
    onDecimalHandling: () => {
        calculatorUI.inputBox.value += fillPrefixDecimal();
        calculatorManager.changeState("enteringFirstNumber");
    }
}

const enteringFirstNumber = {
    
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

function hanldeNonPrefixDecimal()
{

}

function fillPrefixDecimal()
{
    let prefixFilledDecimal = "0."
    if (calculatorManager.currentDisplay.length === 0) return prefixFilledDecimal;  
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