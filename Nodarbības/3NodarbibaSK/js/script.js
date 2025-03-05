// JavaScript source code
function undefinedTest() {
    var name = 'Maris';
    var result = test(name);
    console.log(result);
}
function test(T) {
    if (T === undefined) {
        return 'Undefined Value!';
    }
    return T;
}
const person = {
    name: "Janis",
    surname: "Ozols",
    age: 25
}
const cars = ["Audi", "BMW", "Golf", "Honda"];
function testObject() {
    console.log(person.name);
}
function fillObject() {
    const person2 = {
        name: null,
        surname: null,
        age: null
    }
    person2.name = document.getElementById("name").value;
    person2.surname = document.getElementById("surname").value;
    person2.age = Number(document.getElementById("age").value);
    GetObjectValues(person2);
}
function GetObjectValues(person2) {
    document.getElementById("pName").innerHTML = 'd';
    document.getElementById("pSurname").innerHTML = person2.surname;
    document.getElementById("pAge").innerHTML = person2.age;
}
function getCar(idx) {
    console.log(cars[idx]);
}