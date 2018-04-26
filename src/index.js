const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const result = sentiment.analyze('Cats are stupid.');
console.log(`result of sentiment.analyze('Cats are stupid.') :`, result);
const commentNodes = document.querySelectorAll('div.entry');
console.log(`commentNodes`);
console.dir(commentNodes);
