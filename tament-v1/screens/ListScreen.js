import * as React from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Headline, Title } from 'react-native-paper';
import Layout from './components/Layout';
import Tasks from './components/Tasks';
import { useTasks } from '../contexts/TaskProvider';

export default function ListScreen(props) {
  const [myTasks, setTasks] = React.useState([]);
  const { tasks } = useSelector(state => state.taskReducer);
  const { getListName } = useTasks();

  const { navigation, route } = props;

  const renderHeader = React.useMemo(
    () => (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          alignSelf: 'center',
        }}>
        <Title>{getListName(route.params.itemId)}</Title>
      </View>
    ),
    [getListName, route.params.itemId]
  );

  React.useEffect(() => {
    setTasks((prev) => {
      var id = route.params.itemId ?? null;
      return tasks.filter((t) => t.list == id);
    });
  }, [tasks, route.params.itemId, navigation]);

  return (
    <Layout {...props} listId={route.params.itemId}>
      <ScrollView>
        {renderHeader}
        <Tasks {...props} tasks={myTasks} showListName={false} />
      </ScrollView>
    </Layout>
  );
}
