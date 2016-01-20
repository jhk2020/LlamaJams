import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/ConfigStore';
import routes from './routes/routes';

const store = configStore();

const node = (
  <Provider store={store}>
    {routes}
  </Provider>
)

ReactDOM.render(node, document.getElementById('app'));
