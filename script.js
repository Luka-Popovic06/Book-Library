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
