const digitButtons = document.querySelectorAll(".btn--digit");
const input = document.querySelector(".input");
const clearButtons = document.querySelectorAll(".btn--clear");
const backspaceButton = document.querySelector(".btn--backspace");
const changeSignButton = document.querySelector(".btn--change-sign");
const percentButton = document.querySelector(".btn--percent");
const commaButton = document.querySelector(".btn--comma");
const plusButton = document.querySelector(".btn--plus");

const historyText = document.querySelector(".history-bar-text");

let historyNumber = "";

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

// PLUS
plusButton.addEventListener("click", () => {
  saveInput(operationSign);
});

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

function saveInput(operationSign) {
  historyNumber = +input.value;
  historyText.innerHTML = historyNumber;
}

function init() {
  input.value = "";
}

init();
