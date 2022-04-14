'use strict';

const quoteBox = document.querySelector('.quote');
const author = document.querySelector('.authorName');
const newQuoteBtn = document.querySelector('.btn');
class randomQuotes {
  constructor() {
    this.showNewQuote();
  }
  showNewQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        quoteBox.textContent = data.content;
        author.textContent = data.author;
      });
  }
}
const app = new randomQuotes();

newQuoteBtn.addEventListener('click', app.showNewQuote);
