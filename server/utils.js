var Twitter = require('twitter');

////////
// !!! IMPORTANT !!! --> NEED TO HIDE TWITTER APP DATA BELOW
////////

var client = new Twitter({
	consumer_key: 's0E55g1fs108kSjWVycCarT64',
	consumer_secret: 'LXYNAjWQcJ1UjpTrsPdmqWmdSAv5wTFNdYLhOVELFgFnE5OEXN',
	access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
	access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
});

exports.getTwitterData = function(req, res){


	// client.get('favorites/list', function(error, tweets, response){
	//   if(error) throw error;
	//   console.log(response);  // The favorites. 
	//   res.send(response);
	// });

	client.stream('statuses/filter', {track: 'giants'}, function(stream){

		stream.on('data', function(tweet){
			console.log(tweet)
		});

		stream.on('error', function(error){
			throw error;
		});
	});

};


exports.testFunction = function(req, res){
	console.log('hello');
	res.send('hello');
};

//https://stream.twitter.com/1.1/statuses/filter.json?