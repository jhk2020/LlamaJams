import express from 'express';
import Playlist from '../db/models/playlist';

const apiRoutes = express.Router();

apiRoutes.post('/playlist', (req, res) => {
  const playlistCode = Math.random().toString(36).substr(2,5);
  const newPlaylist = new Playlist({
    title: req.body.playlistName,
    code: playlistCode
  });
  newPlaylist.saveAsync()
    .then(() => {
      console.log('New playlist saved successfully: ', newPlaylist);
      res.status(201).send({
        message: 'Playlist saved!',
        playlist: newPlaylist
      });
    })
    .catch(err => {
      if (err) {
        console.error('Error adding new playlist: ', pretty.render(err));
        res.status(400).send({ error: 'Error adding new playlist' });
      }
    });
});

apiRoutes.get('/playlist/:id', (req, res) => {
  Playlist.findOneAsync({ code: req.params.id })
    .then(playlist => {
      if (!playlist) {
        console.error('No playlist found!');
        res.status(500).send({ error: 'Playlist not found' });
        return;
      }
      console.log('Found playlist: ', playlist);
      res.status(200).send({
        message: 'Playlist found!',
        playlist: playlist
      })
    })
    .catch(err => {
      console.error('Error finding playlist: ', pretty.render(err));
      res.status(500).send({ error: 'Error finding playlist' });
    });
});

export default apiRoutes;
