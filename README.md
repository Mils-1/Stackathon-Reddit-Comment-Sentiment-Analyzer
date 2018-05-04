# Stackathon-Reddit-Comment-Sentiment-Analyzer

- This chrome extension will provide the user with a sentiment analysis of the comments for a particular reddit thread.

- Sentiment:
  - a view of or attitude toward a situation or event; an opinion.
  - a feeling or emotion

# Get Started

- Open a reddit comment thread of the form `reddit.com/*/comments/*`.
- Click the SA icon in the toolbar to see the results.

# How it Works

- This chrome extension manually fetches / scrapes 500 comments for a particular reddit thread. The fetched data is dependent on user configured settings.
- It feeds all of the comment data into the npm library [Sentiment](https://www.npmjs.com/package/sentiment).
- It finally summarizes this data and displays it in the popup window.

# Misc

- For best results one should login to their reddit account and edit their comments settings under the preferences tab. Increase the amount of comments being displayed to 500 which is currently the max allowed. If your account has gold you can load 1500 comments.
- This will drastically affect the word clouds.
