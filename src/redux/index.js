import { createStore } from 'redux';
import combinedReducers from './reducers';

export { actionCreators } from './actions';

export default createStore(combinedReducers);
