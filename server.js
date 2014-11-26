#!/usr/bin/env node
var debug = require('debug')('NodeJS-FAQ');
var app = require('./app');
var config = require('./config');
app.set('port', config.server.port || 18080);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log('NodeJS-FAQ Server is running at port '+ server.address().port); 
});
