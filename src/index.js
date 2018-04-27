const Sentiment = require('sentiment');
const sentiment = new Sentiment();

window.onload = function (event) {
  // const loadCommentLinksArr = Array.from(document.querySelectorAll('a.button'));
  // loadCommentLinksArr.forEach(link => {
  //   link.click();
  // });
  // console.dir(loadCommentLinksArr);
  const commentNodeArr = Array.from(document.querySelectorAll('div.entry p'));
  const filteredCommentArr = commentNodeArr.filter(comment => {
    return comment.className.trim() !== 'tagline';
  });

  console.log(`filteredCommentArr`);
  console.dir(filteredCommentArr);

  const sentimentDataArr = filteredCommentArr.map(comment => {
    return sentiment.analyze(comment.innerText);
  });

  console.log(`sentimentDataArr`);
  console.dir(sentimentDataArr);

  const convertRawSentimentDataToSummarizedData = arr => {
    const totalScore = arr.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);
    const averageScore = totalScore / arr.length;
    const positiveTokenObj = {};
    const negativeTokenObj = {};
    arr.forEach(comment => {
      comment.positive.forEach(token => {
        if (positiveTokenObj[token]) {
          positiveTokenObj[token]++;
        } else {
          positiveTokenObj[token] = 1;
        }
      });
      comment.negative.forEach(token => {
        if (negativeTokenObj[token]) {
          negativeTokenObj[token]++;
        } else {
          negativeTokenObj[token] = 1;
        }
      });
    });
    return {
      totalScore,
      averageScore,
      positiveTokenObj,
      negativeTokenObj
    };
  };

  const summarizedData = convertRawSentimentDataToSummarizedData(sentimentDataArr);
  console.log(`######## Converted Data ########`);
  console.log(summarizedData);
  chrome.storage.local.set({summarizedData});
}

