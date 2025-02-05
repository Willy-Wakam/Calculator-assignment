const CONTAINER = document.querySelector('.container');
const DISPLAY = document.querySelector('.calculator__display');


let result = '';
let operatorCount = 0;
const BTN_EQUAL = CONTAINER.querySelector('#equal');
const DISPLAY__OPERATIONS = DISPLAY.querySelector('.display__operations');
const DISPLAY__RESULT = DISPLAY.querySelector('.display__result');
const BTN__NODELIST = CONTAINER.querySelectorAll('.btn');
const OPERATORS = CONTAINER.querySelectorAll('.key--operator');
const BTN__DELETE = CONTAINER.querySelector('#delete');
const BTN__CLEAR = CONTAINER.querySelector('#clear');

    
BTN__DELETE.addEventListener('click', function() {
    if(result.length > 0){
        let a = result.slice(result.length - 1, -1);
        result = a;
        if(result.length === 0){
            DISPLAY__OPERATIONS.textContent = '0';
        }
        else DISPLAY__OPERATIONS.textContent = result;
    }
});

BTN__CLEAR.addEventListener('click', function() {
    DISPLAY__OPERATIONS.textContent = '0';
    DISPLAY__RESULT.textContent = '';
    result = '';
});

CONTAINER.addEventListener('click', function (e) {

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
                    console.log(`${Math.round(eval(result))}`)
                    DISPLAY__RESULT.textContent = `${Math.round(eval(result))}`;
                }  
                if(result.includes('×')){
                    result = result.replace('×', '*');
                    DISPLAY__RESULT.textContent = eval(result);
                }
                if(DISPLAY__OPERATIONS.textContent === '0'){
                    DISPLAY__RESULT.textContent = '0';
                }
                else {
                    DISPLAY__RESULT.textContent = eval(result);
                    DISPLAY__OPERATIONS.textContent = eval(result);
                    result = `${eval(result)}`;
                }
            }

        }
    }
});