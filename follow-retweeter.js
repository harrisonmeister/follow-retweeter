

var util = require('util');
var twitter = require('twitter');

var twit = new twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

twit.stream('15below_tech', {track:'nodejs'}, function(stream) {
	stream.on('data', function(data){
		console.log(util.inspect(data));
	});
});