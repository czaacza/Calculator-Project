const digitButtons = document.querySelectorAll(".btn--digit");
const output = document.querySelector(".output");
const clearButtons = document.querySelectorAll(".btn--clear");
const backspaceButton = document.querySelector("#backspace");
const changeSignButton = document.querySelector("#change-sign");
const percentButton = document.querySelector("#percent");
const commaButton = document.querySelector("#comma");

const actionButtons = document.querySelectorAll(".btn--action");

const historyTextField = document.querySelector(".history-bar-text");

let historyValue = "";
let lastOperation = "";
let currentOperation = "";
let clearOutputBeforeAddDigit = false;

const FONT_SIZE_OUTPUT = "4.2rem";
const FONT_SIZE_OUTPUT_SMALLER = "2.4rem";

// ADD DIGITS
for (let digitButton of digitButtons) {
  digitButton.addEventListener("click", () => {
    addDigit(digitButton.innerHTML);
  });
}

for (let clearButton of clearButtons) {
  clearButton.addEventListener("click", () => {
    clearOutput();
    historyTextField.innerHTML = "";
  });
}

// BACKSPACE
backspaceButton.addEventListener("click", removeDigit);

// CLEAR

// CHANGE SIGN +/-
changeSignButton.addEventListener("click", changeSign);

// PERCENT
percentButton.addEventListener("click", changeToPercent);

// ADD COMMA
commaButton.addEventListener("click", addComma);

// ACTION BUTTONS
for (let actionButton of actionButtons) {
  actionButton.addEventListener("click", function () {
    makeOperation(this.id);
  });
}

// OUTPUT LISTENER
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "/") {
    makeOperation("divide");
  } else if (e.key === "+") {
    makeOperation("plus");
  } else if (e.key === "-") {
    makeOperation("minus");
  } else if (e.key === "=" || e.key === "Enter") {
    makeOperation("equals");
  } else if (e.key === ",") {
    addComma();
  } else if (e.key === "*") {
    makeOperation("multiply");
  } else if (e.key === "Backspace") {
    removeDigit();
  } else if (e.key === "Delete") {
    clearOutput();
  } else if (!isNaN(+e.key)) {
    addDigit(e.key);
  }

  if (output.innerHTML.length > 13) {
    output.innerHTML = output.innerHTML.slice(1, -1);
  }
});

function makeOperation(currentOperation) {
  console.log(currentOperation);
  let result = getResult(currentOperation, lastOperation);
  assignHistoryValue(result);

  if (currentOperation === "equals") {
    currentOperation = "";
    assignHistoryValue("");
  } else {
    clearOutput();
  }

  output.innerHTML = result;
  clearOutputBeforeAddDigit = true;
  historyTextField.innerHTML += ` ${getOperationSymbol()} `;

  console.log(`lastOperation: ${lastOperation}`);
  console.log(`result: ${result}`);
  console.log(`historyValue: ${historyValue}`);
  console.log(`current operation: ${currentOperation}`);
  console.log("--------------------------------");

  lastOperation = currentOperation;
}

function addDigit(digit) {
  if (output.innerHTML[0] === "0") {
    if (output.innerHTML[1] != ".")
      output.innerHTML = output.innerHTML.slice(1);
  }
  if (output.style.fontSize === FONT_SIZE_OUTPUT_SMALLER) {
    output.style.fontSize = FONT_SIZE_OUTPUT;
  }
  if (clearOutputBeforeAddDigit) {
    clearOutput();
    clearOutputBeforeAddDigit = false;
  }
  output.innerHTML += digit;
  if (output.innerHTML.length > 12) {
    output.innerHTML = output.innerHTML.slice(0, -1);
  }
}

function addComma() {
  if (output.innerHTML.includes(".")) {
    return;
  }
  output.innerHTML += ".";
}

function removeDigit() {
  output.innerHTML = output.innerHTML.slice(0, -1);
}

function changeSign() {
  if (output.innerHTML[0] === "-") {
    output.innerHTML = output.innerHTML.slice(1);
    return;
  }
  output.innerHTML = "-" + output.innerHTML;
}

function changeToPercent() {
  output.innerHTML = output.innerHTML / 100;
}

function clearOutput() {
  output.innerHTML = "";
}

function assignHistoryValue(value) {
  historyValue = value;
  historyTextField.innerHTML = value;
}

function getResult(currentOperation, lastOperation) {
  let currentValue = +output.innerHTML;
  switch (lastOperation) {
    case "divide":
      result = historyValue / currentValue;
      break;
    case "multiply":
      result = historyValue * currentValue;
      break;
    case "minus":
      result = historyValue - currentValue;
      break;
    case "plus":
      result = historyValue + currentValue;
      break;
    case "equals":
      result = historyValue;
      break;
    default:
      result = currentValue;
      break;
  }

  switch (currentOperation) {
    case "1/x":
      result = 1 / currentValue;
      break;
    case "power":
      result = currentValue * currentValue;
      break;
    case "sqrt":
      result = Math.sqrt(currentValue);
      break;
    default:
      break;
  }
  let resultString = `${result}`;
  if (resultString.length > 12) {
    result = Math.round(result / 10000000) * 10000000;
    output.style.fontSize = FONT_SIZE_OUTPUT_SMALLER;
  }
  return result;
}

function getOperationSymbol() {
  let operationSymbol = "";
  switch (currentOperation) {
    case "divide":
      operationSymbol = "/";
      break;
    case "multiply":
      operationSymbol = "*";
      break;
    case "minus":
      operationSymbol = "-";
      break;
    case "plus":
      operationSymbol = "+";
      break;
    case "equals":
      operationSymbol = "=";
      break;
    default:
      break;
  }
  return operationSymbol;
}

function init() {
  output.innerHTML = "";
}

init();
