import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// we need to detect data loaded before reloading
export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
}