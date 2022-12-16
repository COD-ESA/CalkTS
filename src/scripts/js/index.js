"use strict";
const kb = document.querySelector('.kb');
const input = document.querySelector('input');
const calculation = (akkum, operation) => {
    var _a;
    if (akkum.length === 1) {
        if (operation[0] === 'SQ' && akkum[0] > 0) {
            console.log('akkum = ', akkum);
            return Math.sqrt(akkum[0]);
        }
        return (_a = akkum[0]) !== null && _a !== void 0 ? _a : 0;
    }
    switch (operation.shift()) {
        case '+':
            return akkum[0] + akkum[1];
        case '-':
            return akkum[0] - akkum[1];
        case '*':
            return akkum[0] * akkum[1];
        case '/':
            return akkum[0] / akkum[1];
        case '%':
            return akkum[0] * akkum[1] * 0.01;
        case 'EXP':
            return akkum[0] * (Math.pow(10, akkum[1]));
        default: {
            return 0;
        }
    }
};
// реализует обработку знака числа после нажатия кнопки "+/-"
const chooseMathSymbol = (inputStr) => {
    const tempArray = inputStr.split('');
    if (tempArray !== undefined) {
        if (tempArray[0] === '-') {
            tempArray.shift();
            return tempArray.join('');
        }
        tempArray.unshift('-');
        return tempArray.join('');
    }
    return inputStr;
};
// тут будет функция вычисляющая тригонометричесские выражения
function calc() {
    const akkumulator = [];
    const operation = []; // знак операции
    let answer = false; // если true тогда очищаю input
    return (strSymbol) => {
        if (strSymbol !== null) {
            if (input instanceof HTMLInputElement) {
                switch (strSymbol) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                    case 'SQ':
                    case 'EXP': {
                        answer = true;
                        akkumulator.push(Number(input.value));
                        operation.push(strSymbol);
                        akkumulator[0] = calculation(akkumulator, operation);
                        akkumulator.length = 1;
                        console.log('akkum = ', akkumulator);
                        input.value = String(akkumulator);
                        break;
                    }
                    case '=': {
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
                    case '+/-': {
                        input.value = chooseMathSymbol(input.value);
                        break;
                    }
                    case 'π': {
                        input.value = '3.14159';
                        break;
                    }
                    case 'tan':
                    case 'sin':
                    case 'cos': {
                        input.value = 'Not implementation';
                        answer = true;
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
kb === null || kb === void 0 ? void 0 : kb.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('.bt')) {
        if (input instanceof HTMLInputElement) {
            runCalc(event.target.textContent);
        }
    }
});
