import * as React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import SortableGridView from 'react-native-sortable-gridview';
import { Card, Button } from 'react-native-paper';
import Layout from './components/Layout';
import { isToday } from '../utils/dateUtils';
import { useTasks } from '../contexts/TaskProvider';
import { useSelector } from 'react-redux';

export default function HomeScreen(props) {
  const { taskLists } = useSelector((state) => state.taskListReducer);
  const { getOverdue, getCompleted } = useTasks();

  return (
    <ScrollView>
      <SortableGridView
        data={taskLists}
        numColumns={2}
        numPerRow={2} // let each row has four items. Default is 3
        aspectRatio={0.7} // let height = width * 1.2\. Default is 1
        renderItem={(item) => (
          <Card
            style={styles.listitem}
            onPress={() => {
              props.navigation.navigate('List', { itemId: item.id });
            }}>
            <Text>{item.name}</Text>
          </Card>
        )}
      />
      <Card
        style={styles.listitem}
        onPress={() => {
          props.navigation.navigate('List', { itemId: 3 });
        }}>
        <Text>=</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listitem: {
    margin: 2,
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
