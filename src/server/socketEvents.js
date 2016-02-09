import Playlist from './db/models/playlist';

export default function configEvents (io) {
  io.on('connection', socket => {

    socket.on('playlist mounted', playlistCode => {
      socket.join(playlistCode);
      io.to(socket.id).emit('receive socket', socket.id);

      io.to(playlistCode).emit('new guest entered');

      socket.on('current track', track => {
        socket.broadcast.to(track.playlistCode).emit('current track', track);
      });
    })

    socket.on('new current track', (track) => {
      socket.broadcast.to(track.playlistCode).emit('NEW current track', track);
    })

    socket.on('leave playlist', playlistCode => {
      socket.leave(playlistCode);
    })

    socket.on('add track', track => {
      Playlist.findOneAsync({ code: track.playlistCode })
        .then(function(playlist) {
          const added = playlist.queue.addToSet(track);
          playlist.saveAsync()
          .then(() => io.to(track.playlistCode).emit('track added', added[0]))
          .catch(err => console.error('error', err));
        })
        .catch(function(err) {
          console.error('Error saving playlist: ', err);
          throw err;
        });
    })

    socket.on('upvote track', track => {
      Playlist.findOneAsync({ code: track.playlistCode })
        .then(playlist => {
          let song = playlist.queue.id(track.id);
          song.vote++;
          playlist.saveAsync()
            .then(() => io.to(track.playlistCode).emit('track upvoted', track.id))
            .catch(err => console.error('error', err));
        })
        .catch(err => console.error('error', err));
    })

    socket.on('downvote track', track => {
      Playlist.findOneAsync({ code: track.playlistCode })
        .then(playlist => {
          let song = playlist.queue.id(track.id);
          song.vote--;
          playlist.saveAsync()
            .then(() => io.to(track.playlistCode).emit('track downvoted', track.id))
            .catch(err => console.error('error', err));
        })
        .catch(err => console.error('error', err));

    })

  });
}
