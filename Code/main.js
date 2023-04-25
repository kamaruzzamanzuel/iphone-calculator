// @ts-nocheck

const numberButtons = document.getElementsByClassName("number-button");
const operatorButtons = document.getElementsByClassName("operator-button");
const equalButton = document.getElementsByClassName("equal-button")[0];
const acButton = document.getElementsByClassName("ac-button")[0];
const mainDisplay = document.getElementsByClassName("main-display")[0];

let firstValue = "";
let secondValue = "";
let operatorValue = "";
let resultValue = "";
let isWaitingForSecondValue = false;
let isClearMainDisplay = false;
let isClearAll = false;

const clearAll = () => {
  firstValue = "";
  secondValue = "";
  operatorValue = "";
  resultValue = "";
  mainDisplay.textContent = "0";
  isWaitingForSecondValue = false;
  isClearMainDisplay = false;
  isClearAll = false;
};

acButton.addEventListener("click", clearAll);

Array.from(numberButtons).forEach(numberButton => {
  numberButton.addEventListener("click", (e) => {
    const value = e.target.textContent;
    let currentMainDisplayText = mainDisplay.textContent;

    if (isWaitingForSecondValue) {
      isWaitingForSecondValue = false;
    }

    if (isClearAll) {
      clearAll();
      currentMainDisplayText = "0";
    }

    if (isClearMainDisplay) {
      currentMainDisplayText = "0";
      isClearMainDisplay = false;
    }

    if (currentMainDisplayText === "0") {
      if (value === "0") {
        return;
      }

      if (value === ".") {
        mainDisplay.textContent = "0.";
        return;
      }

      if (value !== "0") {
        mainDisplay.textContent = value;
        return;
      }
    }

    if (currentMainDisplayText.includes(".") && value === ".") {
      return;
    }

    mainDisplay.textContent += value;
  });
});

Array.from(operatorButtons).forEach(operatorButton => {
  operatorButton.addEventListener("click", (e) => {
    const value = mainDisplay.textContent;

    if (!isWaitingForSecondValue) {
      if (resultValue) {
        firstValue = resultValue;
        secondValue = "";
        resultValue = "";
        isClearAll = false;
      } else if (firstValue === "") {
        firstValue = parseFloat(value);
      } else {
        firstValue = calculate(firstValue, parseFloat(value), operatorValue);
        mainDisplay.textContent = firstValue;
      }
    }

    operatorValue = e.target.textContent;
    isWaitingForSecondValue = true;
    isClearMainDisplay = true;
  });
});

equalButton.addEventListener("click", (e) => {
  if (firstValue) {
    secondValue = parseFloat(mainDisplay.textContent);

    if (operatorValue === "") {
      secondValue = firstValue;
    }

    resultValue = calculate(firstValue, secondValue, operatorValue);
  } else {
    resultValue = firstValue;
  }

  mainDisplay.textContent = resultValue;
  // firstValue = "";
  // secondValue = "";
  // operatorValue = "";
  // resultValue = "";
  // mainDisplay.textContent = "0";
  isClearAll = true;
});

const calculate = (firstNumber, secondNumber, operator) => {
  let result = null;

  if (operator === "+") {
    result = firstNumber + secondNumber;
  }
  if (operator === "-") {
    result = firstNumber - secondNumber;
  }
  if (operator === "*") {
    result = firstNumber * secondNumber;
  }
  if (operator === "/") {
    result = firstNumber / secondNumber;
  }

  console.log({ firstNumber, secondNumber, operator, result });
  return result;
};