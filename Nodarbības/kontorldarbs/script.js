// ====== LocalStorage Palīgfunkcijas ======
function loadBooks() {
    const data = localStorage.getItem("books");
    return data ? JSON.parse(data) : [
        {id: 1, title: "Rīgas Noslēpumi", author: "Jānis Bērziņš", year: 2010, isbn: "978-9984-11-123-4", available: true},
        {id: 2, title: "Latviešu Daba", author: "Anna Kalniņa", year: 2018, isbn: "978-9984-11-567-8", available: false}
    ];
}
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function loadAuthors() {
    const data = localStorage.getItem("authors");
    return data ? JSON.parse(data) : [
        {id: 1, name: "Jānis Bērziņš", birthYear: 1975},
        {id: 2, name: "Anna Kalniņa", birthYear: 1982}
    ];
}
function saveAuthors() {
    localStorage.setItem("authors", JSON.stringify(authors));
}

// ==== Padarām mainīgos globālus ====
var books = loadBooks();
var authors = loadAuthors();

// ====== Grāmatu CRUD ======
if (document.getElementById("booksTable")) {
    var editingId = null;

    function renderBooks() {
        const tbody = document.querySelector("#booksTable tbody");
        tbody.innerHTML = "";
        books.forEach(book => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.isbn}</td>
                <td>${book.available ? "Jā" : "Nē"}</td>
                <td>
                    <button class="action-btn" onclick="editBook(${book.id})">Labot</button>
                    <button class="action-btn delete" onclick="deleteBook(${book.id})">Dzēst</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function resetBookForm() {
        document.getElementById("bookForm").reset();
        document.getElementById("bookId").value = "";
        document.getElementById("formTitle").textContent = "Pievienot jaunu grāmatu";
        document.getElementById("cancelBtn").style.display = "none";
        editingId = null;
    }

    document.getElementById("bookForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const year = parseInt(document.getElementById("year").value, 10);
        const isbn = document.getElementById("isbn").value.trim();
        const available = document.getElementById("available").checked;

        if (!title || !author || !isbn || isNaN(year) || year < 0 || year > 2100) {
            alert("Lūdzu, aizpildiet visus laukus korekti!");
            return;
        }
        if (!/^[0-9\-]+$/.test(isbn)) {
            alert("ISBN drīkst saturēt tikai ciparus un defises.");
            return;
        }

        if (editingId) {
            // Update
            const book = books.find(b => b.id === editingId);
            book.title = title;
            book.author = author;
            book.year = year;
            book.isbn = isbn;
            book.available = available;
        } else {
            // Create
            books.push({
                id: Date.now(),
                title, author, year, isbn, available
            });
        }
        saveBooks();
        renderBooks();
        resetBookForm();
    });

    // Padarām funkcijas globālas
    window.editBook = function(id) {
        const book = books.find(b => b.id === id);
        document.getElementById("bookId").value = book.id;
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("year").value = book.year;
        document.getElementById("isbn").value = book.isbn;
        document.getElementById("available").checked = book.available;
        document.getElementById("formTitle").textContent = "Labot grāmatu";
        document.getElementById("cancelBtn").style.display = "inline";
        editingId = id;
    };

    window.deleteBook = function(id) {
        if (confirm("Vai tiešām dzēst šo grāmatu?")) {
            books = books.filter(b => b.id !== id);
            saveBooks();
            renderBooks();
            resetBookForm();
        }
    };

    document.getElementById("cancelBtn").addEventListener("click", resetBookForm);

    renderBooks();
}

// ====== AutorU CRUD ======
if (document.getElementById("authorsTable")) {
    var editingAuthorId = null;

    function renderAuthors() {
        const tbody = document.querySelector("#authorsTable tbody");
        tbody.innerHTML = "";
        authors.forEach(author => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${author.name}</td>
                <td>${author.birthYear}</td>
                <td>
                    <button class="action-btn" onclick="editAuthor(${author.id})">Labot</button>
                    <button class="action-btn delete" onclick="deleteAuthor(${author.id})">Dzēst</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function resetAuthorForm() {
        document.getElementById("authorForm").reset();
        document.getElementById("authorId").value = "";
        document.getElementById("authorFormTitle").textContent = "Pievienot jaunu autoru";
        document.getElementById("authorCancelBtn").style.display = "none";
        editingAuthorId = null;
    }

    document.getElementById("authorForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("authorName").value.trim();
        const birthYear = parseInt(document.getElementById("birthYear").value, 10);

        if (!name || isNaN(birthYear) || birthYear < 1800 || birthYear > 2100) {
            alert("Lūdzu, ievadiet korektu vārdu un dzimšanas gadu (1800-2100)!");
            return;
        }

        if (editingAuthorId) {
            // Update
            const author = authors.find(a => a.id === editingAuthorId);
            author.name = name;
            author.birthYear = birthYear;
        } else {
            // Create
            authors.push({
                id: Date.now(),
                name, birthYear
            });
        }
        saveAuthors();
        renderAuthors();
        resetAuthorForm();
    });

    window.editAuthor = function(id) {
        const author = authors.find(a => a.id === id);
        document.getElementById("authorId").value = author.id;
        document.getElementById("authorName").value = author.name;
        document.getElementById("birthYear").value = author.birthYear;
        document.getElementById("authorFormTitle").textContent = "Labot autoru";
        document.getElementById("authorCancelBtn").style.display = "inline";
        editingAuthorId = id;
    };

    window.deleteAuthor = function(id) {
        if (confirm("Vai tiešām dzēst šo autoru?")) {
            authors = authors.filter(a => a.id !== id);
            saveAuthors();
            renderAuthors();
            resetAuthorForm();
        }
    };

    document.getElementById("authorCancelBtn").addEventListener("click", resetAuthorForm);

    renderAuthors();
}
