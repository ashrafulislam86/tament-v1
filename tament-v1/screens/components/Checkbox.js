import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { updateTask } from '../../contexts/reducers';

export default function Checkbox(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.taskReducer);
  const icon = item.complete
    ? 'checkbox-marked-circle'
    : 'checkbox-blank-circle-outline';

  const priorityColors = {
    p1: Colors.blue500,
    p2: Colors.grey900,
    p3: Colors.red500,
  };

  const toggleComplete = () => {
    var update = (id, updatedData) => {
      if (!id) return;
      dispatch(updateTask(id, updatedData));
      var task = tasks.find((t) => t.id === id);
      if (task.subtask) {
        if (!tasks.find((t) => t.id === task.parent)) {
          dispatch(updateTask(id, { subtask: false, parent: null }));
        }
      }
    };

    update(item.id, { complete: !item.complete });

    const st = tasks.filter((tt) => tt.subtask && tt.parent === item.id) ?? [];
    st.forEach((ta) => update(ta.id, { complete: item.complete }));
  };



  Colors.green700 = '#24ec93'

  const getColor = () =>
    item.complete ? Colors.green700  : priorityColors[item.priority];

  return (
    <Pressable>
      <IconButton
        icon={icon}
        animated={true}
        onPress={toggleComplete}
        color={getColor()}
        size={props.size ?? 25}
      />
    </Pressable>
  );
}
