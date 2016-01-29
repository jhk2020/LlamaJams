import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import routes from '../routes/routes';
import { syncHistory } from 'redux-simple-router';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from '../middlewares/promiseMiddleware';


export default function configStore(history, initialState) {
  const logger = createLogger();
  const reduxRouterMiddleware = syncHistory(history);
  const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware, promiseMiddleware)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  reduxRouterMiddleware.listenForReplays(store);
  console.log(store.getState())
  return store;
}
