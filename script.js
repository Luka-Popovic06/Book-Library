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
//napravi funkciju bookManager
//U nju stavu array books
//I napravi funkcije za dodavanje i brisanje iz array-a
//let book = [];
let titleB;
let autorB;
let nPages;
let check;

function bookManager() {
  let books = [];
  let selectBook;
  const pushBook = book => books.push(book);
  const getBook = () => books;
  const deleteBook = ID => (books = books.filter(b => b.getId() !== ID));
  const findBook = ID => (selectBook = books.find(b => b.getId() === ID));
  const getSelectBook = () => selectBook;
  return { pushBook, getBook, deleteBook, findBook, getSelectBook };
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
  const book = bookManager();
  //console.log(book);
  book.pushBook(newBook);
  const king = book.getBook();
  //book.push(newBook);
  makeList(king);
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
  const book = bookManager();
  if (e.target.closest('.btn-delete')) {
    book.deleteBook(li.id);
  } else if (e.target.closest('.btn-read-un')) {
    //const selectBook = findBook.find(b => b.getId() === li.id);
    const booker = book.findBook(li.id);
    booker.setIsCheck(!booker.getIsCheck());
  }
  makeList();
});
