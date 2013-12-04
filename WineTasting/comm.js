var sockets = {};

exports.start = function(io) {
  io.sockets.on('connection', function (socket) {

      var user = socket.handshake.session.user;

      socket.emit('connected', user);

      // Save socket
      var id = socket.id;
      console.log("socket " + id + " connected");
      sockets[id] = socket;

      socket.on('comment', function (data) {
          for( var s in sockets ) {
              console.log("comment: " + data);
              sockets[s].emit("comment", data);
          }
      });

  });
}