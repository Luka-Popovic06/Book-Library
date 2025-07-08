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
//
let book = [];
let titleB;
let autorB;
let nPages;
let check;

function bookCreator(inputName, inputAutor, inputNumberOfPages, inputIsCheck) {
  let id = crypto.randomUUID();
  let name = inputName;
  let autor = inputAutor;
  let nuberOfPages = inputNumberOfPages;
  let check = inputIsCheck;
  const getIsCheck = () => check;
  const setIsCheck = value => (check = value);
  return { id, name, autor, nuberOfPages, getIsCheck, setIsCheck };
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
  console.log(newBook);
  book.push(newBook);
  console.log(book);
  makeList();
});
function makeList() {
  ulBox.innerHTML = '';
  book.forEach(function (book) {
    const html = `<li class="list-item" id=${book.id}>
            <p class="card-book-name">${book.name}</p>
            <p class="card-book-autor">${book.autor}</p>
            <p class="card-page-number">${book.nuberOfPages}</p>
            <div class="card-btn">
              <button type="button" class="btn-read-un">${
                book.getIsCheck() ? 'Read' : 'Unread'
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
