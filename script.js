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
  return { getId, getName, getAutor, getNumberOfPages, getIsCheck, setIsCheck };
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
                book.getIsCheck() ? 'Read' : 'Unread ❌'
              }</button>
              <button type="button" class="btn-delete">Delete Book</button>
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
  if (e.target.closest('.btn-delete')) {
    manager.deleteBook(li.id);
  } else if (e.target.closest('.btn-read-un')) {
    manager.findBook(li.id);
  }
  const books = manager.getBook();
  makeList(books);
});
