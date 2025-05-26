const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const winnerDisplay = document.getElementById("winner");
const mediaDisplay = document.getElementById("media");
const audio = new Audio("media/audio/jingls.mp3");

const names = ["Egita", "Amanda", "Ričards", "Kevins", "Alans", "Maksims", "Everita", "Sanita","Enija", "Samanta"];
const media = [
    { type: "image", src: "media/attels1.jpg" },
    { type: "image", src: "media/attels2.jpg" },
    { type: "video", src: "media/video1.mp4" }
];

let angle = 0;
const segmentAngle = 2 * Math.PI / names.length;

// Funkcija, kas zīmē ratu
function drawWheel() {
    for (let i = 0; i < names.length; i++) {
        const startAngle = i * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 180, startAngle, endAngle);
        ctx.fillStyle = i % 2 === 0 ? "#4db6ac" : "#81c784";  // Alternatīvas krāsas
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(names[i], 170, 10); // Skolēna vārds
        ctx.restore();
    }
}

// Funkcija, kas zīmē trīsstūri, kas norāda uz uzvarētāju
function drawPointer() {
    ctx.beginPath();
    ctx.moveTo(200, 20);     // Spicums vērsts lejup
    ctx.lineTo(190, 0);      // Kreisā puse
    ctx.lineTo(210, 0);      // Labā puse
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
}

// Funkcija, kas apgriež ratu
function drawRotatedWheel(rotAngle) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(rotAngle);
    ctx.translate(-200, -200);
    drawWheel();
    ctx.restore();
    drawPointer();
}

// Funkcija, kas parāda uzvarētāju un mediju (attēlu vai video)
function showWinner(index) {
    const winnerName = names[index];
    winnerDisplay.textContent = `Uzvarētājs: ${winnerName}`;
    winnerDisplay.style.display = "block";

    mediaDisplay.innerHTML = "";  // Notīra esošo mediju saturu

    const item = media[Math.floor(Math.random() * media.length)];
    
    console.log("Selected media item:", item);  // Pārbauda, kurš medijs tiek izvēlēts

    if (item.type === "image") {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = "Uzvarētāja attēls";  // Pievieno alt tekstu attēlam
        mediaDisplay.appendChild(img);
    } else if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        mediaDisplay.appendChild(video);
    }

    console.log("Displaying media:", item.src);  // Pārbauda, kuru mediju parāda
}

// Funkcija, kas uzsāk rata griešanu
function spinWheel() {
    spinBtn.disabled = true;  // Bloķē pogu griešanās laikā
    winnerDisplay.style.display = "none";
    mediaDisplay.innerHTML = "";

    let spinTime = 0;
    const totalSpinTime = 4000 + Math.random() * 1000;

    audio.currentTime = 0;
    audio.play();  // Atskaņo audio džinglu

    const interval = setInterval(() => {
        spinTime += 30;
        angle += 0.3 + (totalSpinTime - spinTime) / 200;
        drawRotatedWheel(angle);

        if (spinTime >= totalSpinTime) {
            clearInterval(interval);  // Apstājas griešanās
            audio.pause();  // Apstājas audio džingls

            const normalizedAngle = angle % (2 * Math.PI);  // Normalizē leņķi
            // Pārskatīts uzvarētāja indeksa aprēķins
            const winnerIndex = Math.floor((normalizedAngle + segmentAngle / 2) / segmentAngle) % names.length;

            // Izvēlamies pareizo uzvarētāju
            showWinner(winnerIndex);  // Parāda uzvarētāju
            spinBtn.disabled = false;  // Atslēdz pogu
        }
    }, 30);
}



// Inicializē ratu un pointeri
drawWheel();
drawPointer();
spinBtn.addEventListener("click", spinWheel);  // Piešķir pogai klikšķa notikumu
