document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("diary-form");
    const entryInput = document.getElementById("entry");
    const message = document.getElementById("message");
    const entriesList = document.getElementById("entries-list");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Ielādē saglabātos ierakstus no LocalStorage, kad lapa ir ielādēta
    loadEntries();

    // Notikumu klausītājs formas iesniegšanai
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Novērš lapas pārlādēšanu

        let entryText = entryInput.value.trim();

        // Pārbauda, vai ievadlauks nav tukšs
        if (entryText === "") {
            alert("Lūdzu, ievadiet dienasgrāmatas ierakstu!");
            return;
        }

        // Saglabā ierakstu ar pašreizējo datumu un laiku
        const entryWithDate = {
            text: entryText,
            date: new Date().toLocaleString(), // Pievieno datumu un laiku
        };

        saveEntry(entryWithDate);
        entryInput.value = "";

        // Parāda paziņojumu par veiksmīgu saglabāšanu
        message.style.display = "block";
        setTimeout(() => (message.style.display = "none"), 2000);
    });

    // Notikumu klausītājs tumšajam režīmam
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        // Saglabā tumšā režīma stāvokli LocalStorage
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    });

    // Pārbauda, vai tumšais režīms ir ieslēgts LocalStorage
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Funkcija, lai saglabātu ierakstu LocalStorage
    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.push(entry);
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        loadEntries(); // Atjaunina ierakstu sarakstu
    }

    // Funkcija, lai ielādētu ierakstus no LocalStorage un parādītu tos lapā
    function loadEntries() {
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entriesList.innerHTML = ""; // Notīra esošos ierakstus

        // Pievieno katru ierakstu sarakstam
        entries.forEach((entry, index) => {
            let li = document.createElement("li");

            // Ieraksta teksts un datums
            li.innerHTML = `
                <span class="entry-text">${entry.text}</span>
                <span class="entry-date">${entry.date}</span>
                <button class="edit-btn" onclick="editEntry(${index})">Rediģēt</button>
                <button class="delete-btn" onclick="deleteEntry(${index})">Dzēst</button>
            `;

            entriesList.appendChild(li);
        });
    }

    // Funkcija, lai dzēstu ierakstu
    window.deleteEntry = function (index) {
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.splice(index, 1); // Noņem ierakstu no masīva
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        loadEntries(); // Atjaunina ierakstu sarakstu
    };

    // Funkcija, lai rediģētu ierakstu
    window.editEntry = function (index) {
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        const newText = prompt("Rediģēt ierakstu:", entries[index].text);

        if (newText !== null && newText.trim() !== "") {
            entries[index].text = newText.trim(); // Atjaunina ieraksta tekstu
            entries[index].date = new Date().toLocaleString(); // Atjaunina datumu
            localStorage.setItem("diaryEntries", JSON.stringify(entries));
            loadEntries(); // Atjaunina ierakstu sarakstu
        }
    };
});