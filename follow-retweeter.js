

var util = require('util');
var twitter = require('twitter');

var twit = new twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

var hashtag = '#15below'
var hashtagRegex = new RegExp(hashtag, "i");

function write(data) {
	if ( typeof data === 'string') {
	    console.log(data);
	}
	else if (data.text && data.user && data.user.screen_name) {
	    console.log(data.user.screen_name + ": " + data.text);

		testForHashtag(data);
	}
	else if (data.delete) {
		console.log('DELETE');
	}
	else if (data.message) {
		console.log('ERROR' + data.message);
	}
	else {
		console.log(util.inspect(data));
	}
}

function testForHashtag(data) {
	if(data.retweeted) return;
    if (data.text.match(hashtagRegex) !== null) {
        var tweetId = data.id_str;
        console.log('retweet callback, tweetId: ' + tweetId);
        twit.post('statuses/retweet/' + tweetId, function (error, tweet, response) {
            var errorObj = util.inspect(error);
            var tweetObj = util.inspect(tweet);
            var responseObj = util.inspect(response);
            // do something if there are errors.
        });
    }
}

function reconnect() {
	setTimeout(startStreaming, 1000);
}

function startStreaming() {
    twit.stream('user', function (stream) {
		console.log('starting stream');
		stream.on('data', write);
		stream.on('end', reconnect);
	});
}

startStreaming();

console.log('lisening for tweets');