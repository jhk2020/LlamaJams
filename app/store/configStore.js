import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import routes from '../routes/routes';
import { syncHistory } from 'redux-simple-router';
import { browserHistory } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import apiMiddleware from '../middlewares/api';
import createLogger from 'redux-logger';

export default function configStore() {
  const logger = createLogger();
  const reduxRouterMiddleware = syncHistory(browserHistory);
  const createStoreWithMiddleware = applyMiddleware(thunk, logger, reduxRouterMiddleware, apiMiddleware)(createStore);
  const store = createStoreWithMiddleware(rootReducer);

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
