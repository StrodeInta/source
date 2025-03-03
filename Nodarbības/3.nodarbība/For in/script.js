const person = { 
    fname: "John", 
    lname: "Doe", 
    age: 25 
};
var text = ""
for (var x in person) {
    text += person[x];
}

 
document.getElementById("demo").innerHTML = text;
