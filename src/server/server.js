'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import PrettyError from 'pretty-error';

// API
import apiRoutes from './API/routes';

// MONGODB
import mongoose from 'mongoose';
import bluebird from 'bluebird';
bluebird.promisifyAll(mongoose);
import config from './db/config';

// REACT SSR
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import configStore from '../common/store/configStore';
import { RouterContext, match } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from '../common/routes/routes';

// SOCKET.IO
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

if (process.env.NODE_ENV === 'development') {
  // WEBPACK
  var webpack = require('webpack');
  var webpackConfig = require('../../webpack.config.dev.js');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

/*------------------------------ BASIC CONFIG --------------------------------*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/../../static'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST')
  if ('OPTIONS' === req.method) {
    res.status(204).send();
  } else {
    next();
  }
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*----------------------------- API ROUTES -----------------------------------*/

app.use('/api', apiRoutes);

/*-------------------------------- SSR ---------------------------------------*/

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
        try {
          const componentHTML = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          );
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


const server = app.listen(port, function() {
  console.log('LISTENING ON:', port);
});

const io = new SocketIo(server, { path: '/api/queue'});
const startSocketEvents = socketEvents(io);
