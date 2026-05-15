const multiplyOperator = ["x", "*"];
const MINUS_OPERATOR = "-";
const ZERO = "0";
const DOUBLE_ZERO = "00";
const DECIMAL = ".";
const EMPTY_STRING = "";
const VALID_MULTIPLY = "x";

// Objects
const calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => a / b,
}

const calculatorUI = {
    inputBox: document.querySelector("#calculator-screen").firstElementChild,
    outputBox: document.querySelector("#calculator-screen").lastElementChild,
    buttons: document.querySelector("#buttons"),
    recordsList: document.querySelector("#records-list"),
    numberButtons: document.querySelector("#number-buttons"),
}

const inputType = {
    deleteButton: ["Backspace", "Delete"],
    allClearButton: "All clear",
    showRecordsButton: "Records",
    numberButton: "12345678900",
    decimalButton: DECIMAL,
    operatorButton: "+-x*/",
    equalButton: ["=", "Enter"],

    checkInputType: function(input) {
        if (this.deleteButton.includes(input)) return "deleteButton";
        else if (input === this.allClearButton) return "allClearButton";
        else if (input === this.showRecordsButton) return "showRecordsButton";
        else if (this.numberButton.includes(input)) return "numberButton";
        else if (input === this.decimalButton) return "decimalButton";
        else if (this.operatorButton.includes(input)) return "operatorButton";
        else if (this.equalButton.includes(input)) return "equalButton";
        else if (input === this.showRecordsButton) return "showRecordsButton";
    },
}

