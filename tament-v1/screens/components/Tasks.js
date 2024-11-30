import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useTheme, Divider } from 'react-native-paper';
import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons';
import Checkbox from './Checkbox';
import { myDate, formateDate } from '../../utils/dateUtils';
import { useTasks } from '../../contexts/TaskProvider';

function TaskItemInfo({ item, showListName }) {
  const { getSubtasks, getListName } = useTasks();
  return (
    <View style={{}}>
      {item.dueDate ? (
        <View>
          <Text style={{ paddingHorizontal: 0, fontSize: 11 }}>
            {formateDate(item.dueDate?.date.toString())}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function Item(props) {
  const { colors } = useTheme();
  const { getListName } = useTasks();
  const { item } = props;

  const titleStyle = {
    textDecorationLine: item.complete ? 'line-through' : '',
    textDecorationStyle: 'solid',
    paddingVertical: 7.5,
    color: item.complete ? 'grey' : '#000',
  };

  const desStyle = {
    textDecorationLine: item.complete ? 'line-through' : '',
    textDecorationStyle: 'solid',
    paddingVertical: 4.5,
    color: item.complete ? 'grey' : '#000',
    fontSize: 11,
  };

  return (
    <View style={styles.container}>
      <Checkbox {...props} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Task', { itemId: item.id })}
        style={{ flex: 1, paddingHorizontal: 6 }}>
        {/* upper part */}
        <View style={{ paddingVertical: 6 }}>
          <Text style={titleStyle}>{item.title}</Text>
          {item.description ? (
            <Text style={desStyle}>{item.description}</Text>
          ) : null}
        </View>
        {/* info part */}
        <View style={{ flexDirection: 'row' }}>
          <TaskItemInfo {...props} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function Tasks(props) {
  return (
    <FlatList
      data={props.tasks}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => <Item item={item} {...props} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 6,
    paddingBottom: 6,
    borderRadius: 20,
  },
});
