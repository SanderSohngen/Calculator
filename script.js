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




//TODO: use reduce when evaluation expression