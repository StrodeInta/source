function calculate() {
    var num1 = parseFloat(document.getElementById("num1").value);
    var operator = document.getElementById("operator").value;
    var num2 = parseFloat(document.getElementById("num2").value);
    var resultElement = document.getElementById("result");
    
    if (isNaN(num1) || isNaN(num2)) {
        resultElement.innerHTML = "Lūdzu, ievadiet skaitļus!";
        return;
    }

    var result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                resultElement.innerHTML = "Nevar dalīt ar 0!";
                return;
            }
            result = num1 / num2;
            break;
        default:
            resultElement.innerHTML = "Nepareiza darbība!";
            return;
    }

    resultElement.innerHTML = "Rezultāts: " + result;
}
