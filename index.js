// Objects
const calculator = {
    error: "ERROR",
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => {
        if (b === 0) return calculatorcalculator.error
        return a / b;
    },
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
    decimalButton: ".",
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
    currentDisplay: "",
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
        if (operator === "-") 
        {
            updateInputDisplay(operator);
            calculatorManager.changeState("enteringFirstNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);
        }
    },
    onNumberHandling: number => {
        if (displayRecords.isToggleOn) 
        {
            onRecordsResultHandling();
            return;
        }
        if (number === "00") number = "0";
        updateInputDisplay(number);
        calculatorManager.changeState("enteringFirstNumber");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onRecordsResultHandling: () => {

    },
    onDecimalHandling: () => {
        fillPrefixDecimal();
        calculatorManager.changeState("enteringFirstNumber");

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
        if (calculatorUI.inputBox.value === "-") return;
        if (calculatorManager.currentDisplay.endsWith(".")) fillSuffixDecimal();
        calculatorManager.firstNumber = +calculatorManager.currentDisplay;
        changeCurrentDisplayValue(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDeletionHandling: () => {
        deleteInputDisplay();
        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.changeState("idle");

            console.log(calculatorManager.currentSate);
        }

        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        resetAll();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
    // There'll be 1 zero allowed when a number starts with it, but the rule changed when there's a decimal 
        if (checkFirstOnlyZero(calculatorManager.currentDisplay, number)) return;
        if (calculatorManager.currentDisplay.startsWith("-") && number === "00") number = "0"; 
        updateInputDisplay(number);

        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        if (checkPersistentDecimal(calculatorManager.currentDisplay)) return;
        updateInputDisplay(decimal);

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
        if ((calculatorManager.currentDisplay === "x" || calculatorManager.currentDisplay === "*" || calculatorManager.currentDisplay === "/") && operator === "-")
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
        deleteInputDisplay();
        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value;
            calculatorManager.changeState("enteringFirstNumber");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);
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
        if (number === "00") number = "0";
        calculatorManager.operator = calculatorManager.currentDisplay[0];
        if (calculatorManager.currentDisplay.length === 2)
        {
            calculatorUI.inputBox.value += number;
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-2);
        }
        else changeCurrentDisplayValue(number);
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
    onDecimalHandling: () => {
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
    // When an operator inserted during this state, the result displaying in the output box will become the value of the firstNumber for next calculation.calculator.errormessage displayed if the value of secondNumber is 0.
        if (calculatorManager.results[calculatorManager.results.length - 1] === undefined)
        {
            calculatorUI.outputBox.innerText = "/ᐠ - ˕ -マ Can't didvide by 0";
            return;
        }
        updateFirstNumberValue();
        changeCurrentDisplayValue(operator);
        calculatorManager.changeState("enteringOperator");

        console.log(calculatorManager.currentDisplay);
        console.log(calculatorManager.currentSate);
    },
    onDeletionHandling: () => {
        deleteInputDisplay();
        if (calculatorManager.currentDisplay === "")
        {
            calculatorManager.currentDisplay = calculatorUI.inputBox.value.slice(-1);
            calculatorManager.changeState("enteringOperator");

            console.log(calculatorManager.currentSate);
            console.log(calculatorManager.currentDisplay);
        }
        updateOutputDisplay();
        
        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onClearAllHandling: () => {
        resetAll();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onNumberHandling: number => {
        if (checkFirstOnlyZero(calculatorManager.currentDisplay, number)) return;
        if (calculatorManager.currentDisplay.startsWith("-") && number === "00") number = "0"; 
        updateInputDisplay(number);
        calculatorManager.secondNumber = +calculatorManager.currentDisplay;
        displayResult();

        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onDecimalHandling: decimal => {
        if (checkPersistentDecimal(calculatorManager.currentDisplay)) return;
        updateInputDisplay(decimal);
        
        console.log(calculatorManager.currentSate);
        console.log(calculatorManager.currentDisplay);
    },
    onEqualHandling: () => {
        if (calculatorManager.results[calculatorManager.results.length - 1] === undefined)
        {
            calculatorUI.outputBox.innerText = "/ᐠ - ˕ -マ Can't didvide by 0";
            return;
        }
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
        updateFirstNumberValue();
        changeCurrentDisplayValue(operator);
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
    // Works but have bugs, need to fix
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

const calculatedDate = new Date();
// Functions

    // Input Handling Supports
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

    // Decimal Handling Supports
function fillPrefixDecimal()
{
    let prefixFilledDecimal = "0.";
    updateInputDisplay(prefixFilledDecimal);
}

function fillSuffixDecimal()
{
    let suffixFilledDecimal = "0";
    updateInputDisplay(suffixFilledDecimal);
}

function checkPersistentDecimal(tracker)
{
    if (tracker.includes(".")) return true;
    if (tracker === "-") 
    {
        fillPrefixDecimal();
        return true;
    }
    return false;
}

    // Reset Functions
function resetAll()
{
    resetInputOutputVisual();
    calculatorUI.inputBox.value = "";
    calculatorUI.outputBox.innerText = "";
    calculatorManager.currentDisplay = "";
    calculatorManager.firstNumber = null;
    calculatorManager.secondNumber = null;
    calculatorManager.operator = null;
    calculatorManager.changeState("idle");
    calculatorManager.results = [];
}

function resetDisplay()
{
    calculatorUI.inputBox.value = calculatorManager.results[calculatorManager.results.length - 1];
    calculatorUI.outputBox.innerText = "";
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

function changeCurrentDisplayValue(value)
{
    calculatorUI.inputBox.value += value;
    calculatorManager.currentDisplay = value;
}
        // Output
function updateOutputDisplay()
{
    calculatorManager.results.pop();
    if (calculatorManager.results.length === 0)
    {
        calculatorUI.outputBox.innerText = "";
        return;
    }
    calculatorUI.outputBox.innerText = calculatorManager.results[calculatorManager.results.length - 1];
}

function swapInputOutputVisual()
{
    calculatorUI.inputBox.setAttribute("style", "opacity: .5; font-size: 36px");
    calculatorUI.outputBox.setAttribute("style", "opacity: 1; font-size: 48px");
}
        // Result
function displayResult()
{
    calculateResult();
    if (calculatorManager.results[calculatorManager.results.length - 1] === undefined)
    {
        calculatorUI.outputBox.innerText = "";
        return;
    }
    calculatorUI.outputBox.innerText = calculatorManager.results[calculatorManager.results.length - 1];
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

    listItem.appendChild(itemCalculationValue);
    listItem.appendChild(itemResultValue);
    listItem.appendChild(itemDateValue);
    calculatorUI.recordsList.appendChild(listItem);
}

function createEmptyRecordsList()
{
    if (calculatorUI.recordsList.children.length > 0) return;
    const MESSAGE = "The record is empty, do some calculation to fill it ≽^•⩊•^≼"
    const emptyList = document.createElement("p");
    emptyList.classList.toggle("list-item");
    emptyList.setAttribute("style", "font-size: 26px; display: none");
    emptyList.innerText = MESSAGE;
    calculatorUI.recordsList.appendChild(emptyList);
}

    // Zero Handling Supports
function checkDividedByZero(number, operator)
{
    if (number === 0 && operator === "/") return true;
    else return false;
}

function checkFirstOnlyZero(tracker, number)
{
    if (!tracker.includes("."))
    {
        if ((tracker.startsWith("0") || tracker.startsWith("-0")) && number[0] === "0") 
        {
            return true;
        }
        return false;
    }
}

    // Arrays Handling Supports
function updateRecords()
{
    const record = {
        calculation: "",
        result: "",
        date: `${calculatedDate.getFullYear()}/${(calculatedDate.getMonth() + 1).toString().padStart(2, "0")}/${calculatedDate.getDate()}`,
    };
    record.calculation = calculatorUI.inputBox.value;
    record.result = calculatorManager.tempResult;
    calculatorManager.records.push(record);
    createRecordsListItem(record);

    console.log(calculatorManager.records);
}

function calculateResult()
{
    calculatorManager.tempResult = calculator[calculatorManager.operator](calculatorManager.firstNumber, calculatorManager.secondNumber);
    if (calculatorManager.tempResult === calculator.error) return;
    calculatorManager.results.push(calculatorManager.tempResult);
    updateRecords();
}

    //
function updateFirstNumberValue()
{
    calculatorManager.firstNumber = calculatorManager.results[calculatorManager.results.length - 1];
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