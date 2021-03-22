/*
*/
inputField = document.getElementById("inputfield");
prevInputField = document.getElementById("prevfield");
pendingOperator = "add";
stopContinue = false;
hasDecimal = false;

function main(event) {
  chosenButton = event.target;
  render(chosenButton);
}

function render(button) {
  id = button.id.trim();
  if (!button.classList.contains("calc-button")) {
    return;
  } else if (id === "ac") {
    clear();
  } else if (
    id === "zero" ||
    id === "one" ||
    id === "two" ||
    id === "three" ||
    id === "four" ||
    id === "five" ||
    id === "six" ||
    id === "seven" ||
    id === "eight" ||
    id === "nine" ||
    id === "pi"
  ) { 
    if (inputField.textContent.length > 15) { return }
    if (inputField.textContent === '0') {
      inputField.textContent = ''
    }
    if (id === "pi") {
      inputField.textContent += 3.14;
      stopContinue = false;
      return;
    }
    stopContinue = false;
    inputField.textContent += button.textContent;
  } else if (
    id === "multiply" ||
    id === "add" ||
    id === "divide" ||
    id === "substract" ||
    id === "percentage" ||
    id === "root" ||
    id === "power" ||
    id === "negate"
  ) {
    operate(id);
  } else if (id === "decimal") {
    decimal()
  } else if (id === "rzero") {
    round();
  } else if (id === "equals") {
    if (stopContinue) return;
    calc("final");
  } else if (id === "del") {
    del();
  }
}

function clear() {
  inputField.textContent = '';
  prevInputField.textContent = '';
}

function decimal() {
  delInput = inputField.textContent.split("");
  inputField.textContent = delInput.join("");
  for (d of delInput) {
    if (d === ".") { hasDecimal = true }
  }

  if (hasDecimal) { return } else { inputField.textContent += '.' }
}


function operate(code) {
  if (code === "percentage") {
    inputField.textContent = (inputField.textContent / 100).toFixed(2);
  } else if (code === "root") {
    inputField.textContent = Math.sqrt(inputField.textContent).toFixed(2);
  } else if (code === "negate") {
    if (isNaN(inputField.textContent)) { return }
    inputField.textContent = parseFloat(inputField.textContent * -1);
  } else if (code === "power") {
    inputField.textContent = parseFloat(inputField.textContent ** 2);
  } else {
    if (stopContinue) return;
    stopContinue = true;
    calc(code);
  }
}

function calc(code) {
  if (prevInputField.textContent === '') { prevInputField.textContent = 0}
  if (inputField.textContent === '') { inputField.textContent = 0}
  if (pendingOperator === "add") {
    prevInputField.textContent =
      parseFloat(inputField.textContent) + parseFloat(prevInputField.textContent);
    inputField.textContent = "";
  } else if (pendingOperator === "substract") {
    prevInputField.textContent =
      parseFloat(prevInputField.textContent) - parseFloat(inputField.textContent);
    inputField.textContent = "";
  } else if (pendingOperator === "multiply") {
    prevInputField.textContent =
      parseFloat(inputField.textContent) * parseFloat(prevInputField.textContent);
    inputField.textContent = "";
  } else if (pendingOperator === "divide") {
    prevInputField.textContent =
      parseFloat(prevInputField.textContent) / parseFloat(inputField.textContent);
    inputField.textContent = "";
  }
  if (code === "final") {
    inputField.textContent = parseFloat(prevInputField.textContent).toFixed(3);
        if (inputField.textContent === 0) { inputField.textContent = inputField.textContent.toPrecision(0)}
    prevInputField.textContent = 0;
    code = "add";
  }
  pendingOperator = code;
}

function round() {
    inputField.textContent = parseFloat(inputField.textContent).toFixed(0);

}

function del() {
  delInput = inputField.textContent.split("");
  delInput.pop();
  inputField.textContent = delInput.join("");
}

document.addEventListener("click", (event) => main(event));
