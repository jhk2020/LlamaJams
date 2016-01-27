import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import path from 'path';
bluebird.promisifyAll(mongoose);

import jwt from 'jsonwebtoken';
import config from './db/config';
import Playlist from './db/models/playlist';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';
import PrettyError from 'pretty-error';

import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import configStore from '../app/store/configStore';
import { RouterContext, match } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from '../app/routes/routes';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import SocketIo from 'socket.io';
import socketEvents from './socketEvents';

const pretty = new PrettyError();
const port = process.env.PORT || 5000;
mongoose.connect(config.database);
mongoose.connection.on('error', function(err) {
  console.error('Connection Error!', err);
});

const app = express();

/*-------------------------------- WEBPACK -----------------------------------*/

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

/*------------------------------- MIDDLEWARE ---------------------------------*/


app.set('secret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*---------------------------- API ROUTES -----------------------------------*/

var apiRoutes = express.Router();

apiRoutes.post('/playlist', function(req, res) {
  var playlistCode = Math.random().toString(36).substr(2,5);
  var newPlaylist = new Playlist({
    title: req.body.playlistName,
    code: playlistCode
  });
  newPlaylist.save(function(err) {
    if (err) {
      console.error('Error adding new playlist: ', err);
      return;
    }
    console.log('New playlist saved successfully: ', newPlaylist);

    var token = jwt.sign({
      playlistName: newPlaylist.title,
      playlistCode: newPlaylist.code
    }, app.get('secret'),
    { expiresIn: '1d' });

    res.status(201).send({
      message: 'Playlist saved!',
      token: token,
      playlist: newPlaylist
    });
  });
});

apiRoutes.get('/playlist', function(req, res) {
  console.log('body data: ', req.query)
  Playlist.findOneAsync({ code: req.query.code })
    .then(function(playlist) {
      console.log('Found playlist: ', playlist);
      res.status(200).send({
        message: 'Playlist found!',
        queue: playlist.queue
      })
    })
    .catch(function(err) {
      console.error('Error finding playlist: ', err);
    })
});


apiRoutes.put('/playlist', function(req, res) {
  Playlist.findOneAndUpdateAsync({ code: req.body.data.code }, { queue: req.body.data.queue })
    .then(function(numbersAffected) {
      res.status(201).send({
        message: 'Playlist saved!'
      })
    })
    .catch(function(err) {
      console.error('Error saving playlist: ', err);
      res.status(400).send({error: 'Playlist not saved'})
    })
});

app.use('/api', apiRoutes);

/*---------------------------- SSR MIDDLEWARE --------------------------------*/

app.use((req, res) => {
  const history = createHistory();
  const location = createLocation(req.url);
  const routes = getRoutes();
  const store = configStore(history);


  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR: ', pretty.render(error));
      return res.status(500).send(error.message);
    } else if (!renderProps) {
      return res.status(404).send('Not found.');
    } else if (renderProps) {
      loadOnServer(renderProps, store).then(() => {
        const componentHTML = renderToString(
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps}/>
          </Provider>
        );

        const initialState = escape(JSON.stringify(store.getState()));

        res.render('index', { componentHTML, initialState });
      });

    }
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function() {
  console.log('LISTENING ON:', PORT);
});

const io = new SocketIo(server, { path: '/api/queue'})
const startSocketEvents = socketEvents(io);
