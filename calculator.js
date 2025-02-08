const CONTAINER = document.querySelector('.container');
const DISPLAY = document.querySelector('.calculator__display');


const BTN_EQUAL = CONTAINER.querySelector('#equal');
const DISPLAY__RESULT = DISPLAY.querySelector('.display__result');
const DISPLAY__OPERATIONS = DISPLAY.querySelector('.display__operations');
const BTN__NODELIST = CONTAINER.querySelectorAll('.btn');
const OPERATORS = CONTAINER.querySelectorAll('.key--operator');
const BTN__DELETE = CONTAINER.querySelector('#delete');
const BTN__CLEAR = CONTAINER.querySelector('#clear');
const BTN__DECIMAL = CONTAINER.querySelector('#btn-dot');


let firstOperand = '';
let secondOperand = '';
let operator = '';
let pressedEqual = false;

    
BTN__DELETE.addEventListener('click', function() {
    if(DISPLAY__OPERATIONS.textContent.length > 0){
        let lastString = DISPLAY__OPERATIONS.textContent.slice(-1);
        const SAVE = DISPLAY__OPERATIONS.textContent.slice(0, -1);
        if(lastString === '+' || lastString === '-' || lastString === '×' || lastString === '÷'){
            operator = '';
        }
        if(SAVE.endsWith('+') || SAVE.endsWith('-') || SAVE.endsWith('×') || SAVE.endsWith('÷')){
            secondOperand = '';
        }
        if(operator === '') firstOperand = SAVE;
        else secondOperand = SAVE.slice(firstOperand.length + 1);
        DISPLAY__OPERATIONS.textContent = SAVE;
        
        if(firstOperand.includes('.') && secondOperand === '' || firstOperand.includes('.') && secondOperand.includes('.')) 
            BTN__DECIMAL.disabled = true;
        else BTN__DECIMAL.disabled = false;  
    }
    if (DISPLAY__OPERATIONS.textContent.length === 0){
        DISPLAY__OPERATIONS.textContent = '0';
    }
});

BTN__CLEAR.addEventListener('click', function() {
    DISPLAY__RESULT.textContent = '0';
    DISPLAY__OPERATIONS.textContent = '0';  
    BTN__DECIMAL.disabled = false; 
    firstOperand = '';
    secondOperand = '';
    operator = '';
});

function operate (firstOperand, secondOperand, operator){
    switch(operator){
        case '+':
            const RESULT_ADD = `${(+firstOperand + +secondOperand)}`;
            if(RESULT_ADD.length > 10) {
                if(+RESULT_ADD < 0) return Math.floor(+RESULT_ADD);
                else return Number((+RESULT_ADD).toFixed(10));
            };
            return RESULT_ADD;
        case '-':
            const RESULT_SUB = `${(+firstOperand - +secondOperand)}`;
            if(RESULT_SUB.length > 10) {
                if(+RESULT_SUB < 0) return Math.floor(+RESULT_SUB);
                else return Number((+RESULT_SUB).toFixed(10));
            };
            return RESULT_SUB;
        case '×' || '*':
            console.log('here');
            const RESULT_MUL = `${(firstOperand * secondOperand)}`;
            if(RESULT_MUL.length > 10) return Number((+RESULT_MUL).toFixed(10));
            return RESULT_MUL;
        case '÷' || '/':
            console.log('here');
            const RESULT = `${(firstOperand / secondOperand)}`;
            if(RESULT.length > 10) return Number((+RESULT).toFixed(10));
            return RESULT;
    }   
}


function fillfirstOperand(index) {
    let value = BTN__NODELIST[index].textContent;

    if (firstOperand === "0" && value !== ".") {
        firstOperand = value; 
    } else if (pressedEqual) {
        firstOperand = value;
        pressedEqual = false;
    } else if (operator === "" && firstOperand.length < 10) {
        firstOperand += value;
    }

    // Remove leading 
    firstOperand = firstOperand.replace(/^0+(?=\d)/, "");
    DISPLAY__OPERATIONS.textContent = firstOperand;
}

function fillSecondOperand(index) {
    let value = BTN__NODELIST[index].textContent;

    if (operator !== "" && secondOperand.length < 10) {
        if (secondOperand === "0" && value !== ".") {
            secondOperand = value; 
        } else {
            secondOperand += value;
        }
    }

    // Remove leading
    secondOperand = secondOperand.replace(/^0+(?=\d)/, "");
    DISPLAY__OPERATIONS.textContent += operator + secondOperand;
}

function addSelectedOperatorBeforeCallingOperate(index){
    if(operator === '' && secondOperand === ''){
        pressedEqual = false;
        operator = OPERATORS[index].textContent;
        DISPLAY__OPERATIONS.textContent += operator;
    }
    else if(operator !== '' && secondOperand === ''){
        pressedEqual = false;
        operator = OPERATORS[index].textContent;
        const CHANGE__OPERATOR = DISPLAY__OPERATIONS.textContent.slice(0, -1);
        DISPLAY__OPERATIONS.textContent = CHANGE__OPERATOR + operator; 
    }   
    else{
        pressedEqual = false;
        DISPLAY__RESULT.textContent = `${operate(+firstOperand, +secondOperand, operator)}`;
        if(DISPLAY__RESULT.textContent.length >=10) DISPLAY__RESULT.style.fontSize = '1.5em'
        if(DISPLAY__RESULT.textContent.length >=15) DISPLAY__RESULT.style.fontSize = '1.2em'
        firstOperand = `${operate(+firstOperand, +secondOperand, operator)}`;
        DISPLAY__OPERATIONS.textContent = firstOperand
        secondOperand = '';
        operator = OPERATORS[index].textContent;
        DISPLAY__OPERATIONS.textContent += operator; 
    }
}

