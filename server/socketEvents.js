export default function configEvents (io) {
  io.on('connection', socket => {
    socket.on('playlist mounted', playlistCode => {
      socket.emit('receive socket', socket.id);
      socket.join(playlistCode);
    })
    socket.on('add track', track => {
      socket.broadcast.to(track.get('playlist')).emit('track added', track);
    })
  });
}
