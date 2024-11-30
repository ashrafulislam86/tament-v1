import * as Notifications from 'expo-notifications';
import crudReducer from '../utils/crudReducer';


const beforeUpdate = (prevData,updatedData) => {
  if(prevData.reminder) Notifications.cancelScheduledNotificationAsync(prevData.reminder)
  if(prevData?.dueDate?.date && !prevData.complete) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: prevData.title.toString(),
        body: prevData.description.toString(),
      },
      trigger: prevData.dueDate.date,
    }).then((identifier) => {
      prevData['reminder'] = identifier.toString()
      console.log('hjhh'+prevData['reminder'])
    })
  }
}


const beforeDelete = (item) => {
  if(item.reminder) Notifications.cancelScheduledNotificationAsync(item.reminder)
}


const initialTaskState = { 
  tasks: [] 
};

export default function taskReducer(state = initialTaskState, action) {
  return crudReducer({
    state,
    action,
    obj: 'tasks',
    add: 'ADD_TASK',
    del: 'DELETE_TASK',
    update: 'UPDATE_TASK',
    beforeUpdate,
  });
}

