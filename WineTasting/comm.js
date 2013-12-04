var sockets = {};

exports.start = function(io) {
  io.sockets.on('connection', function (socket) {
    socket.emit('connected');

    // Save socket
    var id = socket.id;
    console.log("socket " + id + " connected");
    sockets[id] = socket;

    socket.on('comment', function (data) {
        console.log("comment: " + data);
        socket.emit("comment", data);
    });

  });
}