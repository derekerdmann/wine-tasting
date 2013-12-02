
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

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTYUIOP'}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', tasting.list);

app.get('/tastings', tasting.list);
app.post('/tastings', tasting.create);
app.get('/tasting/:id', tasting.show);
app.post('/tasting/:id', tasting.update);

app.get("/wines", wine.list);
app.get("/wines/new", wine.new);
app.post("/wines", wine.create);
app.get("/wine/:id", wine.show);

app.get("/users/new", user.new);
app.post("/users/new", user.create);
app.get("/users/logout", user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
