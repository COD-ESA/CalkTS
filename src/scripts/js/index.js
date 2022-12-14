"use strict";
//===================================================================
const kb = document.querySelector(".kb");
const input = document.querySelector("input");
kb === null || kb === void 0 ? void 0 : kb.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('.bt')) {
        if (input instanceof HTMLInputElement) {
            runCalc(event.target.textContent);
            return;
        }
    }
});
// type calculationType<T> = (akkum:[T?,T?], operation:string) => number;
const calculation = ([...akkum], operation) => {
    if (akkum.length < 2) {
        return akkum[0];
    }
    else {
        return eval(akkum[0] + operation.shift() + akkum[1]);
    }
};
function calc() {
    const akkumulator = [];
    const operation = []; // знак операции
    let answer = false; //если true тогда очищаю input
    return (strSymbol) => {
        if (strSymbol !== null) {
            if (input instanceof HTMLInputElement) {
                switch (strSymbol) {
                    case '+':
                    case '-':
                    case '*':
                    case '%':
                    case '/': {
                        answer = true;
                        akkumulator.push(Number(input.value));
                        operation.push(strSymbol);
                        akkumulator[0] = calculation(akkumulator, operation);
                        akkumulator.length = 1;
                        input.value = String(akkumulator);
                        break;
                    }
                    case '=': {
                        // if(operation === ''){
                        // break}
                        // else if(operation === '%'){
                        // akkumulator.push(Number(input.value));
                        // akkumulator[0] = eval(akkumulator[0] + '*' + akkumulator[1] * 0.01);
                        // operation = '' ;
                        // akkumulator.length = 1;
                        // input.value = String(akkumulator);
                        // akkumulator = [];
                        // answer = true;
                        // break;
                        akkumulator.push(Number(input.value));
                        akkumulator[0] = calculation(akkumulator, operation);
                        answer = true;
                        akkumulator.length = 1;
                        input.value = String(akkumulator);
                        akkumulator.length = 0;
                        break;
                    }
                    case 'CLR': {
                        input.value = '0';
                        akkumulator.length = 0;
                        answer = false;
                        break;
                    }
                    default:
                        if (input.value === '0') {
                            input.value = strSymbol;
                        }
                        else if (answer) {
                            input.value = '';
                            answer = false;
                            input.value = strSymbol;
                        }
                        else {
                            input.value += strSymbol;
                        }
                }
            }
        }
    };
}
const runCalc = calc();
