//Require Dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    Twit = require('twit'),
    datum = require('datumbox').factory('3f370865e56303cf6f145aa40485f1f0'),
    config = require('./config');

//Create Express Instance, Router Instance, Twitter Instance
var app = express(),
    router = express.Router(),
    parseJson = bodyParser.json(),
    T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

var keyword = '';


//POST Router /api, then Send Streaming API
router.post('/', parseJson, function(req, res) {

  var stream = T.stream('statuses/filter', {language: 'en', track: keyword});
  var sentimentHolder = [];

  keyword = req.body.query;

  console.log(req.body.query);

  

  //Turn on Twitter Stream
  stream.on('tweet', function(tweet) {
    socket.emit('sendTweet', {tweet: tweet});

    //console.log('collecting data');
    console.log('Collected Tweet: ' + tweet.text);
    
    //getSentiment(tweet);
  });


  


  // function getSentiment(tweet) {
  //   //Send Tweet Text to Sentiment API
  //   datum.twitterSentimentAnalysis(tweet.text, function(err, data) {
  //     if (err) {
  //       console.log(err);
  //     }
      
  //     appendSentiment(tweet, data);
  //     /*console.log('Sentiment is: ' + data);*/
  //   });
  // }


  // function appendSentiment(tweet, sentiment) {
  //   sentimentHolder.push( {
  //     sentiment: sentiment,
  //     created_at: tweet.created_at,
  //     timestamp_ms: tweet.timestamp_ms,
  //     id_str: tweet.id_str,
  //     user: {
  //       screen_name: tweet.user.screen_name,
  //       profile_image_url: tweet.user.profile_image_url,
  //       location: tweet.user.location,
  //       time_zone: tweet.user.time_zone
  //     },
  //     text: tweet.text,
  //     lang: tweet.lang
  //   });


  //   if(sentimentHolder.length === 5) {
      
  //     stream.stop();

  //     res.send(sentimentHolder);
  //   }

  //   console.log('pushing sentiment');
  //   console.log(sentimentHolder.length);

  // }

}); //End router.post

module.exports = router;

