const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numOfPagesInput = document.getElementById("numOfPages");
const isReadInput = document.getElementById("isRead");
const bookGrid = document.getElementById("book-grid");
const bookForm = document.getElementById('book-form');
const dialog = document.getElementById('add-book');

const myLibrary = [
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', numOfPages: 310, isRead: true },
    {title: 'Dune', author: 'Frank Herbert', numOfPages: 412, isRead: false },
];

function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookTolibrary(title, author, numOfPages, isRead) {
    myLibrary.push({title, author, numOfPages, isRead});
    loadBooks();
}

function loadBooks() {
bookGrid.innerHTML = '';

myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add("book-card");

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
        if(!book.isRead) {
            book.isRead = true;
            readBtn.textContent = 'Read';
            readBtn.classList.add('is-read');
        } else {
            book.isRead = false;
            readBtn.textContent = 'Not read';
            readBtn.classList.remove('is-read');
        }
    })

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        loadBooks();
    });

    card.append(title, author, pages, readBtn, removeBtn);
    bookGrid.append(card);
})
}

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { title, author, numOfPages, isRead } = bookForm.elements;

    addBookTolibrary( title.value, author.value, Number(numOfPages.value), isRead.checked);

    bookForm.reset();
    dialog.close();
})

loadBooks();