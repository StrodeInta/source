const cars = ["BMW", "Volvo", "MINI"];
let text = "";

for (let x of cars) {
    text += x + "<br>";
}

document.getElementById("demo").innerHTML = text;
