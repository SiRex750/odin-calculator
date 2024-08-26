function add (x, y) {
    let sum = 0;
    sum = x + y;
    if (sum % 1 !== 0) {
        return sum.toFixed(3);
    }
    else {
        return sum;
    }
    
}

function subtract (x, y) {
    let difference = 0;
    difference = x - y;
    if (difference % 1 !== 0) {
        return difference.toFixed(3);
    }
    else {
        return difference;
    }
}

function multiply (x, y) {
    let product = 0;
    product = x * y;
    if (product % 1 !== 0) {
        return product.toFixed(3);
    }
    else {
        return product;
    }
}

function divide (x, y) {
    let quotient = 0;
    quotient = x / y;
    if (quotient % 1 !== 0) {
        return quotient.toFixed(3);
    }
    else {
        return quotient;
    }
}

function percent (x, y) {
    let percentage = 0;
    percentage = x/100 * y;
    if (percentage % 1 !== 0) {
        return percentage.toFixed(3);
    }
    else {
        return percentage;
    }
}

let num1 = 0, num2 = 0, op = '', opSymbol = '', c = 0, k = 0, dec = 0;
let operation = "", display = "", history = "", solution = "";
let opArray = [];

function operate (n1, n2, o) {
    if (o === 'a') {
        return add (n1, n2);
    }
    if (o === 's') {
        return subtract (n1, n2);
    }
    if (o === 'm') {
        return multiply (n1, n2);
    }
    if (o === 'd') {
        return divide (n1, n2);
    }
    if (o === 'p') {
        return percent (n1, n2);
    }
}

const nums = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.op');
const eq = document.querySelector("#equals");
const ac = document.querySelector("#AC");
const del = document.querySelector("#DEL");
const sign = document.querySelector("#sign");
const curDisplay = document.querySelector(".current span");
const hisDisplay = document.querySelector(".history span");

function handleNumsClick (event) {
    const keyValue = event.target.textContent;
    handleNums (keyValue);
}

function handleOpsClick (event) {
    const keyValue = event.target.textContent;
    handleOps (keyValue);
}

function handleEqClick (event) {
    handleEq();
}

function handleACClick (event) {
    handleAC ();
}

function handleDELClick (event) {
    handleDEL();
} 

function handleSignClick (event) {
    handleSign();
}

function handleNums (keyValue) {
    if(k === 1) {
        k = 0;
        display = "";
    }
    if (dec !== 1 || keyValue !== '.') {
        if (display.length < 9) {
            display += `${keyValue}`
            operation += `${keyValue}`
            curDisplay.textContent = display;
        }
    }
    if (keyValue === ".") {
        dec = 1;
    }
}

function handleOps (keyValue) {
    switch(opSymbol) {
        case '+':
            op = 'a';
            break;
        case '-':
            op = 's';
            break;
        case '×':
            op = 'm';
            break;
        case '÷':
            op = 'd';
            break;
        case '%':
            op = 'p';
            break;
    }
    opArray[c] = display;
    display = "";
    if (c === 1) {
        solution = String(operate(Number(opArray[0]), Number(opArray[1]), op));
        console.log(solution.length);
        if (solution.length > 9) {
            solution = String(Number(opArray[0]).toExponential(2));
        }
        opArray[0] = solution;
        opArray[1] = "";
        c = 0;
        display = opArray[0];
        k = 1;
    }
    c++;
    operation += `${keyValue}`
    opSymbol = keyValue;
    curDisplay.textContent = display;
    history = `${opArray[0]}${opSymbol}`;
    hisDisplay.textContent = history;
}

function handleEq () {
    opArray[c] = display;
    switch(opSymbol) {
        case '+':
            op = 'a';
            break;
        case '-':
            op = 's';
            break;
        case '×':
            op = 'm';
            break;
        case '÷':
            op = 'd';
            break;
        case '%':
            op = 'p';
            break;
    }
    history = `${history}${opArray[1]}`;
    solution = String(operate(Number(opArray[0]), Number(opArray[1]), op));
        if (solution.length > 9) {
            solution = String(Number(opArray[0]).toExponential(2));
        }
        opArray[0] = solution;
    opArray[1] = "";
    c = 0;
    display = opArray[0];
    k = 1;
    op = "";
    history = `${history}=${opArray[0]}`;
    operation = "";
    opArray[0] = ""; 
    curDisplay.textContent = display;
    hisDisplay.textContent = history;
}

function handleAC () {
    history = "";
    opArray = [];
    display = "";
    operation = "";
    op = "";
    opSymbol = "";
    c = 0;
    k = 0;
    curDisplay.textContent = display;
    hisDisplay.textContent = history;
}

function handleDEL () {
    if (display !== "") {
        display = display.slice(0, -1);
        operation = operation.slice(0, -1);
        curDisplay.textContent = display;
    }
}

function handleSign () {
    if (display[0] !== "-") {
        display = "-" + display;
    }
    else {
        display = display.slice(1);
    }
    curDisplay.textContent = display;
}

nums.forEach(num => {
    num.addEventListener('click', handleNumsClick);
});

ops.forEach(op => {
    op.addEventListener('click', handleOpsClick);
});

eq.addEventListener('click', handleEqClick);

ac.addEventListener('click', handleACClick);

del.addEventListener('click', handleDELClick);

sign.addEventListener('click', handleSignClick);

document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        handleNums(key);
    } else if (key === '+') {
        handleOps('+');
    } else if (key === '-') {
        handleOps('-');
    } else if (key === '*') {
        handleOps('×');
    } else if (key === '/') {
        handleOps('÷'); 
    } else if (key === '%') {
        handleOps('%');
    } else if (key === 'Enter' || key === '=') {
        handleEq();
    } else if (key === 'Delete') {
        handleAC();
    } else if (key === 'Backspace') {
        handleDEL();
    } else if (key === 'Control') {
        handleSign();
    } else if (key === '.') {
        handleNums(".");
    }
}