function callOperateWhenPressedOnEqualBtn(){
    if(operator === '' && firstOperand !== ''){
        DISPLAY__RESULT.textContent = firstOperand;
        pressedEqual = true;
    }
    else{
        console.log('here');
        DISPLAY__RESULT.textContent = `${operate(+firstOperand, +secondOperand, operator)}`;
        console.log(DISPLAY__RESULT.textContent);
        if(DISPLAY__RESULT.textContent.length >=10) DISPLAY__RESULT.style.fontSize = '1.5em'
        if(DISPLAY__RESULT.textContent.length >=15) DISPLAY__RESULT.style.fontSize = '1.2em'
        console.log(firstOperand);
        firstOperand = DISPLAY__RESULT.textContent;
        console.log(firstOperand);
        console.log(DISPLAY__OPERATIONS.textContent);
        DISPLAY__OPERATIONS.textContent = DISPLAY__RESULT.textContent;
        console.log(DISPLAY__OPERATIONS.textContent);
        secondOperand = '';
        operator = '';
        pressedEqual = true;
    }
}

CONTAINER.addEventListener('click', function (e) {
    for(let i = 0; i < BTN__NODELIST.length; i++) {
        if(e.target === BTN__NODELIST[i]) {
            fillfirstOperand(i); 
            fillSecondOperand(i); 
            if(firstOperand.includes('.') && secondOperand === '' || 
                (firstOperand.includes('.') && secondOperand.includes('.')))  BTN__DECIMAL.disabled = true;
            else BTN__DECIMAL.disabled = false; 
        }
    }

    for(let i = 0; i < OPERATORS.length; i++) {
        if(secondOperand === '0' && secondOperand.length === 1  && operator === '÷'){
            document.getElementById('error-message').style.display = 'block';
            setTimeout(() => {document.getElementById('error-message').style.display = 'none';}, 3000);
            
        }
        else if(firstOperand !== ''){
            if(e.target === OPERATORS[i]) {
                if(OPERATORS[i].textContent !== '=' && OPERATORS[i].textContent !== ''){
                   addSelectedOperatorBeforeCallingOperate(i) 
                }
                else if(OPERATORS[i].textContent === '='){
                    callOperateWhenPressedOnEqualBtn();
                }
    
            }
        }
    }
});

document.addEventListener('keydown', (event) => {
    const OPERATORS = ['+', '-', '/', '*'];
    const key = event.key;

    // Allow only numbers, operators, Enter, Backspace, and Escape
    if (/[\d+\-*/]/.test(key)) {
        if(DISPLAY__OPERATIONS.textContent.startsWith('0')) DISPLAY__OPERATIONS.textContent = key;
        else DISPLAY__OPERATIONS.textContent += key;
        if (key === '+' || key === '-' || key === '/' 
            || key === '*') {
                firstOperand = DISPLAY__OPERATIONS.textContent.slice(0, DISPLAY__OPERATIONS.textContent.length - 1);
                operator = key;
            }
        else {
           if(operator !== ''){
            secondOperand = DISPLAY__OPERATIONS.textContent.slice(DISPLAY__OPERATIONS.textContent.indexOf(operator) + 1).replace(/^0+(?=\d)/, "");
            DISPLAY__OPERATIONS.textContent = firstOperand + operator + secondOperand;
           }
        }
    } else if (key === "Enter") {
        if(operator === '/' || operator === '*'){
            if(operator === '*'){
                const RESULT_MUL = `${(firstOperand * secondOperand)}`;
                DISPLAY__RESULT.textContent = RESULT_MUL;
                DISPLAY__OPERATIONS.textContent = RESULT_MUL;
                if(DISPLAY__RESULT.textContent.length >=10) DISPLAY__RESULT.style.fontSize = '1.5em'
                if(DISPLAY__RESULT.textContent.length >=15) DISPLAY__RESULT.style.fontSize = '1.2em'
            }
            else {
                const RESULT_DIV = `${(firstOperand / secondOperand)}`;
                DISPLAY__RESULT.textContent = RESULT_DIV;
                DISPLAY__OPERATIONS.textContent = RESULT_DIV;
                if(DISPLAY__RESULT.textContent.length >=10) DISPLAY__RESULT.style.fontSize = '1.5em'
                if(DISPLAY__RESULT.textContent.length >=15) DISPLAY__RESULT.style.fontSize = '1.2em'
            }
        }
        else callOperateWhenPressedOnEqualBtn();
    } else if (key === "Backspace") {
        const SAVE = DISPLAY__OPERATIONS.textContent.slice(0, -1);
        DISPLAY__OPERATIONS.textContent = SAVE.length === 0? '0' : SAVE;
        if(!(key === '+' || key === '-' || key === '/' 
            || key === '*')) firstOperand = SAVE;
        else {
            let op;
            let i;
            OPERATORS.map((operand, index) =>{
                if(DISPLAY__OPERATIONS.textContent.includes(operand)) {
                    op = operand;
                    i = index;
                }
            })
            operator = op;
            secondOperand = DISPLAY__OPERATIONS.textContent.slice(firstOperand.length + 1);
        }
    } else if (key === "Escape") {
        DISPLAY__RESULT.textContent = '0';
        DISPLAY__OPERATIONS.textContent = '0';  
        BTN__DECIMAL.disabled = false; 
        firstOperand = '';
        secondOperand = '';
        operator = '';
    } 
    // Prevent function keys (F1-F12) and other unwanted keys
    else if (event.key.startsWith("F") || event.ctrlKey || event.altKey) {
        event.preventDefault();
    }
  });