import crudReducer from '../utils/crudReducer';

const defaultList = { id: null, name: 'My Tasks' };

const initialListState = {
  taskLists: [defaultList],
};

export default function taskListReducer(state = initialListState, action) {
  return crudReducer({
    state,
    action,
    obj: 'taskLists',
    add: 'ADD_TASKLIST',
    del: 'DELETE_TASKLIST',
    update: 'UPDATE_TASKLIST',
  });
}
