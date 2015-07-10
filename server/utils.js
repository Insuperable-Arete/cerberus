var Twitter = require('twitter');

////////
// !!! IMPORTANT !!! --> NEED TO HIDE TWITTER APP DATA BELOW
////////



exports.getTwitterData = function(req, res){

var client = new Twitter({
	consumer_key: 's0E55g1fs108kSjWVycCarT64',
	consumer_secret: 'LXYNAjWQcJ1UjpTrsPdmqWmdSAv5wTFNdYLhOVELFgFnE5OEXN',
	access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
	access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
});
	client.stream('statuses/filter', {track: 'Cuba'}, function(stream){

		stream.on('data', function(tweet){
			//can use : geo, place, coordinates, location
			// if (tweet.geo || tweet.place || tweet.coordinates || tweet.location){
			// 	console.log(tweet.geo);
			// 	console.log(tweet.place);
			// 	console.log(tweet.coordinates);
			// 	console.log(tweet.location);
			// }
			console.log(tweet.place);
		});

		stream.on('error', function(error){
			throw error;
		});
	});
};


exports.getFacebookData = function(req, res){

};


//https://stream.twitter.com/1.1/statuses/filter.json?