function parbauditVecumu() {
    let vecums = document.getElementById("vecums").value;
    let rezultats = "";

    if (vecums >= 18) {
        rezultats = "Tu vari nopirkt: alu!";
    } else if (vecums >= 10) {
        rezultats = "Tu vari nopirkt: Sulu.";
    } else {
        rezultats = "Tu vari nopirkt tikai pienu.";
    }

    document.getElementById("rezultats").innerText = rezultats;
}var text = "";

