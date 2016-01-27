function configEvents (io) {
  io.on('connection', function(socket) {
    socket.on('playlist mounted', function() {
      socket.emit('receive socket', socket.id);
    })
  });
}

export default configEvents;
