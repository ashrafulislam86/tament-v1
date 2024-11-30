import * as React from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import Checkbox from './Checkbox';
import { updateTask, deleteTask } from '../../contexts/reducers';
import { useTasks } from '../../contexts/TaskProvider';

export default function Subtask(props) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const { deleteTaskItem } = useTasks();
  const { item } = props;

  const titleStyle = {
    textDecorationLine: item.complete ? 'line-through' : '',
    flex: 1,
  };

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <Checkbox {...props} />
      <TextInput
        defaultValue={item.title}
        style={titleStyle}
        onChangeText={(text) =>
          dispatch(updateTask(item.id, { title: text }))
        }
      />

      {item.complete ? (
        <IconButton
          icon="delete"
          color="#424242"
          size={22}
          onPress={() => deleteTaskItem(item.id)}
        />
      ) : null}
    </View>
  );
}
