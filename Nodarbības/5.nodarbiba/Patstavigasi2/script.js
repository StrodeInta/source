function startSorting() {
    var skaits = Number(prompt("Ievadi akmeņu skaitu!"));
    if (isNaN(skaits) || skaits <= 0) {
        alert("Lūdzu, ievadiet derīgu akmeņu skaitu!");
        return;
    }

    var akmeni = [];
    for (var i = 0; i < skaits; i++) {
        var svars = Number(prompt(`Ievadi ${i + 1}. akmens svaru:`));
        if (isNaN(svars) || svars <= 0) {
            alert("Lūdzu, ievadiet derīgu svaru!");
            i--; 
        } else {
            akmeni.push(svars);
        }
    }

    akmeni.sort(function(a, b) {
        return b - a;
    });

    var kaudze1 = [], kaudze2 = [], sum1 = 0, sum2 = 0;

    for (var j = 0; j < akmeni.length; j++) {
        var svars = akmeni[j];
        if (sum1 <= sum2) {
            kaudze1.push(svars);
            sum1 += svars;
        } else {
            kaudze2.push(svars);
            sum2 += svars;
        }
    }

    var output = document.getElementById("output");
    output.innerHTML = `
        <p><strong>Visi akmeņi:</strong> ${akmeni.join(" ")} </p>
        <p><strong>Pirmā kaudze būs:</strong> ${kaudze1.join(" ")} </p>
        <p><strong>Otrā kaudze būs:</strong> ${kaudze2.join(" ")} </p>
        <p><strong>Pirmās kaudzes kopējais svars:</strong> ${sum1}</p>
        <p><strong>Otrās kaudzes kopējais svars:</strong> ${sum2}</p>
    `;
}
