document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const history = document.getElementById("history");
    let currentInput = "";
    let currentOperator = "";
    let firstOperand = null;
    let secondOperand = null;

    function updateDisplay() {
        display.textContent = `${firstOperand !== null ? firstOperand + " " : ""}${currentOperator !== "" && secondOperand === null ? currentOperator + " " : ""}${secondOperand !== null ? secondOperand : currentInput}`;
    }

    function updateHistory() {
        if (currentOperator && firstOperand !== null && secondOperand !== null) {
            history.textContent = `${firstOperand} ${currentOperator} ${secondOperand} = ${firstOperand}`;
        } else {
            history.textContent = "";
        }
    }

    function clear() {
        currentInput = "";
        currentOperator = "";
        firstOperand = null;
        secondOperand = null;
        updateDisplay();
        updateHistory();
    }

    function handleNumberClick(number) {
        currentInput += number;
        updateDisplay();
    }

    function handleOperatorClick(operator) {
        if (currentOperator !== "") {
            performCalculation();
        }
        currentOperator = operator;
        firstOperand = parseFloat(currentInput);
        currentInput = "";
        updateDisplay();
    }

    function performCalculation() {
        if (currentOperator !== "" && currentInput !== "") {
            secondOperand = parseFloat(currentInput);
            switch (currentOperator) {
                case "+":
                    firstOperand += secondOperand;
                    break;
                case "-":
                    firstOperand -= secondOperand;
                    break;
                case "*":
                    firstOperand *= secondOperand;
                    break;
                case "/":
                    firstOperand /= secondOperand;
                    break;
                default:
                    break;
            }
            currentInput = ""; // Clear the input
            currentOperator = "";
            secondOperand = null;
            updateDisplay();
            updateHistory();
        }
    }

    document.querySelectorAll(".buttons button").forEach(function(button) {
        button.addEventListener("click", function() {
            const buttonText = this.textContent;
            if (!isNaN(parseFloat(buttonText))) {
                handleNumberClick(buttonText);
            } else if (buttonText === "=") {
                performCalculation();
            } else if (buttonText === "C") {
                clear();
            } else {
                handleOperatorClick(buttonText);
            }
        });
    });
});