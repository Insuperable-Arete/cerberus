//nodem modules
var mongoose = require('mongoose');
//mongoose config
mongoURI = 'mongodb://localhost/thesis'
mongoose.connect(process.env.MONGOLAB_URI || mongoURI);

//opens initial connection
//Run in seperate terminal window using " mongod --dbpath . " in "./db" directory
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 //console.log('Mongodb connection open');
});

//exports db for use in other files
module.exports = db;
