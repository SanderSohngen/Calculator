function operate(a, operator, b) { return operations[operator](a, b); }

const operations = {
    "+": addNumbers,
    "-": subtractNumbers,
    "*": multiplyNumbers,
    "/": divideNumbers,
    ".": concatNumbers,
}

function addNumbers(a, b) { return Number(a) + Number(b); }
function subtractNumbers(a, b) {return Number(a) - Number(b); }
function multiplyNumbers(a, b) { return Number(a) * Number(b); }
function divideNumbers(a, b) { return Number(a) / Number(b); }
function concatNumbers(a, b) {return Number(a + "." + b); }

let display = document.querySelector("#result");

const calculator = document.querySelector("#calculator");
calculator.addEventListener("click", event => {
    const keyID = event.target.id;
    if (buttons[keyID]) buttons[keyID](keyID);
})
document.addEventListener("keydown", event => {
    const keyID = event.key;
    if (buttons[keyID]) buttons[keyID](keyID);
})

const buttons = {
    clear: clearAll,
    backspace: deleteLast,
    "=" : calculateResult,
    Enter : calculateResult
};
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const operators = ["+", "-", "*", "/", "."]
const keys = [...numbers, ...operators];
keys.forEach(key => buttons[key] = inputKey);

function clearAll(keyID) { display.textContent = 0}
function deleteLast(keyID) { display.textContent = display.textContent.split("").slice(0, -1).join(""); }
function inputKey(keyID) {
    display.textContent = display.textContent == 0 ? keyID : display.textContent + keyID;
}

function calculateResult(keyID) {
    const expression = display.textContent;
    const formatedExpression = formatString(expression);
    const answer = getResult(formatedExpression);
    display.textContent = answer;
}

function formatString(expression) {
    let formated = [];
    let number = "";
    for (let i = 0; i < expression.length; i++) {
        if (numbers.includes(Number(expression[i]))) number += expression[i];
        else {
            formated.push(number);
            number = "";
            formated.push(expression[i]);
        }
    }
    formated.push(number);
    return formated;
}

function getResult (formatedExpression) {
    let ans = formatedExpression
    while(ans.length > 1) {
        const firstDigit = ans.shift();
        const operator = ans.shift();
        const secondDigit = ans.shift();
        const result = operations[operator](firstDigit, secondDigit);
        if (!Number.isFinite(result)) return "Cheeky, you can't do that.";
        ans.unshift(result);
    }
    return ans.pop()
}
