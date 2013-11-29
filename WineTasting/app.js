
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
var tasting = require('./routes/tasting');
var wine = require('./routes/wine');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', tasting.list);
app.get('/users', user.list);

app.get('/tastings', tasting.list);
app.post('/tastings', tasting.create);
app.get('/tasting/:id', tasting.show);

app.get("/wines/new", wine.new);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
