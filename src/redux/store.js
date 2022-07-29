// configure aqui sua store
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootReducers from './reducers';

const store = createStore(rootReducers, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
