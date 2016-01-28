export default function configEvents (io) {
  io.on('connection', socket => {
    console.log('SOCKET CONNECTION FORMED')
    socket.on('playlist mounted', playlistCode => {
      socket.emit('receive socket', socket.id);
      socket.join(playlistCode);
    })
    socket.on('add track', track => {
      socket.broadcast.to(track.playlistCode).emit('track added', track);
    })
    socket.on('upvote track', track => {
      socket.broadcast.to(track.playlistCode).emit('track upvoted', track.trackId);
    })
    socket.on('downvote track', track => {
      socket.broadcast.to(track.playlistCode).emit('track downoted', track.trackId);
    })
  });
}
