
/**
 * Module dependencies.
 */

var SITE_SECRET = "this is a very secret key";

var express = require('express');
var user = require('./routes/user');
var tasting = require('./routes/tasting');
var wine = require('./routes/wine');
var http = require('http');
var path = require('path');
var comm = require('./comm');

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

var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();

app.use(express.cookieParser());
app.use(express.session({
    secret: SITE_SECRET,
    key: "express.sid",
    store: sessionStore,
}));

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

function parseSignedSessionId(cookie) {
    var end = cookie.indexOf(".");
    return cookie.substr(2, end-2);
}

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var cookie = require('cookie');

io.set('authorization', function (data, accept) {

    if (data.headers.cookie) {
        data.cookie = cookie.parse(data.headers.cookie);
        data.sessionID = parseSignedSessionId(data.cookie['express.sid']);

        sessionStore.get(data.sessionID, function (err, session) {
            if( err ) {
                return accept("Error: " + err, false);
            } else if (!session) {
                // if we cannot grab a session, turn down the connection
                return accept('Error', false);
            } else {
                // save the session data and accept the connection
                data.session = session;
                return accept(null, true);
            }
        });

    } else {
       return accept('No cookie transmitted.', false);
    }
});


comm.start(io);