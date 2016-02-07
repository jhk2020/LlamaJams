import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import path from 'path';
bluebird.promisifyAll(mongoose);

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
  console.error('Connection Error!', pretty.render(err));
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
app.use('/static', express.static(__dirname + '/../public'));
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
  newPlaylist.saveAsync()
    .then(function() {
      console.log('New playlist saved successfully: ', newPlaylist);
      res.status(201).send({
        message: 'Playlist saved!',
        playlist: newPlaylist
      });
    })
    .catch(function(err) {
      if (err) {
        console.error('Error adding new playlist: ', pretty.render(err));
        res.status(400).send({ error: 'Error adding new playlist' });
      }
    });
});

apiRoutes.get('/playlist/:id', function(req, res) {
  Playlist.findOneAsync({ code: req.params.id })
    .then(function(playlist) {
      console.log(playlist)
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
    .catch(function(err) {
      console.error('Error finding playlist: ', pretty.render(err));
      res.status(500).send({ error: 'Error finding playlist' });
    });
});

app.use('/api', apiRoutes);

/*---------------------------- SSR MIDDLEWARE --------------------------------*/

app.use((req, res) => {
  const history = createHistory();
  const location = createLocation(req.originalUrl);
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
      console.log('BEFORE LOAD ON SERVER: ', store.getState())
      function fetchComponentData(dispatch, components, params) {
        const componentsWithFetchData = components.filter(component => {
          if (!component) {
            return false;
          } else {
            return Boolean(component.fetchData ? component.fetchData
              : (component.WrappedComponent ? component.WrappedComponent.fetchData : null));
          }
        });
        const promises = componentsWithFetchData.map(component => dispatch(component.fetchData(params)));
        return Promise.all(promises);
      }
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        console.log('AFTER LOAD ON SERVER', store.getState())
        try {
          const componentHTML = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          );
          console.log('componentHTML ', componentHTML)
          const initialState = escape(JSON.stringify(store.getState()));
          res.render('index', { componentHTML, initialState });
        }
        catch(e) {
          console.error('error: ', pretty.render(e));
          throw e;
        }
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function() {
  console.log('LISTENING ON:', PORT);
});

const io = new SocketIo(server, { path: '/api/queue'});
const startSocketEvents = socketEvents(io);