const calculatorManager = {
    firstNumber: null,
    secondNumber: null,
    operator: null,
    currentDisplay: EMPTY_STRING,
    isPersistentDecimal: false,
    currentSate: "idle",
    tempResult: null,
    results: [],
    records: [],

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
            case "result":
                result.handleInput(input);
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
            case "showRecordsButton":
                this.onShowRecordsHandling();
                break;
        }
    },
    onOperatorHandling: operator => {
        if (operator === MINUS_OPERATOR) 
        {
            updateInputDisplay(operator);
            calculatorManager.changeState("enteringFirstNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);
        }
    },
    onNumberHandling: number => {
        if (number === DOUBLE_ZERO) number = ZERO;
        updateInputDisplay(number);
        calculatorManager.changeState("enteringFirstNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: () => {
        if (!calculatorManager.isPersistentDecimal)
        {
            fillPrefixDecimalWithZero();
            calculatorManager.changeState("enteringFirstNumber");
            calculatorManager.isPersistentDecimal = true;
        }

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onShowRecordsHandling: () => {
        displayRecords.checkRecordsLength();
    },
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
            case "showRecordsButton":
                this.onShowRecordsHandling();
                break;
        }
    },
    onOperatorHandling: operator => {
        if (calculatorUI.inputBox.value === MINUS_OPERATOR) return;
        if (calculatorManager.currentDisplay.endsWith(DECIMAL)) fillSuffixDecimalWithZero();
        calculatorManager.firstNumber = +calculatorManager.currentDisplay;
        changeTrackerValue(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        deleteInputDisplay();
        if (!calculatorManager.currentDisplay.includes(DECIMAL) && calculatorManager.isPersistentDecimal) calculatorManager.isPersistentDecimal = false;
        if (calculatorManager.currentDisplay === EMPTY_STRING)
        {
            calculatorManager.changeState("idle");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);

            return;
        }

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        resetAll();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
    // There'll be 1 zero allowed when a number starts with it, but the rule changed when there's a decimal 
        if (isPersitentFirstOnlyZero(calculatorManager.currentDisplay, number)) return;
        if (calculatorManager.currentDisplay.startsWith(MINUS_OPERATOR) && number === DOUBLE_ZERO && !calculatorManager.isPersistentDecimal) number = ZERO; 
        updateInputDisplay(number);

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        if (calculatorManager.isPersistentDecimal) return;
        if (calculatorManager.currentDisplay === MINUS_OPERATOR) 
        {
            fillPrefixDecimalWithZero();
            calculatorManager.isPersistentDecimal = true;
            return;
        }
        updateInputDisplay(decimal);
        calculatorManager.isPersistentDecimal = true;
        
        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onShowRecordsHandling: () => {
        displayRecords.checkRecordsLength();
    },
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
                this.onDecimalHandling();
                break;
            case "showRecordsButton":
                this.onShowRecordsHandling();
                break;
        }
    },
    onOperatorHandling: operator => {
        if ((multiplyOperator.includes(calculatorManager.currentDisplay) || calculatorManager.currentDisplay === "/") && operator === MINUS_OPERATOR)
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-1) + operator;
            calculatorUI.inputBox.value += operator;
        }
        else if (calculatorManager.currentDisplay.length === 2) 
        {
            calculatorManager.currentDisplay = operator;
            calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -2) + calculatorManager.currentDisplay;
        }
        else if (calculatorManager.currentDisplay.length === 1)
        {
            calculatorManager.currentDisplay = operator;
            calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -1) + calculatorManager.currentDisplay;
        }

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        deleteInputDisplay();
        if (calculatorManager.currentDisplay === EMPTY_STRING)
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value;
            calculatorManager.changeState("enteringFirstNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);

            return;
        }

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        resetAll();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
        if (number === DOUBLE_ZERO) number = ZERO;  
        calculatorManager.operator = calculatorManager.currentDisplay[0];
        if (calculatorManager.currentDisplay.length === 2)
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-1) + number;
            calculatorUI.inputBox.value += number;
        }
        else changeTrackerValue(number);
        if (calculatorManager.isPersistentDecimal) calculatorManager.isPersistentDecimal = false;
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;
        displayResult(calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber));
        calculatorManager.changeState("enteringSecondNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: () => {
        calculatorManager.operator = calculatorManager.currentDisplay[0];
        if (calculatorManager.currentDisplay.length === 2)
        {
            fillPrefixDecimalWithZero();
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-3);
        }
        else 
        {
            fillPrefixDecimalWithZero();
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-2);
        }
        if (!calculatorManager.isPersistentDecimal) calculatorManager.isPersistentDecimal = true;
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;
        displayResult(calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber));
        calculatorManager.changeState("enteringSecondNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onShowRecordsHandling: () => {
        displayRecords.checkRecordsLength();
    },
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
            case "equalButton":
                this.onEqualHandling();
                break;
            case "showRecordsButton":
                this.onShowRecordsHandling();
                break;
        }
    },
    onOperatorHandling: operator => {
        if (calculatorManager.currentDisplay === MINUS_OPERATOR)
        {
            calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -2);
            changeTrackerValue(operator);
            calculatorManager.changeState("enteringOperator");
            
            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);

            return;
        }
        if (isDividedByZero(calculatorManager.tempResult))
        {
            errorMessage.dividedByZero();
            return;
        }
        updateFirstNumber();
        changeTrackerValue(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        deleteInputDisplay();
        if (!calculatorManager.currentDisplay.includes(DECIMAL) && calculatorManager.isPersistentDecimal) calculatorManager.isPersistentDecimal = false;
        if (calculatorManager.currentDisplay === EMPTY_STRING)
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-1);
            calculatorManager.secondNumber = null;
            calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber);
            calculatorManager.changeState("enteringOperator");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);
        }
        if (displayRecords.isToggleOn)
        {
            if (calculatorManager.currentDisplay === MINUS_OPERATOR && calculatorManager.secondNumber === null)
            {
                console.log(calculatorManager.currentSate);
                console.log(calculatorManager.currentDisplay);

                return;
            }
            calculatorManager.secondNumber = +calculatorManager.currentDisplay;
            displayResult(calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber));

            console.log(calculatorManager.results);
        }
        else
        {
            if (calculatorManager.currentDisplay === MINUS_OPERATOR) calculatorManager.secondNumber = null;  
            else calculatorManager.secondNumber = +calculatorManager.currentDisplay;  
            updateOutputDisplay();
            calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber)
        }

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        resetAll();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
        if (isPersitentFirstOnlyZero(calculatorManager.currentDisplay, number)) return;
        if (calculatorManager.currentDisplay.startsWith(MINUS_OPERATOR) && number === DOUBLE_ZERO && !calculatorManager.isPersistentDecimal) number = ZERO; 
        updateInputDisplay(number);
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;
        displayResult(calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber));

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        if (calculatorManager.isPersistentDecimal) return;
        if (calculatorManager.currentDisplay === MINUS_OPERATOR) 
        {
            fillPrefixDecimalWithZero();
            calculatorManager.isPersistentDecimal = true;
            return;
        }
        updateInputDisplay(decimal);
        calculatorManager.isPersistentDecimal = true;
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;
        displayResult(calculateResult(calculatorManager.operator, calculatorManager.firstNumber, calculatorManager.secondNumber));
        
        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onEqualHandling: () => {
        if (error.calculationError(calculatorManager.tempResult)) 
        {
            displayResult(errorMessage.calculationError);
            return;
        }
        if (typeof(calculatorManager.secondNumber) !== "number" || isNaN(calculatorManager.secondNumber)) return;
        if (isDividedByZero(calculatorManager.tempResult))
        {
            errorMessage.dividedByZero();
            return;
        }
        updateRecords();
        swapInputOutputVisual();
        calculatorManager.changeState("result");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onShowRecordsHandling: () => {
        displayRecords.checkRecordsLength();
    },
}

