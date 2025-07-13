'use strict';
const btnNewBook = document.querySelector('.btn-new-book');
const form = document.querySelector('.form');
const ulBox = document.querySelector('.ul-list');
const title = document.querySelector('#title');
const autor = document.querySelector('#author');
const numberOfPages = document.querySelector('#nPages');
const checkRead = document.querySelector('#checkRead');
const overlay = document.querySelector('.overlay');
const btnIcon = document.querySelector('.icon');
const textBox = document.querySelector('.heading-primary');
const textBoxBottom = document.querySelector('.text-box');

let titleB;
let autorB;
let nPages;
let check;
const manager = bookManager();
function bookManager() {
  let books = [];
  const pushBook = book => books.push(book);
  const getBook = () => books;
  const deleteBook = ID => (books = books.filter(b => b.getId() !== ID));
  //
  function findBook(id) {
    const selectBook = books.find(b => b.getId() === id);
    selectBook.setIsCheck(!selectBook.getIsCheck());
  }

  return { pushBook, getBook, deleteBook, findBook };
}
function bookCreator(bookTitle, bookAutor, bookNumber, bookCheck) {
  const updateName = newName => (name = newName);
  const updateAutor = newAutor => (autor = newAutor);
  const updateNumberOfPages = newNumber => (numberOfPages = newNumber);
  let id = crypto.randomUUID();
  let name = bookTitle;
  let autor = bookAutor;
  let numberOfPages = bookNumber;
  let checked = bookCheck;

  const getId = () => id;
  const getName = () => name;
  const getAutor = () => autor;
  const getNumberOfPages = () => numberOfPages;
  const getIsCheck = () => checked;
  const setIsCheck = value => (checked = value);
  //
  return {
    getId,
    getName,
    getAutor,
    getNumberOfPages,
    getIsCheck,
    setIsCheck,
    updateName,
    updateAutor,
    updateNumberOfPages,
  };
}
btnIcon.addEventListener('click', function () {
  form.reset();
  form.classList.add('hidden');
  overlay.classList.add('hidden');
});
checkRead.addEventListener('input', function (e) {
  check = e.target.checked;
});
btnNewBook.addEventListener('click', function () {
  form.reset();
  check = false;
  form.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
title.addEventListener('input', function (e) {
  titleB = e.target.value;
});
autor.addEventListener('input', function (e) {
  autorB = e.target.value;
});
numberOfPages.addEventListener('input', function (e) {
  nPages = e.target.value;
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newBook = bookCreator(titleB, autorB, nPages, check);
  manager.pushBook(newBook);
  const books = manager.getBook();
  makeList(books);
});
//MAKE LIST
function makeList(books) {
  ulBox.innerHTML = '';
  if (books.length === 0) {
    addMargin();
    return;
  }
  books.forEach(function (book) {
    const html = `<li class="list-item" id=${book.getId()} >
            <p class="card-book-name">${book.getName()}</p>
            <p class="card-book-autor">${book.getAutor()}</p>
            <p class="card-page-number">${book.getNumberOfPages()}</p>
            <div class="card-btn">
              <button type="button" class="btn-read-un">${
                book.getIsCheck() ? 'Read ✔️' : 'Unread ❌'
              }</button>
              <button type="button" class="btn-delete">Delete Book</button>
              <button type="button" class="btn-edit">Edit</button>
            </div></li>`;

    ulBox.insertAdjacentHTML('afterbegin', html);
    form.classList.add('hidden');
    overlay.classList.add('hidden');
    marginTransition();
  });
}

//EDIT MODE
function editMode(book) {
  const list = document.getElementById(book.getId());
  list.innerHTML = '';
  list.classList.add('list-item');
  const html = `
            <input type="text" class="input-mode-edit-name">
            <input type="text" class="input-mode-edit-autor">
            <input type="text" class="input-mode-edit-pagesnumber">
            <div class="card-btn">
              <button type="button" class="btn-read_un">${
                book.getIsCheck() ? 'Read ✔️' : 'Unread ❌'
              }</button>
              <button type="button" class="delete-btn">Delete Book</button>
              <button type="button" class="finish-edit">Finish Editing</button>
            </div>`;
  list.insertAdjacentHTML('afterbegin', html);

  const name = document.querySelector('.input-mode-edit-name');
  const autor = document.querySelector('.input-mode-edit-autor');
  const numberOfPages = document.querySelector('.input-mode-edit-pagesnumber');

  name.value = `${book.getName()}`;
  autor.value = `${book.getAutor()}`;
  numberOfPages.value = `${book.getNumberOfPages()}`;

  name.addEventListener('input', function (e) {
    book.updateName(e.target.value);
  });
  autor.addEventListener('input', function (e) {
    book.updateAutor(e.target.value);
  });
  numberOfPages.addEventListener('input', function (e) {
    book.updateNumberOfPages(e.target.value);
  });

  form.classList.add('hidden');
  overlay.classList.add('hidden');
}
//UL BOX
ulBox.addEventListener('click', function (e) {
  const li = e.target.closest('.list-item');
  const books = manager.getBook();
  const oneBook = books.find(b => b.getId() === li.id);
  if (e.target.closest('.btn-delete')) {
    manager.deleteBook(li.id);
    makeList(manager.getBook());
  } else if (e.target.closest('.btn-read-un')) {
    manager.findBook(li.id);
    makeList(manager.getBook());
  } else if (e.target.closest('.btn-edit')) {
    editMode(oneBook);
  } else if (e.target.closest('.finish-edit')) {
    makeList(books);
  } else if (e.target.closest('.delete-btn')) {
    manager.deleteBook(li.id);
    makeList(manager.getBook());
  } else if (e.target.closest('.btn-read_un')) {
    manager.findBook(li.id);
    editMode(oneBook);
  }
});
function marginTransition() {
  textBox.style.marginTop = '50px';
  textBox.style.transition = '0.5s';
  textBoxBottom.style.marginBottom = '130px';
}
function addMargin() {
  textBox.style.marginTop = '150px';
  textBox.style.transition = '0.5s';
  textBoxBottom.style.marginBottom = '100px';
}
