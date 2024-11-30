import * as React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import { TextInput, Button, Dialog, Chip } from 'react-native-paper';
import { addTaskList,updateTaskList } from '../../contexts/reducers';
import { useTasks } from '../../contexts/TaskProvider';

export default function ListForm(props) {
  const [name, setName] = React.useState(() => props.initialName ?? '');
  const dispatch = useDispatch();

  function onSubmit() {
    if (!name) return;

    var id = props.initialName ? props.id : Date.now();
    var action = props.initialName ? updateTaskList(props.id,{name}) : addTaskList({ id, name })
    dispatch(action);

    props.hideNewListModal();
    props.navigation.navigate('List', {
      itemId: id,
    });
  }

  return (
    <View style={{ padding: 6 }}>
      <TextInput
        value={name}
        label="name"
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />
      <Dialog.Actions>
        <Button style={{ marginTop: 6 }} mode="contained" onPress={onSubmit}>
          save
        </Button>
      </Dialog.Actions>
    </View>
  );
}
