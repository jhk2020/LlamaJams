export default function configEvents (io) {
  io.on('connection', socket => {
    console.log('SOCKET CONNECTION FORMED')
    socket.on('playlist mounted', playlistCode => {
      console.log('playlist mounted', playlistCode, socket.rooms);
      socket.join(playlistCode);
      io.to(playlistCode).emit('receive socket', socket.id);
      console.log('playlist mounted', playlistCode, socket.rooms);
    })
    socket.on('add track', track => {
      console.log('track added in socket', track.playlistCode)
      io.to(track.playlistCode).emit('track added', track);
    })
    socket.on('upvote track', track => {
      console.log('track upvoted in socket', track.playlistCode)
      io.to(track.playlistCode).emit('track upvoted', track.trackId);
    })
    socket.on('downvote track', track => {
      console.log('track downvoted in socket')
      io.to(track.playlistCode).emit('track downoted', track.trackId);
    })
  });
}
