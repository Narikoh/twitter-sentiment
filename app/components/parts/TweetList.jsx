var React = require('react'),
    TweetCard = require('./TweetCard.jsx');

//TweetList Contains All Twitter Messages as Cards
//Uses TweetCard.jsx
var TweetList = React.createClass({
  render: function() {
    
    var tweetLoop = this.props.collectedTweets.map(function(mappedTweet) {
      return (<TweetCard tweet={mappedTweet} />);
    });

    return (
      <div className="tweet-list">
        {tweetLoop}
      </div>
    )
  }
});

module.exports = TweetList;