const result = {
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
                this.onDecimalHandling();
                break;
            case "showRecordsButton":
                this.onShowRecordsHandling();
                break;
        }
    },
    onOperatorHandling: operator => {
        resetInputOutputVisual();
        updateFirstNumber();
        changeTrackerValue(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        resetInputOutputVisual();
        calculatorManager.changeState("enteringSecondNumber");
        enteringSecondNumber.onDeletionHandling();
        
        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        resetAll();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
        resetAll();
        calculatorManager.changeState("idle");
        idle.onNumberHandling(number);

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: () => {
        resetAll();
        calculatorManager.changeState("idle");
        idle.onDecimalHandling();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onShowRecordsHandling: () => {
        displayRecords.checkRecordsLength();
    },
}

const displayRecords = {
    isToggleOn: false,
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
            case "showRecordsButton":
                this.checkRecordsLength();
                break;
        }
    },
    onOperatorHandling: input => {
        calculatorManager.changeState("idle");
        idle.onOperatorHandling(input);
    },
    checkRecordsLength: function() {
        switch (calculatorManager.records.length)
        {
            case 0:
                createEmptyRecordsList();
                this.checkEmptyListState();
                break;
            default:
                this.checkListState();
                break;        
        }
    },
    checkEmptyListState: function() {
        if (!this.isToggleOn)
        {
            this.toggleEmptyListOn();
            this.isToggleOn = true;
        }
        else 
        {
            this.toggleEmptyListOff();
            this.isToggleOn = false;
        }
    },
    toggleEmptyListOn: () => {
        calculatorUI.recordsList.removeAttribute("style");
        calculatorUI.numberButtons.style.display = "none";
        calculatorUI.recordsList.firstElementChild.style.display = "flex";
    },
    toggleEmptyListOff: () => {
        calculatorUI.recordsList.style.display = "none";
        calculatorUI.numberButtons.removeAttribute("style");
        calculatorUI.recordsList.firstElementChild.style.display = "none";
    },
    checkListState: function() {
        if (!this.isToggleOn)
        {
            this.toggleDisplayOn();
            this.isToggleOn = true;
        }
        else 
        {
            this.toggleDisplayOff();
            this.isToggleOn = false;
        }
    },
    toggleDisplayOn: () => {
        calculatorUI.recordsList.removeAttribute("style");
        calculatorUI.numberButtons.style.display = "none";
    },
    toggleDisplayOff: () => {
        calculatorUI.recordsList.style.display = "none";
        calculatorUI.numberButtons.removeAttribute("style");
    }
}

