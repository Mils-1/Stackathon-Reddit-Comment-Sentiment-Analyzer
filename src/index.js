const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const result = sentiment.analyze('Cats are stupid.');
console.log(`result of sentiment.analyze('Cats are stupid.') :`, result);

const commentNodeList = document.querySelectorAll('div.entry p');
const commentArr = Array.from(commentNodeList);
const filteredCommentArr = commentArr.filter(comment => {
  return comment.className.trim() !== 'tagline';
})
console.log(`filteredCommentArr`);
console.dir(filteredCommentArr);
const sentimentDataArr = filteredCommentArr.map(comment => {
  return sentiment.analyze(comment.innerText);
});
console.log(`sentimentDataArr`);
console.dir(sentimentDataArr);
// console.log(`--------------`);
// console.log(`textArr`);
// console.dir(textArr);

// TEST COMMENT
