const cars = ["BMW", "Volvo", "MINI","Audi", "Honda", "Mercedes"];
var text = "";

for (var x of cars) {
    if ((x == 'Volvo'|| x=='BMW') && x != 'Audi'){
        text += x + "</br>"; 
    }
}

document.getElementById("demo").innerHTML = text;
