const digitButtons = document.querySelectorAll(".btn--digit");
const input = document.querySelector(".input");
const clearButtons = document.querySelectorAll(".btn--clear");
const backspaceButton = document.querySelector("#backspace");
const changeSignButton = document.querySelector("#change-sign");
const percentButton = document.querySelector("#percent");
const commaButton = document.querySelector("#comma");

const actionButtons = document.querySelectorAll(".btn--action");

const historyTextField = document.querySelector(".history-bar-text");

let historyValue = "";
let operation = "";
let isOperationActive = false;

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
    saveInput();
    operation = actionButton.id;
  });
}

// INPUT LISTENER
input.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "/") {
  } else if (e.key === "+") {
  } else if (e.key === "-") {
  } else if (e.key === "=") {
  } else if (e.key === ",") {
    addComma();
  } else if (e.key === "*") {
  } else if (isNaN(+e.key) && e.key != "Backspace" && e.key != "Delete") {
    e.preventDefault();
  }
});

function addDigit(digit) {
  if (input.value[0] === "0") {
    input.value = input.value.slice(1);
  }
  input.value += digit;
}

function addComma() {
  if (input.value.includes(".")) {
    return;
  }
  input.value += ".";
}

function removeDigit() {
  input.value = input.value.slice(0, -1);
}

function changeSign() {
  if (input.value[0] === "-") {
    input.value = input.value.slice(1);
    return;
  }
  input.value = "-" + input.value;
}

function changeToPercent() {
  input.value = input.value / 100;
}

function clearInput() {
  input.value = "";
}

function saveInput() {
  let result;
  let currentValue = +input.value;
  switch (operation) {
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
      console.log("equals");
      break;
    default:
      result = currentValue;
      break;
  }
  historyValue = result;
  historyTextField.innerHTML = result;
  input.value = result;
  isOperationActive = true;

  console.log(`operation: ${operation}`);
  console.log(`result: ${result}`);
  console.log(`historyValue: ${historyValue}`);
}

function init() {
  input.value = "";
}

init();
