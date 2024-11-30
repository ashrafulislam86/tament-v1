import crudReducer from '../utils/crudReducer';


export const taskListReducer = (state, action) =>
  crudReducer({
    state,
    action,
    obj: 'taskLists',
    add: 'ADD_TASKLIST',
    del: 'DELETE_TASKLIST',
    update: 'UPDATE_TASKLIST',
  });

export const taskReducer = (state, action) =>
  crudReducer({
    state,
    action,
    obj: 'tasks',
    add: 'ADD_TASK',
    del: 'DELETE_TASK',
    update: 'UPDATE_TASK',
  });

export const makeTaskSchema = (task) => ({
  priority: task.priority ?? 'p2',
  id: task.id ?? Date.now(),
  title: task.title ?? '',
  description: task.description ?? null,
  complete: false,
  subtask: task.subtask ?? false,
  dueDate: task.dueDate ?? null,
  reminder: task.reminder ?? null,
  timestamp: new Date(),
  parent: task.parent ?? null,
  list: task.list ?? null,
  //user: null,
});

export const makeTaskListSchema = (tasklist) => ({
  id: tasklist.id ?? Date.now(),
  name: tasklist.name,
  timestamp: new Date(),
});

// task actions

export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: makeTaskSchema(task),
});
export const updateTask = (id, updatedData) => ({
  type: 'UPDATE_TASK',
  payload: { id, updatedData },
});
export const deleteTask = (id) => ({ type: 'DELETE_TASK', id });

// task-list actions

export const addTaskList = (list) => ({
  type: 'ADD_TASKLIST',
  payload: makeTaskListSchema(list),
});
export const updateTaskList = (id, updatedData) => ({
  type: 'UPDATE_TASKLIST',
  payload: { id, updatedData },
});
export const deleteTaskList = (id) => ({ type: 'DELETE_TASKLIST', id });