const error = {
    dividedByZero: [Infinity, -Infinity],
    calculationError: error => {
        if (isNaN(error)) return true;
        return false;
    },
}

const errorMessage = {
    dividedByZero: () => {
        calculatorUI.outputBox.innerText = "/ᐠ - ˕ -マ Can't didvide by 0";
    },
    calculationError: "≽(◉˕ ◉ ≼マ Error",
}

const calculatedDate = new Date();
// Functions

    // Input Handling Supports
function invalidInputHandler()
{
    let invalidInput = /[^0-9.+\-\*x\/]/g;
    let invalidMultiply = /\*/g;

    return () => {
        calculatorUI.inputBox.value = calculatorUI.inputBox.value.replace(invalidInput, EMPTY_STRING).replace(invalidMultiply, VALID_MULTIPLY);
    };
}

    // Decimal Handling Supports
function fillPrefixDecimalWithZero()
{
    let prefixFilledDecimal = "0.";
    updateInputDisplay(prefixFilledDecimal);
}

function fillSuffixDecimalWithZero()
{
    let suffixFilledDecimal = "0";
    updateInputDisplay(suffixFilledDecimal);
}

    // Reset Functions
function resetAll()
{
    resetInputOutputVisual();
    calculatorUI.inputBox.value = EMPTY_STRING;
    calculatorUI.outputBox.innerText = EMPTY_STRING;
    calculatorManager.currentDisplay = EMPTY_STRING;
    calculatorManager.firstNumber = null;
    calculatorManager.secondNumber = null;
    calculatorManager.operator = null;
    calculatorManager.isPersistentDecimal = false;
    calculatorManager.changeState("idle");
    calculatorManager.results = [];
}

function resetDisplay()
{
    calculatorUI.inputBox.value = calculatorManager.results[0];
    calculatorUI.outputBox.innerText = EMPTY_STRING;
    calculatorManager.results = [];
}

function resetInputOutputVisual()
{
    calculatorUI.inputBox.removeAttribute("style");
    calculatorUI.outputBox.removeAttribute("style");
}

    // Display Handling Supports
        // Input
function updateInputDisplay(value)
{
    calculatorUI.inputBox.value += value;
    calculatorManager.currentDisplay += value;
}

function deleteInputDisplay()
{
    calculatorUI.inputBox.value = calculatorUI.inputBox.value.slice(0, -1);
    calculatorManager.currentDisplay = calculatorManager.currentDisplay.slice(0, -1);
}

function changeTrackerValue(value)
{
    calculatorUI.inputBox.value += value;
    calculatorManager.currentDisplay = value;
}
        // Output
function updateOutputDisplay()
{
    calculatorManager.results.shift();
    if (calculatorManager.results.length === 0)
    {
        calculatorUI.outputBox.innerText = EMPTY_STRING;
        return;
    }
    calculatorUI.outputBox.innerText = calculatorManager.results[0];
}

function swapInputOutputVisual()
{
    calculatorUI.inputBox.setAttribute("style", "opacity: .5; font-size: 36px");
    calculatorUI.outputBox.setAttribute("style", "opacity: 1; font-size: 48px");
}
        // Result
function calculateResult(operator, firstNumber, secondNumber)
{
    // if (!isFinite(secondNumber)) return errorMessage.calculationError;
    calculatorManager.tempResult = calculator[operator](firstNumber, secondNumber);
    if (isDividedByZero(calculatorManager.tempResult) || error.calculationError(calculatorManager.tempResult))
    {
        return EMPTY_STRING;
    }
    return calculatorManager.tempResult;
}

