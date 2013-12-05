var sockets = {};

var messages = [];

exports.start = function(io) {
  io.sockets.on('connection', function (socket) {

      var user = socket.handshake.session.user;

      socket.emit('connected', user);
      for( var i = 0, len = messages.length; i < len; ++i ) {
        socket.emit("comment", messages[i]);
      }

      // Save socket
      var id = socket.id;
      console.log("socket " + id + " connected");
      sockets[id] = socket;

      socket.on('comment', function (data) {
          messages.push(data);
          for( var s in sockets ) {
              console.log("comment: " + data);
              sockets[s].emit("comment", data);
          }
      });

  });
}