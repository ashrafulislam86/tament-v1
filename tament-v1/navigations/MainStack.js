import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TaskScreen from '../screens/TaskScreen';
import TodayTaskScreen from '../screens/TodayTaskScreen';
import UpcomingTaskScreen from '../screens/UpcomingTaskScreen';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{ title: 'All Tasks' }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: '', headerStyle: { elevation: 0 } }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="Today" component={TodayTaskScreen} />
      <Stack.Screen name="Upcoming" component={UpcomingTaskScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
