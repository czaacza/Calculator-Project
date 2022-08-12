const digitButtons = document.querySelectorAll(".btn--digit");
const output = document.querySelector(".output");
const clearButtons = document.querySelectorAll(".btn--clear");
const backspaceButton = document.querySelector("#backspace");
const changeSignButton = document.querySelector("#change-sign");
const percentButton = document.querySelector("#percent");
const commaButton = document.querySelector("#comma");

const actionButtons = document.querySelectorAll(".btn--action");

const historyTextField = document.querySelector(".history-bar-text");

let outputText = outputText;
let historyValue = "";
let lastOperation = "";
let currentOperation = "";

// ADD DIGITS
for (let digitButton of digitButtons) {
  digitButton.addEventListener("click", () => {
    addDigit(digitButton.innerHTML);
  });
}

for (let clearButton of clearButtons) {
  clearButton.addEventListener("click", clearInput);
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
  let operationSign;
  actionButton.addEventListener("click", () => {
    currentOperation = actionButton.id;
    saveInput();
    console.log(`current operation: ${currentOperation}`);
    console.log("--------------------------------");
    lastOperation = currentOperation;
  });
}

// OUTPUT LISTENER
// output.addEventListener("keydown", (e) => {
//   console.log(e.key);
//   if (e.key === "/") {
//   } else if (e.key === "+") {
//   } else if (e.key === "-") {
//   } else if (e.key === "=") {
//   } else if (e.key === ",") {
//     addComma();
//   } else if (e.key === "*") {
//   } else if (isNaN(+e.key) && e.key != "Backspace" && e.key != "Delete") {
//     e.preventDefault();
//   }
// });

function addDigit(digit) {
  if (outputText[0] === "0") {
    outputText = outputText.slice(1);
  }
  outputText += digit;
}

function addComma() {
  if (outputText.includes(".")) {
    return;
  }
  outputText += ".";
}

function removeDigit() {
  outputText = outputText.slice(0, -1);
}

function changeSign() {
  if (outputText[0] === "-") {
    outputText = outputText.slice(1);
    return;
  }
  outputText = "-" + outputText;
}

function changeToPercent() {
  outputText = outputText / 100;
}

function clearInput() {
  outputText = "";
}

function saveInput() {
  let result = getResult();

  historyValue = result;
  historyTextField.innerHTML = result;
  if (currentOperation === "equals") {
    outputText = result;
  } else {
    outputText = "";
  }

  console.log(`lastOperation: ${lastOperation}`);
  console.log(`result: ${result}`);
  console.log(`historyValue: ${historyValue}`);
}

function getResult() {
  let currentValue = +outputText;
  switch (lastOperation) {
    case "1/x":
      result = 1 / currentValue;
    case "power":
      result = currentValue * currentValue;
      break;
    case "sqrt":
      result = Math.sqrt(currentValue);
      break;
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
  return result;
}

function init() {
  outputText = "";
}

init();
