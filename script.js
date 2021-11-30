function operate(operator, a, b) { return operations[operator](a, b); }

const operations = {
    "+": addNumbers,
    "-": subtractNumbers,
    "*": multiplyNumbers,
    "/": divideNumbers,
}

function addNumbers(a, b) { return a + b; }
function subtractNumbers(a, b) {return a - b; }
function multiplyNumbers(a, b) { return a * b; }
function divideNumbers(a, b) { return a / b; }

let result = document.querySelector("#result");

const buttons = {
    clear: clearAll,
    backspace: deleteLast,
    // "=" : calculateResult
};
const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "*", "/", "."];
keys.forEach(key => buttons[key] = inputKey);


function clearAll(keyID) { result.textContent = 0}
function deleteLast(keyID) { result.textContent = result.textContent.split("").slice(0, -1).join(""); }
function inputKey(keyID) { 
    result.textContent = result.textContent == 0 ? keyID : result.textContent + keyID;
}

const calculator = document.querySelector("#calculator");
calculator.addEventListener("click", event => {
    const keyID = event.target.id;
    buttons[keyID](keyID);
})


//TODO: use reduce when evaluation expression