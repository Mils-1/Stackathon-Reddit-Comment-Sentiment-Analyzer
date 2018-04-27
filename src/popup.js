const pElem = document.getElementById('test123');

let commentData = null;
chrome.storage.local.get("summarizedData", (data) => {
  console.log(`data.summarizedData`, data.summarizedData);
  commentData = data.summarizedData;
  console.log(`commentData`, commentData);
  pElem.textContent = commentData.averageScore;
});

