# LlamaJams
In an effort to deepen my understanding of architecting an app with react and redux, I've built LlamaJams, a virtual jukebox using SoundCloud API.

## Features
Following technologies are used:
- [React](https://facebook.github.io/react/)
- [Redux](https://github.com/rackt/redux) for flux architecture
- [Express](http://expressjs.com/)
- MongoDB + [Mongoose](http://mongoosejs.com/)
- [React-Router](https://github.com/rackt/react-router)
- [React-Router-Redux](https://github.com/rackt/react-router-redux) to manage router state in redux store
- [Redux-Thunk](https://github.com/gaearon/redux-thunk) for async/conditional redux actions
- [Immutable.js](https://facebook.github.io/immutable-js/) for immutable state operations
- [Socket.io](http://socket.io/) for real-time updates to the queue
- [Superagent](https://visionmedia.github.io/superagent/) to make ajax requests from the server (for server-side rendering)
- [Webpack](http://webpack.github.io/) for bundling
- [Babel](http://babeljs.io/) to use es6 and JSX


### Server-Side rendering
Main logic for server-side rendering exists on the server:
```js
app.use((req, res) => {
  const history = createHistory();
  const location = createLocation(req.originalUrl);
  const routes = getRoutes();
  const store = configStore(history);

  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    ...
    } else if (renderProps) {
      ...
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

```
Server matches the location with the provided routes to determine which component to render, then fetches component data using a static method (only used for `Playlist` component):

```js
export default class Playlist extends Component {
  static fetchData(params) {
    return loadPlaylist(params.id);
  }
  ...
```
After hydrating the state with the correct playlist info (i.e. playlist name, code, tracks in the queue, etc.), the server sends back the HTML with the state attached as `window.__INITIAL_STATE__`.

### Socket.io
Used for real-time updates when guests add/upvote/downvote tracks to the playlist. Socket events are initialized in `src/server/server.js` and configured in `src/server/socketEvents.js`. On the client-side, socket is created in `playlistContainer` and passed down as prop to `playlist`, where listeners are attached in `componentDidMount`.

### Responsive Design
LlamaJams leverages media queries and flexbox for responsive web design. More work has to be done to have it be consistent across browsers.

## Development
```
npm run dev
```
Then point your browser to `localhost:5000`.

## Production
```
npm run build
npm start
```

## TODOS
- [BUG]: Render error page when wrong code is submitted from the URL
- [BUG]: Implement express-session to remember playlist ownership (i.e. to provide playback functionality if owner)
- [BUG]: Update new guests on current track, plus when current track changes
- Cross-browser support for CSS
- CSS clean-up and more animations in general for cleaner UX
