var app = require('./config.js');

var port = process.env.PORT || 1337;

app.listen(port);

console.log('Server listening on....', port);

module.exports = app;
