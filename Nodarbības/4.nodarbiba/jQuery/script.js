var Person = {
    Fname: "Jānis",
    Lname: "Ozols",
    Age: 22
}

var Person = [
        { Fname: "Jānis",
        Lname: "Ozols",
        Age: 22
    },
    { Fname: "Ilze",
        Lname: "Lapa",
        Age: 67
    },
    { Fname: "Valdis",
        Lname: "OLiepa",
        Age: 18
    },
];

function getPAge(){
    var myForm = document.getElementById("MyForm");
    var age = getPersonAge(myForm.fName.value, myForm.lName.value);
    var text;
    if (age != null) {
        document.getElementById("demo").innerHTML = `Person age are:` &{age};
    }
    else {
        text = `peson couldnt be found!`
    }
    document.getElementById("demo").innerHTML = text;
}

function getPersonAge(name, surname) {
    var fPerson = jQuery.grep(Person, function(dt){
        return (dt.Fname == name && dt.Lname == surname);
    })
    if (fPerson != null) {
        return fPerson[0].age;
    }
    return null;
}