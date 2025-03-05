// JavaScript source code

function ageCheck(form) {
    const myAge = form.age.value;
    let product = null;

    if (myAge < 16) {
        product = 'piens';
    }
    else if (myAge < 18) {
        product = 'sula';
    }
    else {
        product = 'alus';
    }
    console.log('Tev varu piedavat, ' + product);
}

function singleLineIf(form) {
    const myAge = form.age.value;
    let x = null;
    myAge == 22 ? x = 'trapijums' : x = 'garam';
    console.log(x);
}

function switchTest() {
    let age = 22;
    let text = null;
    switch (age) {
        case 5:
            {
                text = 'Pieci';
                break;
            }
        case age < 10:
            {
                text = 'Zem desmit'
                break;
            }
        default:
            {
                text = 'Virs 10'
                break;
            }
    }
    console.log(text);
}

