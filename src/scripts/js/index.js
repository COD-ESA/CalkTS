"use strict";
const kb = document.querySelector('.kb');
const input = document.querySelector('input');
const calculation = (akkum, operation) => {
    var _a;
    if (akkum.length === 1) {
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
        default: {
            return 0;
        }
    }
};
//тут будет функция вычисляющая тригонометричесские выражения
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
                    case '%': {
                        answer = true;
                        akkumulator.push(Number(input.value));
                        operation.push(strSymbol);
                        akkumulator[0] = calculation(akkumulator, operation);
                        akkumulator.length = 1;
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
