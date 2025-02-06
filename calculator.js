const CONTAINER = document.querySelector('.container');
const DISPLAY = document.querySelector('.calculator__display');


const BTN_EQUAL = CONTAINER.querySelector('#equal');
const DISPLAY__RESULT = DISPLAY.querySelector('.display__result');
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
    if(DISPLAY__RESULT.textContent.length > 0){
        const SAVE = DISPLAY__RESULT.textContent.slice(0, -1);
        console.log(SAVE);
        DISPLAY__RESULT.textContent = SAVE;
        if(operator === '') firstOperand = SAVE;
        else secondOperand = SAVE;
        if(DISPLAY__RESULT.textContent.includes('.')){
            BTN__DECIMAL.disabled = true;
        }
        else {
            BTN__DECIMAL.disabled = false;
        }  
    }
    if (DISPLAY__RESULT.textContent.length === 0){
        DISPLAY__RESULT.textContent = '0';
    }
});

BTN__CLEAR.addEventListener('click', function() {
    DISPLAY__RESULT.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
});

// 1st alternative
/* CONTAINER.addEventListener('click', function (e) {
let result = '';
const DISPLAY__OPERATIONS = DISPLAY.querySelector('.display__operations');

    for(let i = 0; i < BTN__NODELIST.length; i++) {
        if(e.target === BTN__NODELIST[i]) {
            if(DISPLAY__OPERATIONS.textContent.startsWith('0')){
                result = BTN__NODELIST[i].textContent; 
                console.log(result);
                DISPLAY__OPERATIONS.textContent = BTN__NODELIST[i].textContent;
            }
            else{
                result += BTN__NODELIST[i].textContent; 
                console.log(result);
                DISPLAY__OPERATIONS.textContent += BTN__NODELIST[i].textContent;
            }
            if(result.includes('.') && !(result.includes('+') || result.includes('×') || result.includes('÷')  || result.includes('-') )){
                BTN__DECIMAL.disabled = true;
            }
            else {
                BTN__DECIMAL.disabled = false;
            }
        }
    }

    for(let i = 0; i < OPERATORS.length; i++) {
        if(e.target === OPERATORS[i]) {

            if(OPERATORS[i].textContent !== '=' && OPERATORS[i].textContent !== ''){
                if(operatorCount === 0){
                    result += `${OPERATORS[i].textContent}`;
                    console.log(result);
                    DISPLAY__OPERATIONS.textContent += OPERATORS[i].textContent;
                    operatorCount++;
                }
                else {
                    if(result.includes('÷')){
                        result = result.replace('÷', '/');
                        DISPLAY__RESULT.textContent = `${Math.round(eval(result))}`;
                    }  
                    if(result.includes('×')){
                        result = result.replace('×', '*');
                        DISPLAY__RESULT.textContent = eval(result);
                    }
                    else{
                        DISPLAY__RESULT.textContent = eval(result);
                        result = `${eval(result)}${OPERATORS[i].textContent}`;
                        DISPLAY__OPERATIONS.textContent = result;
                    }
                }
            }

            if(OPERATORS[i].textContent === '='){
                if(result.includes('÷')){
                    result = result.replace('÷', '/');
                }  
                if(result.includes('×')){
                    result = result.replace('×', '*');
                }
                if(DISPLAY__OPERATIONS.textContent === '0'){
                    DISPLAY__RESULT.textContent = '0';
                }
                if(!result.includes('÷')) {
                    DISPLAY__RESULT.textContent = (+eval(result)).toFixed(9);
                    console.log((+eval(result)));
                    DISPLAY__OPERATIONS.textContent = (+eval(result)).toFixed(9);
                    result = `${eval(result)}`;
                }
                else{
                    DISPLAY__RESULT.textContent = eval(result);
                    DISPLAY__OPERATIONS.textContent = eval(result);
                    result = `${eval(result)}`;
                }
            }

        }
    }
}); */

// 2nd alternative
function operate (firstOperand, secondOperand, operator){
    switch(operator){
        case '+':
            return eval(firstOperand + secondOperand);
        case '-':
            return eval(firstOperand - secondOperand);
        case '×':
            return eval(firstOperand * secondOperand);
        case '÷':
            if(secondOperand === 0) return 'Error';
            const RESULT = `${eval(firstOperand / secondOperand)}`
            if(RESULT.length > 9) return Math.round(RESULT);
            return RESULT;
    }   
}

CONTAINER.addEventListener('click', function (e) {

    for(let i = 0; i < BTN__NODELIST.length; i++) {
        if(e.target === BTN__NODELIST[i]) {
            if(firstOperand.startsWith('0')){
                firstOperand = BTN__NODELIST[i].textContent;
                console.log(firstOperand);
                DISPLAY__RESULT.textContent = firstOperand
            }
            if(pressedEqual) {
                firstOperand = BTN__NODELIST[i].textContent;
                DISPLAY__RESULT.textContent = firstOperand;
                pressedEqual = false;
            }
            else if(operator === ''){ 
                firstOperand += BTN__NODELIST[i].textContent;
                DISPLAY__RESULT.textContent = firstOperand;
            }
            if(operator !== ''){
                if(secondOperand.startsWith('0')){
                    secondOperand = BTN__NODELIST[i].textContent;
                    console.log(secondOperand);
                    DISPLAY__RESULT.textContent = secondOperand;
                }
               else {
                secondOperand += BTN__NODELIST[i].textContent;
                console.log(secondOperand);
                DISPLAY__RESULT.textContent = secondOperand;
               }
            }
            if(firstOperand.includes('.') && secondOperand === '' || firstOperand.includes('.') && secondOperand.includes('.')) 
                BTN__DECIMAL.disabled = true;
            else BTN__DECIMAL.disabled = false; 
        }
    }

    for(let i = 0; i < OPERATORS.length; i++) {
        if(firstOperand !== ''){
            if(e.target === OPERATORS[i]) {
                if(OPERATORS[i].textContent !== '=' && OPERATORS[i].textContent !== ''){
                    if(operator === '' && secondOperand ===''){
                        console.log('here')
                        pressedEqual = false;
                        operator = OPERATORS[i].textContent;
                    }
                    else{
                        console.log('here')
                        pressedEqual = false;
                        DISPLAY__RESULT.textContent = `${operate(+firstOperand, +secondOperand, operator)}`;
                        firstOperand = `${operate(+firstOperand, +secondOperand, operator)}`;
                        secondOperand = '';
                        operator = '';
                        operator = OPERATORS[i].textContent;
                    }
                }
                else if(OPERATORS[i].textContent === '='){
                    if(secondOperand === '0' && operator === '÷'){
                        CONTAINER.toggle;
                    }
                    if(operator === '' && firstOperand !== ''){
                        DISPLAY__RESULT.textContent = firstOperand;
                        pressedEqual = true;
                    }
                    else{
                        DISPLAY__RESULT.textContent = `${operate(+firstOperand, +secondOperand, operator)}`;
                        firstOperand = DISPLAY__RESULT.textContent;
                        secondOperand = '';
                        operator = '';
                        pressedEqual = true;
                    }
                }
    
            }
        }
    }
});