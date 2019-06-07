import { combineReducers } from 'redux';
import decklists from './decklists';
import ui from './ui';

export default combineReducers({
  decklists,
  ui,
});
