let display = '0';
let subdisplay = 'x';
let clearDisplay = false;
let historyString = '';
const displayEl = document.getElementById('display');
const subDisplayEl = document.getElementById('subdisplay');
const historyEl = document.getElementById('history');
updateDisplay();

function updateDisplay() {
    displayEl.innerText = display;
}

function toggleSubdisplay(show=true) {
    if (show) {
        subDisplayEl.innerText = '(' + subdisplay + ')';
        subDisplayEl.style.color = 'black';
    } else {
        subdisplay = 'x';
        subDisplayEl.style.color = 'white';
    }
}

function basicMathsOperation() {
    if (subdisplay === 'x') {
        return display;
    } else {
        const subvalue = subdisplay.split(" ")[0];
        const operator = subdisplay.split(" ")[1];
        return eval(`${subvalue} ${operator} ${display}`).toString();
    }
}

function buttonOperation(input) {
    if (isNaN(input)) {
        switch(input) {
            case 'CE':
                display = '0';
                historyString = '';
                toggleSubdisplay(false);
                break;
            case 'C':
                display = '0';
                break;
            case '+/-':
                display = Number(display * -1).toString();
                break;
            case '.':
                if (!display.includes('.')) {
                    display += '.';
                }
                break;
            case 'x2':
                display = Number(display * display).toString();
                break;
            case '1/x':
                display = Number(1 / display).toString();
                break;
            case '=':
                const lastBefore = display;
                display = basicMathsOperation();
                newHistoryString(lastBefore);
                toggleSubdisplay(false);
                clearDisplay = true;
                break;
            default:
                subdisplay = basicMathsOperation() + ` ${input} `;
                historyString += display + ` ${input} `;
                display = '0';
                toggleSubdisplay();
        }
    } else {
        if (display === '0' || clearDisplay) {
            display = input;
            clearDisplay = false;
        } else {
            display += input;
        }
    }
    updateDisplay();
}

function newHistoryString(num) {
    historyString += `${num} = ${display}`;
    const para = document.createElement("p");
    const node = document.createTextNode(`${historyString}`);
    para.appendChild(node);
    para.className = 'new_history';
    historyEl.appendChild(para);
    historyString = '';
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button =>
    button.addEventListener("click", function() {buttonOperation(button.innerText)}));
