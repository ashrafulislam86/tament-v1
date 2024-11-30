import { combineReducers } from 'redux';
import taskReducer from './TaskReducer';
import taskListReducer from './TaskListReducer';
import settingsReducer from './SettingsReducer';

const rootReducer = combineReducers({
  taskReducer,
  taskListReducer,
  settings : settingsReducer,
});

export default rootReducer;
