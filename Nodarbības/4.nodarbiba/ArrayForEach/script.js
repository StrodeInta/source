var checkSubjectByName = ["Matematika","Kimija", "Fizika"];
var x;
var elementDemo = document.getElementById("demo");

function checkSubjectByName() {
    x = prompt('Ievadi mācību priekšmetu!');  // Prasām lietotājam ievadīt priekšmetu
    checkSubject(x);  // Pārbaudām, vai priekšmets ir sarakstā
}
function checkSubjectIndex() {
    x = Number(prompt('Ievadīt mācību priekšmetu idx vērtību!'));
    if (x >=  0 && x< suvjectArray.length){
        var value = subjectArray[x];
        //document.getElementById("demo").innerHTML = "Priekšmets atrasts: " + value + "?"; //vecais koda veids
        document.getElementById("demo").innerHTML = `Priekšmets atrasts: ${value}!`; //jaunais koda veids javascripta
    }
    else {
        document.getElementById("demo2").innerHTML = `Index value of: ${x} is not in range o - : ${value}`
    }
}
function checkSubject(value) {
    if (checkSubjectByName.includes(value)) {
        elementDemo.innerHTML = "Jā, mēs mācam tādu priekšmetu.";  // Ja priekšmets ir sarakstā
    } else {
        elementDemo.innerHTML = "Nē, mēs nemācam šo priekšmetu!";  // Ja priekšmeta nav sarakstā
    }
}