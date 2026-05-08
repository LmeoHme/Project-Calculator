const calculatorScreen = document.querySelector("#calculator-screen");
const outputBox = calculatorScreen.firstElementChild;
const inputBox = calculatorScreen.lastElementChild;

const buttons = document.querySelector("#buttons");

function invalidInputHandler()
{
    const EMPTY_STRING = "";
    const VALID_MULTIPLY = "x";

    const invalidInput = /[^0-9.+\-\*x\/]/g;
    const invalidMultiply = /\*/g;

    return () => {
        inputBox.value = inputBox.value
                            .replace(invalidInput, EMPTY_STRING)
                            .replace(invalidMultiply, VALID_MULTIPLY);
    };
}

const invalidInputHandling = invalidInputHandler();

inputBox.addEventListener("input", e => {
    e.preventDefault();
    invalidInputHandling();
});

buttons.addEventListener("click", e => {
    if (e.target && e.target.nodeName === "LI")
    {
        inputBox.value += e.target.innerText;
    }
});



// Align operator to center vertically needs adding a span element with display: inline-flex, will be 
// applied when implement EnteringOperator state