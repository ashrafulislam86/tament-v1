import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { useTasks } from '../../contexts/TaskProvider';

const Item = (props) => (
  <List.Item
    title={props.item.name}
    style={{backgroundColor : props.active ? 'rgba(0,0,0,.123)' : ''}}
    left={(props) => (
      <List.Icon {...props} icon="format-list-bulleted" color="#2196f3" />
    )}
    onPress={() => {
      props.hideModal();
      props.navigation.navigate('List', { itemId: props.item.id });
    }}
  />
);

const ITEM = { id: null, name: 'My Tasks' };

{/* <Item {...props} item={ITEM} /> */}

export default function TaskList(props) {
  const { taskLists } = useSelector(state => state.taskListReducer);
  
  return (
    <>
      <FlatList
        data={taskLists}
        renderItem={({ item }) => <Item {...props} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
