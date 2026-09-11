const mainSection = document.getElementById("main-section");
const themeSlider = document.getElementById("themeSlider");
const toggleTrigBtn = document.getElementById("toggleTrig");
const trigPanel = document.getElementById("trigPanel");
const trigBtns = document.querySelectorAll("[data-trig]");

toggleTrigBtn.addEventListener('click', () => {
    trigPanel.classList.toggle('d-none');
});

themeSlider.addEventListener('input', (event) => {
    const themeValue = event.target.value;
    if (themeValue === "0") {
        mainSection.setAttribute("data-theme", "blue");
    } else if (themeValue === "1") {
        mainSection.setAttribute("data-theme", "white");
    }
    else if (themeValue === "2") {
        mainSection.setAttribute("data-theme", "purple");
    }
});

// Logic of the calc
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const screen = document.getElementById("calc-screen");
const numBtns = document.querySelectorAll("[data-num]");
const opBtns = document.querySelectorAll("[data-op]");
const btnEqual = document.getElementById("btn-equal");
const btnReset = document.getElementById("btn-reset");
const btnDel = document.getElementById("btn-del");

function updateDisplay() {
    screen.innerText = formatNumber(currentOperand);
}

function formatNumber(numStr) {
    if (numStr === '-' || numStr === '') return numStr;
    const parts = numStr.toString().split('.');
    let integerPart = parseFloat(parts[0]);
    
    if (isNaN(integerPart)) return '';
    let formattedInteger = integerPart.toLocaleString('en-US', { maximumFractionDigits: 0 });
    
    if (parts[1] !== undefined) {
        return `${formattedInteger}.${parts[1]}`;
    }
    return formattedInteger;
}

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        const val = button.getAttribute('data-num');
        if (val === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && val !== '.') {
            currentOperand = val;
        } else {
            currentOperand += val;
        }
        updateDisplay();
    });
});

opBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculate();
        }
        operation = button.getAttribute('data-op');
        previousOperand = currentOperand;
        currentOperand = '0'; // Restarts it visually for the next num
    });
});

btnDel.addEventListener('click', () => {
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
});

btnReset.addEventListener('click', () => {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
});

btnEqual.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case 'x': result = prev * curr; break;
        case '/': 
            if (curr === 0) { alert("Cannot divide by zero"); return; }
            result = prev / curr; 
            break;
        default: return;
    }
    currentOperand = result.toString();
    operation = undefined;
    previousOperand = '';
}

trigBtns.endswith = trigBtns.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.getAttribute('data-trig');
        let val = parseFloat(currentOperand);
        if (isNaN(val)) return;

        // We convert from degreed ro radians because teh functions work with radians
        const radians = val * (Math.PI / 180);

        switch(func) {
            case 'sin': currentOperand = Math.sin(radians).toFixed(6); break;
            case 'cos': currentOperand = Math.cos(radians).toFixed(6); break;
            case 'tan': currentOperand = Math.tan(radians).toFixed(6); break;
            case 'sqrt': 
                if (val < 0) { alert("Invalid input"); return; }
                currentOperand = Math.sqrt(val).toFixed(6); 
                break;
        }
        updateDisplay();
    });
});