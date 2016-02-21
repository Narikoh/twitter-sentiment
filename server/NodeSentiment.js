var nodeSentiment = require('sentiment');

var sentiment = {};


//Send Tweet Text to Sentiment Analysis
sentiment.getSentiment = function(tweet, socket) {
  var tweetSentiment = nodeSentiment(tweet.text);

  if(tweetSentiment.score < 0) {
    tweetSentiment = 'negative';
  } else if(tweetSentiment.score > 0) {
    tweetSentiment = 'positive';
  } else {
    tweetSentiment = 'neutral';
  }

  sentiment.appendSentiment(tweet, tweetSentiment, socket);
};

//Construct New Tweet Object
//Send sentimentTweet to Client
sentiment.appendSentiment = function(tweet, sentiment, socket) {
  var sentimentTweet = {
    sentiment: sentiment,
    created_at: tweet.created_at,
    timestamp_ms: tweet.timestamp_ms,
    id_str: tweet.id_str,
    user: {
      name: tweet.user.name,
      screen_name: tweet.user.screen_name,
      profile_image_url_https: tweet.user.profile_image_url_https,
      location: tweet.user.location,
      time_zone: tweet.user.time_zone
    },
    text: tweet.text,
    lang: tweet.lang
  };
  
  console.log(sentimentTweet.text);

  // Send Tweet Object to Client
  socket.emit('sendTweet', {tweet: sentimentTweet}); //sendTweet to Client
};

module.exports = sentiment;