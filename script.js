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

const buttons = {
    clear: clearAll,
    backspace: deleteLast,
    "=" : calculateResult
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
    let ans = separeteString(expression);
    while(ans.length > 1) {
        const firstDigit = ans.shift();
        const operator = ans.shift();
        const secondDigit = ans.shift();
        const result = operations[operator](firstDigit, secondDigit);
        if (result === Infinity) {
            display.textContent = "Cheeky, you can't do that.";
            return;
        }
        ans.unshift(result);
    }
    display.textContent = ans.pop();
}

function separeteString(string) {
    let arr = [];
    let number = "";
    for (let i = 0; i < string.length; i++) {
        if (numbers.includes(Number(string[i]))) number += string[i];
        else {
            arr.push(number);
            number = "";
            arr.push(string[i]);
        }
    }
    arr.push(number);
    return arr;
}

// const string = "45+37/5+3";
// console.log(separeteString(string));


//TODO: use reduce when evaluation expression