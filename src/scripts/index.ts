const kb: HTMLElement | null = document.querySelector('.kb');
const input:HTMLElement | null = document.querySelector('input');

type CalculationType = (akkum: number[], operation:string[]) => number;
const calculation:CalculationType = (akkum, operation) => {
  if (akkum.length === 1) {
    if (operation[0] === 'SQ' && akkum[0] > 0) {
      return Math.sqrt(akkum[0]);
    }
    return akkum[0] ?? 0;
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

    default: { return 0; }
  }
};

const chooseMathSymbol = (inputStr:string):string => {
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
  const akkumulator:number[] = [];
  const operation:string[] = [];// знак операции
  let answer = false;// если true тогда очищаю input
  return (strSymbol:string | null) => {
    if (strSymbol !== null) {
      if (input instanceof HTMLInputElement) {
        switch (strSymbol) {
          case '+':
          case '-':
          case '*':
          case '/':
          case '%':
          case 'SQ': {
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
          case '+/-': {
            input.value = chooseMathSymbol(input.value);
            break;
          }
          default:
            if (input.value === '0') {
              input.value = strSymbol;
            } else if (answer) {
              input.value = '';
              answer = false;
              input.value = strSymbol;
            } else {
              input.value += strSymbol;
            }
        }
      }
    }
  };
}

const runCalc = calc();

kb?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('.bt')) {
    if (input instanceof HTMLInputElement) {
      runCalc(event.target.textContent);
    }
  }
});
