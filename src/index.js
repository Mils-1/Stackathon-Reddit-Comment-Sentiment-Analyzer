const Sentiment = require('sentiment');
const sentiment = new Sentiment();

window.onload = function (event) {

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
    let positiveTokenArr = [];
    let negativeTokenArr = [];
    for (let key in positiveTokenObj) {
      if (positiveTokenObj.hasOwnProperty(key)) {
        positiveTokenArr.push({ [positiveTokenObj[key]]: key })
      }
    }
    for (let key in negativeTokenObj) {
      if (negativeTokenObj.hasOwnProperty(key)) {
        negativeTokenArr.push({ [negativeTokenObj[key]]: key })
      }
    }

    //Remove all words where count is less than 2
    positiveTokenArr = positiveTokenArr.filter(token => {
      return Object.keys(token)[0] >= 2;
    });
    negativeTokenArr = negativeTokenArr.filter(token => {
      return Object.keys(token)[0] >= 2;
    });

    const d3PositiveTokenArr = positiveTokenArr.map(obj => {
      const size = Number(Object.keys(obj)[0]);
      const text = Object.values(obj)[0];
      return { text, size };
    });

    const d3NegativeTokenArr = negativeTokenArr.map(obj => {
      const size = Number(Object.keys(obj)[0]);
      const text = Object.values(obj)[0];
      return { text, size };
    });

    return {
      totalScore,
      averageScore,
      d3PositiveTokenArr,
      d3NegativeTokenArr
    };
  };

  const summarizedData = convertRawSentimentDataToSummarizedData(sentimentDataArr);
  console.log(`######## Converted Data ########`);
  console.log(summarizedData);
  chrome.storage.local.set({summarizedData});
}

