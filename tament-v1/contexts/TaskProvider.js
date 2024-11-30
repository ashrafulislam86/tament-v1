import * as React from 'react';
import {
  taskReducer,
  taskListReducer,
  updateTask,
  deleteTask,
} from './reducers';
import * as Notifications from 'expo-notifications'
import { useDispatch,useSelector } from 'react-redux'
import {isToday,isOverdue,isTomorrow} from '../utils/dateUtils'

const TaskContext = React.createContext();

export const useTasks = () => React.useContext(TaskContext);


export default function TaskListProvider({ children }) {
  const dispatch = useDispatch()
  const { taskLists } = useSelector(state => state.taskListReducer)
  const { tasks } = useSelector(state => state.taskReducer)

  const getListName = (id) => {
    var list = taskLists.find((l) => l.id === id);
    return list ? list.name : 'My Tasks';
  };

  const deleteTaskItem = (id) => {
    dispatch(deleteTask(id));
    var tt = tasks.find(tt => tt.id == id)
    console.log(tt)
    Notifications.cancelScheduledNotificationAsync(tt.reminder).catch(e => console.warn('kkktrt '+e))
    const stasks =
      tasks.filter((t) => t.subtask && t.parent === id) ?? [];
    stasks.forEach((ta) => {
      dispatch(deleteTask(ta.id))
      Notifications.cancelScheduledNotificationAsync(ta.reminder).catch(e => console.warn('kkk '+e))
    });
  };

  const getSubtasks = (taskId) => {
    const st = tasks.filter((ta) => ta.parent === taskId && ta.subtask)
    return st
  };

  const getCompleted = () => tasks.filter(tas => tas.complete)
  const getOverdue = () => tasks.filter(ta => !ta.complete && ta.dueDate && isOverdue(ta?.dueDate?.date))


  const value = {
    getListName,
    getSubtasks,
    getCompleted,
    getOverdue,
    deleteTaskItem
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
