import * as React from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { View, FlatList, Alert } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { deleteTaskList, deleteTask } from '../../contexts/reducers';
import { useTasks } from '../../contexts/TaskProvider';
import NewListModal from './modals/NewListModal';

export default function ListOptions(props) {
  const { tasks } = useSelector(state => state.taskReducer);
  const { getListName,deleteTaskItem } = useTasks();
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false);
  return props.route.name === 'List' ? (
    <View style={{ padding: 6 }}>
      <List.Section title="List options">
        <List.Item
          onPress={() => {
            setVisible(true);
           // props.hideModal();
          }}
          title="Rename List"
        />
        {props.route.params.itemId ? (
          <List.Item
          onPress={() => {
            Alert.alert(
              'Delete list',
              'Are you sure you wants to delete this list ?',
              [
                {
                  text: 'Delete',
                  onPress: () => {
                    dispatch(deleteTaskList(props.route.params.itemId));
                    tasks
                      .filter((t) => t.list === props.route.params.itemId)
                      .forEach((ta) => deleteTaskItem(ta.id));
                    
                     props.hideModal();
                  },
                },
              ],
              {
                cancelable: true,
              }
            );
          }}
          title="Delete List"
        />
        ) : null}

        <List.Item
          onPress={() => {
            Alert.alert(
              'Delete all completed tasks',
              'Are you sure you wants to delete  all completed tasks ?',
              [
                {
                  text: 'Delete tasks',
                  onPress: () => {
                    tasks
                      .filter(
                        (ta) =>
                          ta.list === props.route.params.itemId &&
                          ta.complete === true
                      )
                      .map((t) => {
                        deleteTaskItem(t.id);
                      });
                     props.hideModal();
                  },
                },
              ],
              {
                cancelable: true,
              }
            );
          }}
          title="Delete  all completed tasks"
        />
      </List.Section>

        <NewListModal
        {...props}
        initialName={getListName(props.route.params.itemId)}
        id={props.route.params.itemId}
        visible={visible}
        hideNewListModal={() => setVisible(false)}
        />
         
    </View>
  ) : null;
}
