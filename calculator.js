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

    console.log(firstOperand, secondOperand, operator)
});

BTN__CLEAR.addEventListener('click', function() {
    DISPLAY__RESULT.textContent = '0';
    DISPLAY__OPERATIONS.textContent = '0';  
    BTN__DECIMAL.disabled = false; 
    firstOperand = '';
    secondOperand = '';
    operator = '';
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
            const RESULT_ADD = `${eval(firstOperand + secondOperand)}`;
            if(RESULT_ADD.length > 10) {
                if(+RESULT_ADD < 0) return Math.floor(+RESULT_ADD);
                else return Number((+RESULT_ADD).toFixed(10));
            };
            return RESULT_ADD;
        case '-':
            const RESULT_SUB = `${eval(firstOperand - secondOperand)}`;
            if(RESULT_SUB.length > 10) {
                if(+RESULT_SUB < 0) return Math.floor(+RESULT_SUB);
                else return Number((+RESULT_SUB).toFixed(10));
            };
            return RESULT_SUB;
        case '×' || '*':
            const RESULT_MUL = `${eval(firstOperand * secondOperand)}`;
            if(RESULT_MUL.length > 10) return Number((+RESULT_MUL).toFixed(10));
            return RESULT_MUL;
        case '÷' || '/':
            const RESULT = `${eval(firstOperand / secondOperand)}`;
            if(RESULT.length > 10) return Number((+RESULT).toFixed(10));
            return RESULT;
    }   
}

CONTAINER.addEventListener('click', function (e) {
    for(let i = 0; i < BTN__NODELIST.length; i++) {
        if(e.target === BTN__NODELIST[i]) {
            if(firstOperand.startsWith('0') && firstOperand.length === 1){
                console.log('here');
                firstOperand = BTN__NODELIST[i].textContent;
                console.log(firstOperand);
                console.log(DISPLAY__OPERATIONS.textContent);
                DISPLAY__OPERATIONS.textContent = firstOperand
                console.log(DISPLAY__OPERATIONS.textContent);
            }
            if(pressedEqual && firstOperand.length < 10) {
                console.log('here');
                firstOperand = BTN__NODELIST[i].textContent;
                DISPLAY__OPERATIONS.textContent = firstOperand;
                pressedEqual = false;
            }
            else if(operator === '' && firstOperand.length < 10){ 
                console.log('here');
                console.log(firstOperand);
                console.log(DISPLAY__OPERATIONS.textContent);
                if(BTN__NODELIST[i].textContent === '.' && firstOperand.length === 0) firstOperand = '0.'
                else firstOperand += BTN__NODELIST[i].textContent;
                console.log(firstOperand);
                DISPLAY__OPERATIONS.textContent = firstOperand;
                console.log(DISPLAY__OPERATIONS.textContent);
            }
            if(operator !== '' && secondOperand.length < 10){
                console.log('here');
                if(secondOperand.startsWith('0')){
                    secondOperand = BTN__NODELIST[i].textContent;
                    DISPLAY__OPERATIONS.textContent += BTN__NODELIST[i].textContent;
                    console.log(DISPLAY__OPERATIONS.textContent);
                }
               else {
                secondOperand += BTN__NODELIST[i].textContent;
                console.log(secondOperand);
                DISPLAY__OPERATIONS.textContent += BTN__NODELIST[i].textContent;
                console.log(DISPLAY__OPERATIONS.textContent);
               }
            }
            if(firstOperand.includes('.') && secondOperand === '' || (firstOperand.includes('.') && secondOperand.includes('.')))  BTN__DECIMAL.disabled = true;
            else BTN__DECIMAL.disabled = false; 
            console.log(firstOperand.length)
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
                    if(operator === '' && secondOperand === ''){
                        pressedEqual = false;
                        operator = OPERATORS[i].textContent;
                        DISPLAY__OPERATIONS.textContent += operator;
                    }
                    else if(operator !== '' && secondOperand === ''){
                        pressedEqual = false;
                        operator = OPERATORS[i].textContent;
                        const CHANGE__OPERATOR = DISPLAY__OPERATIONS.textContent.slice(0, -1);
                        DISPLAY__OPERATIONS.textContent = CHANGE__OPERATOR + operator; 
                    }   
                    else{
                        pressedEqual = false;
                        DISPLAY__RESULT.textContent = `${operate(+firstOperand, +secondOperand, operator)}`;
                        firstOperand = `${operate(+firstOperand, +secondOperand, operator)}`;
                        secondOperand = '';
                        operator = OPERATORS[i].textContent;
                        DISPLAY__OPERATIONS.textContent += operator; 
                    }
                }
                else if(OPERATORS[i].textContent === '='){
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