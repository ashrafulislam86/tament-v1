import * as React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button, Appbar, FAB, Colors, useTheme } from 'react-native-paper';
import { addTask } from '../../../contexts/reducers';

import { useDispatch } from 'react-redux';

export default function TaskForm(props) {
  const [data, setData] = React.useState({
    title: '',
    subtask: true,
    parent: props.parent,
    list: props.listId ?? null,
  });

  const dispatch = useDispatch();
  const theme = useTheme();

  const handleChange = (key, val) => {
    var newData = { ...data };
    newData[key] = val;
    setData(newData);
  };

  function onSubmit() {
    if (!data.title) return;
    dispatch(addTask(data));
    setData((prev) => ({
      ...prev,
      title: '',
    }));
  }

  return (
    <View style={{ padding: 6, flexDirection: 'row' }}>
      <View
        style={{
          backgroundColor: !theme.dark ? '#f5f6f7' : '#333',
          marginRight: 8,
          flex: 1,
          borderRadius: 26,
          borderColor: '#eee',
          borderStyle: 'solid',
          borderWidth: 1,
        }}>
        <TextInput
          placeholder="add step"
          value={data.title}
          maxLength={60}
          style={{
            fontSize: 16,
            paddingVertical: 4,
            paddingHorizontal: 8,
            flex: 1,
          }}
          onChangeText={(text) => handleChange('title', text)}
        />
      </View>
      <FAB
        style={{ backgroundColor: theme?.colors?.primary }}
        icon="plus"
        small
        onPress={onSubmit}
      />
    </View>
  );
}
