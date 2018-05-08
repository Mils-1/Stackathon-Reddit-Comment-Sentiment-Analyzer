const Sentiment = require('sentiment');
const sentiment = new Sentiment();

window.onload = function (event) {

  // Fetch comment paragraphs from Reddits DOM
  const commentNodeArr = Array.from(document.querySelectorAll('div.entry p'));
  const filteredCommentArr = commentNodeArr.filter(comment => {
    return comment.className.trim() !== 'tagline';
  });

  const sentimentDataArr = filteredCommentArr.map(comment => {
    return sentiment.analyze(comment.innerText);
  });

  const convertRawSentimentDataToSummarizedData = arr => {
    const totalScore = arr.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);
    const averageScore = parseFloat(totalScore / arr.length).toFixed(2);
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

    //Profanity Filter
    const profanityList = ['fucking', 'fuck', 'fucked', 'fuckin', 'shit', 'bitch', 'ass'];

    negativeTokenArr = negativeTokenArr.filter(token => {
      return !profanityList.includes(Object.values(token)[0]);
    })

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
  chrome.storage.local.set({ summarizedData });
}

