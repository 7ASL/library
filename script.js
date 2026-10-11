const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numOfPagesInput = document.getElementById("numOfPages");
const isReadInput = document.getElementById("isRead");
const bookGrid = document.getElementById("book-grid");
const bookForm = document.getElementById('book-form');
const dialog = document.getElementById('add-book');

const myLibrary = [];

function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, numOfPages, isRead) {
    const book = new Book(title, author, numOfPages, isRead);
    myLibrary.push(book);
    loadBooks();
}

function loadBooks() {
bookGrid.innerHTML = '';

myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add("book-card");
    card.dataset.id = book.id;

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = "by " + book.author;

    const pages = document.createElement('p');
    pages.textContent = "Pages: " + book.numOfPages;

    const readBtn = document.createElement('button');
    readBtn.type = 'button';
    readBtn.textContent = book.isRead ? "Read" : "Not read";
    readBtn.classList.add('read-btn');
    if(book.isRead) {
        readBtn.classList.add('is-read');
    }
    readBtn.addEventListener('click', () => {
        book.toggleRead();
        readBtn.textContent = book.isRead ? 'Read' : 'Not read';
        readBtn.classList.toggle('is-read', book.isRead);
    })

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
        const bookIndex = myLibrary.findIndex((b) => b.id === card.dataset.id);
        myLibrary.splice(bookIndex, 1);
        loadBooks();
    });

    card.append(title, author, pages, readBtn, removeBtn);
    bookGrid.append(card);
})
}

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { title, author, numOfPages, isRead } = bookForm.elements;

    addBookToLibrary( title.value, author.value, Number(numOfPages.value), isRead.checked);

    bookForm.reset();
    dialog.close();
})

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('Dune', 'Frank Herbert', 412, false);
loadBooks();

// FOOTER
document.querySelector('#year').textContent = new Date().getFullYear();