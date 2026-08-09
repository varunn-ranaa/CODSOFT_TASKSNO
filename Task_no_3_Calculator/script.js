const displayCurrent = document.getElementById("displayCurrent");
const displayPrevious = document.getElementById("displayPrevious");
const keys = document.querySelectorAll(".key");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetCurrent = false;

function updateDisplay() {
  displayCurrent.textContent = formatNumber(currentValue);
  displayPrevious.textContent = previousValue
    ? `${previousValue} ${operator}`
    : "";
}

function formatNumber(value) {
  if (value === "" || value === "-") return value;

  const isNegative = value.startsWith("-");
  const raw = isNegative ? value.slice(1) : value;
  const [intPart, decimalPart] = raw.split(".");

  let formattedInt = "";
  for (let i = 0; i < intPart.length; i++) {
    const posFromEnd = intPart.length - i;
    formattedInt += intPart[i];
    if (posFromEnd > 1 && posFromEnd % 3 === 1) {
      formattedInt += ",";
    }
  }

  let result = formattedInt;
  if (decimalPart !== undefined) result += "." + decimalPart;
  if (isNegative) result = "-" + result;
  return result;
}

function inputNumber(digit) {
  if (shouldResetCurrent) {
    currentValue = digit;
    shouldResetCurrent = false;
  } else if (currentValue === "0") {
    currentValue = digit;
  } else {
    currentValue += digit;
  }
}

function inputDecimal() {
  if (shouldResetCurrent) {
    currentValue = "0.";
    shouldResetCurrent = false;
    return;
  }
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}

function chooseOperator(nextOperator) {
  if (operator && !shouldResetCurrent) {
    computeResult();
  }
  previousValue = currentValue;
  operator = nextOperator;
  shouldResetCurrent = true;
}

function computeResult() {
  if (operator === null || previousValue === "") return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  if (operator === "+") {
    result = prev + current;
  } else if (operator === "−") {
    result = prev - current;
  } else if (operator === "×") {
    result = prev * current;
  } else if (operator === "÷") {
    result = current === 0 ? "Error" : prev / current;
  } else {
    return;
  }

  // Round to avoid long floating point 
  currentValue = result === "Error" ? "Error" : String(Math.round(result * 1e10) / 1e10);
  previousValue = "";
  operator = null;
  shouldResetCurrent = true;
}

function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = null;
  shouldResetCurrent = false;
}

function backspace() {
  if (currentValue.length === 1 || currentValue === "-0") {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
}

function toPercent() {
  currentValue = String(parseFloat(currentValue) / 100);
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const action = key.dataset.action;

    if (action === "number") {
      inputNumber(key.textContent);
    } else if (action === "decimal") {
      inputDecimal();
    } else if (action === "operator") {
      chooseOperator(key.dataset.operator);
    } else if (action === "equals") {
      computeResult();
    } else if (action === "clear") {
      clearAll();
    } else if (action === "backspace") {
      backspace();
    } else if (action === "percent") {
      toPercent();
    }

    updateDisplay();
  });
});

// key support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    inputNumber(e.key);
  } else if (e.key === ".") {
    inputDecimal();
  } else if (e.key === "+") {
    chooseOperator("+");
  } else if (e.key === "-") {
    chooseOperator("−");
  } else if (e.key === "*") {
    chooseOperator("×");
  } else if (e.key === "/") {
    e.preventDefault();
    chooseOperator("÷");
  } else if (e.key === "Enter" || e.key === "=") {
    computeResult();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Escape") {
    clearAll();
  } else {
    return;
  }
  updateDisplay();
});

updateDisplay();