import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import routes from '../routes/routes';
import { syncHistory } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from '../middlewares/promiseMiddleware';


export default function configStore(history, initialState) {
  const reduxRouterMiddleware = syncHistory(history);
  const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware, promiseMiddleware)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  reduxRouterMiddleware.listenForReplays(store);
  return store;
}