function displayResult(value)
{
    if (typeof(value) !== "number")
    {
        calculatorUI.outputBox.innerText = value;

        console.log(calculatorManager.results);

        return;
    }
    calculatorManager.results.unshift(value);
    calculatorUI.outputBox.innerText = calculatorManager.results[0];

    console.log(calculatorManager.results);
}

    // Records Handling Supports
function createRecordsListItem(record)
{
    const listItem = document.createElement("li");
    const itemCalculationValue = document.createElement("p");
    const itemResultValue = document.createElement("p");
    const itemDateValue = document.createElement("p");

    listItem.classList.toggle("list-item");
    itemCalculationValue.classList.toggle("calculation-value");
    itemResultValue.classList.toggle("result-value");
    itemDateValue.classList.toggle("date-value");
    
    itemCalculationValue.innerText = record.calculation;
    itemResultValue.innerText = record.result;
    itemDateValue.innerText = record.date;

    listItem.append(itemCalculationValue);
    listItem.append(itemResultValue);
    listItem.append(itemDateValue);
    calculatorUI.recordsList.prepend(listItem);
}

function createEmptyRecordsList()
{
    if (calculatorUI.recordsList.children.length > 0) return;
    const MESSAGE = "The record is empty, do some calculation to fill it ≽^•⩊•^≼"
    const emptyList = document.createElement("p");
    emptyList.classList.toggle("list-item");
    emptyList.setAttribute("style", "font-size: 26px; display: none");
    emptyList.innerText = MESSAGE;
    calculatorUI.recordsList.prepend(emptyList);
}

    // Zero Handling Supports
function isPersitentFirstOnlyZero(tracker, number)
{
    if (!tracker.includes(DECIMAL))
    {
        if ((tracker.startsWith(ZERO) || tracker.startsWith("-0")) && number[0] === ZERO) 
        {
            return true;
        }
        return false;
    }
}

function isDividedByZero(value)
{
    if (isNaN(value)) return true;
    if (error.dividedByZero.includes(value)) return true;
    return false;
}

    // Arrays Handling Supports
function updateRecords()
{
    const record = {
        calculation: EMPTY_STRING,
        result: EMPTY_STRING,
        date: `${calculatedDate.getFullYear()}/${(calculatedDate.getMonth() + 1).toString().padStart(2, ZERO)}/${calculatedDate.getDate()}`,
    };
    record.calculation = calculatorUI.inputBox.value;
    record.result = calculatorManager.tempResult;
    calculatorManager.records.push(record);
    createRecordsListItem(record);

    console.log(calculatorManager.records);
}

    // Number's Values Handling Supports
function updateFirstNumber()
{
    calculatorManager.firstNumber = calculatorManager.results[0];
    resetDisplay();
}

// Events Handling
const invalidInputHandling = invalidInputHandler();

calculatorUI.inputBox.addEventListener("click", e => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
});

calculatorUI.inputBox.addEventListener("keydown", e => {
    e.target.scrollLeft = e.target.scrollWidth;
    console.log(e.target.scrollLeft);
    console.log(e.target.scrollWidth);

    calculatorManager.checkState(e.key);
    invalidInputHandling();
    e.preventDefault();
});

calculatorUI.inputBox.addEventListener("focus", e => {
    e.target.scrollLeft = e.target.scrollWidth;
    console.log(e.target.scrollLeft);
    console.log(e.target.scrollWidth);
})

calculatorUI.buttons.addEventListener("click", e => {
    if (e.target && e.target.nodeName === "LI")
    {
        calculatorManager.checkState(e.target.innerText);
    }
});

calculatorUI.recordsList.style.display = "none";

// Align operator to center vertically needs adding a span element with display: inline-flex, will be applied when implement EnteringOperator state
// Problems can't solve due to lack of knowledge: 
// - Snap to the end of input if it's too long
