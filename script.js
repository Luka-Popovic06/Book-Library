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
  const updateName = newName => (name = newName);
  const updateAutor = newAutor => (autor = newAutor);
  const updateNumberOfPages = newNumber => (numberOfPages = newNumber);
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
  console.log(check);
  const newBook = bookCreator(titleB, autorB, nPages, check);
  manager.pushBook(newBook);
  const books = manager.getBook();
  makeList(books);
});
function makeList(books) {
  ulBox.innerHTML = '';
  books.forEach(function (book) {
    const html = `<li class="list-item" id=${book.getId()}>
            <p class="card-book-name">${book.getName()}</p>
            <p class="card-book-autor">${book.getAutor()}</p>
            <p class="card-page-number">${book.getNumberOfPages()}</p>
            <div class="card-btn">
              <button type="button" class="btn-read-un">${
                book.getIsCheck() ? 'Read ✔️' : 'Unread ❌'
              }</button>
              <button type="button" class="btn-delete">Delete Book</button>
              <button type="button" class="btn-edit">Edit</button>
            </div>`;
    ulBox.insertAdjacentHTML('afterbegin', html);
    form.classList.add('hidden');
    overlay.classList.add('hidden');
    marginTransition();
  });
}

function marginTransition() {
  textBox.style.marginTop = '50px';
  textBox.style.transition = '0.5s';
  textBoxBottom.style.marginBottom = '130px';
}
ulBox.addEventListener('click', function (e) {
  const li = e.target.closest('.list-item');
  const books = manager.getBook();
  if (e.target.closest('.btn-delete')) {
    manager.deleteBook(li.id);
    makeList(books);
  } else if (e.target.closest('.btn-read-un')) {
    manager.findBook(li.id);
    makeList(books);
  } else if (e.target.closest('.btn-edit')) {
    editMode(books);
  } else if (e.target.closest('.finish-edit')) {
    //const boo = manager.getBook();
    //const boo = books.find(b => b.getId() === li.id);
    const creator = bookCreator(titleB, autorB, nPages, check);
    const nameInput = li.querySelector('.input-mode-edit-name');
    const autorInput = li.querySelector('.input-mode-edit-autor');
    const pagesInput = li.querySelector('.input-mode-edit-pagesnumber');

    creator.updateName(nameInput.value);
    creator.updateAutor(autorInput.value);
    creator.updateNumberOfPages(pagesInput.value);

    makeList(books);
  }
});
function editMode(books) {
  ulBox.innerHTML = '';
  books.forEach(function (book) {
    const html = `<li class="list-item" id=${book.getId()}>
            <input type="text" class="input-mode-edit-name">
            <input type="text" class="input-mode-edit-autor">
            <input type="text" class="input-mode-edit-pagesnumber">
            <div class="card-btn">
              <button type="button" class="btn-read-un">${
                book.getIsCheck() ? 'Read ✔️' : 'Unread ❌'
              }</button>
              <button type="button" class="btn-delete">Delete Book</button>
              <button type="button" class="finish-edit">Finish Editing</button>
            </div>`;
    ulBox.insertAdjacentHTML('afterbegin', html);
    //
    const name = document.querySelector('.input-mode-edit-name');
    const autor = document.querySelector('.input-mode-edit-autor');
    const numberOfPages = document.querySelector(
      '.input-mode-edit-pagesnumber'
    );
    name.value = `${book.getName()}`;
    autor.value = `${book.getAutor()}`;
    numberOfPages.value = `${book.getNumberOfPages()}`;

    //const btnFinish = document.querySelector('.finish-edit');
    //btnFinish.addEventListener('click', makeList(books));
    form.classList.add('hidden');
    overlay.classList.add('hidden');
    marginTransition();
  });
}
/*dodati jos jedno dugme na knjigu edit
kad se to dugme stisne na mesto gde su bili naslov... treba da se pojave inputi koji ce imati te vrednosti
Nakon sto se edit stisne to dugme edit treba da se pretvori u dugme finishEditing
A kad se ono stisne knjiga se vraca na staro sa novim vrednostima
 */
