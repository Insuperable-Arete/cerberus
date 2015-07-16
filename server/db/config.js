//nodem modules
var mongoose = require('mongoose');
//mongoose config
mongoURI = 'mongodb://localhost/thesis'
mongoose.connect(mongoURI);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

//exports db for use in other files
module.exports = db;

