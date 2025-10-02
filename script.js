let expression = '';
let historyArray = [];
const display = document.getElementById('display');
const historyDiv = document.getElementById('history');

function updateDisplay() {
  display.value = expression || '0';
}

function appendNumber(num) {
  expression += num;
  updateDisplay();
}

function appendOperator(op) {
  expression += op;
  updateDisplay();
}

function appendDecimal() {
  expression += '.';
  updateDisplay();
}

function clearAll() {
  expression = '';
  updateDisplay();
}

function clearEntry() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function negate() {
  if (expression) {
    expression = `(-${expression})`;
    updateDisplay();
  }
}

// Add to history panel
function updateHistory(expr, result) {
  const entry = document.createElement('div');
  entry.textContent = `${expr} = ${result}`;
  entry.addEventListener('click', () => {
    expression = result.toString();
    updateDisplay();
  });
  historyDiv.prepend(entry);
  historyArray.push({expression: expr, result});
}

function calculate() {
  try {
    let safeExpr = expression
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/sqr/g, '(x => x*x)')
      .replace(/pow/g, '**')
      .replace(/exp/g, 'Math.exp');

    let result = eval(safeExpr);
    updateHistory(expression, result);
    expression = result.toString();
    updateDisplay();
  } catch {
    display.value = 'Error';
    expression = '';
  }
}

function func(fn) {
  expression += fn + '(';
  updateDisplay();
}

// --- NEW: Clear History ---
function clearHistory() {
  historyArray = [];
  historyDiv.innerHTML = '';
}

