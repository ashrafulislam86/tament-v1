import * as React from 'react';
import { View, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import {
  useTheme,
  Divider,
  Colors,
  Chip,
  List,
  IconButton,
  Appbar,
} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { updateTask, deleteTask } from '../contexts/reducers';
import { useTasks } from '../contexts/TaskProvider';
import { useToggler } from '../utils/CustomHooks';
import Checkbox from './components/Checkbox';
import { myDate, formateDate } from '../utils/dateUtils';
import Subtask from './components/Subtask';
import SubtaskForm from './components/forms/SubtaskForm';

export default function TaskScreen({ navigation, route }) {
  const [task, setTask] = React.useState(null);
  const [calenderModalShow, setCalenderModalShow] = React.useState(false);
  const [clockModalShow, setClockModalShow] = React.useState(false);
  const [expanded, toggleExpanded] = useToggler(true, React.useState);
  const { getListName, deleteTaskItem } = useTasks();
  const dispatch = useDispatch()
  const {tasks} = useSelector(state => state.taskReducer)
  const theme = useTheme();

  React.useEffect(() => {
    if (!route.params.itemId) return navigation.goBack();
    var myTask = tasks.find((t) => t.id === route.params.itemId);
    if (!myTask) return navigation.goBack();
    setTask(myTask);
  }, [tasks, navigation, route.params]);

  React.useEffect(() => {
    if (!task) return;
    navigation.setOptions({
      title : getListName(route.params.itemId),
      headerRight: () => (
        <IconButton
          icon="delete"
          color="#424242"
          size={22}
          onPress={() => {
            Alert.alert(
              'Delete Task',
              'Are you sure you wants to delete this task ?',
              [
                {
                  text: 'Delete',
                  onPress: () => deleteTaskItem(route.params.itemId),
                },
              ],
              {
                cancelable: true,
              }
            );
          }}
        />
      ),
    });
  }, [task, navigation, route.params.itemId, deleteTaskItem,getListName]);


  const handleChange = (key, val) => {
    var newData = { ...task };
    newData[key] = val;
    setTask(newData);   
    dispatch(updateTask(task.id, { [key]: val }));
  };

 
  return task ? (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox size={30} item={task} />
          <View style={{ justifyContent: 'flex-start', flex: 1 }}>
            <TextInput
              value={task?.title}
              maxLenght={60}
              style={{ fontSize: 21, flex: 1,textDecorationLine : task.complete ? 'line-through' : '' }}
              enableScrollToCaret
              multiline
              onChangeText={(text) => handleChange('title', text)}
            />
          </View>
        </View>


        {!task.dueDate ? (
          <List.Item
          title="Add due date"
          onPress={() => {
            setCalenderModalShow(true);
          }}
          left={(props) => (
            <List.Icon
              {...props}
              color={Colors.grey800}
              size={24}
              icon="calendar"
            />
          )}
        />
        ) : (
          <View
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            flexDirection: 'row',
          }}>
          <Chip
            onPress={() => setCalenderModalShow(true)}
            icon="calendar"
            mode="outlined"
            style={{ marginHorizontal: 6 }}
            onClose={() => handleChange('dueDate', null)}>
            {formateDate(task.dueDate?.date.toString())}
          </Chip>
          </View>
        )}

        {!task.dueDate?.date ? (
          <List.Item
            title="Add time"
            onPress={() => {
              setClockModalShow(true);
            }}
            left={(props) => (
              <List.Icon
                {...props}
                color={Colors.grey800}
                size={24}
                icon="clock"
              />
            )}
          />
        ) :  (
          <View
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            flexDirection: 'row',
          }}>
          <Chip
            onPress={() => setClockModalShow(true)}
            icon="clock"
            mode="outlined"
            style={{ marginHorizontal: 6 }}>
            {myDate(task.dueDate?.date.toString()).localeTime.toString()}
          </Chip>
          </View>
        )}


        
        <DatePickerModal
          locale="en"
          mode="single"
          visible={calenderModalShow}
          onDismiss={() => setCalenderModalShow(false)}
          date={task?.dueDate?.date ?? new Date()}
          onConfirm={({ date }) => {
            handleChange('dueDate', { date: new Date(date) });
            setCalenderModalShow(false);
          }}
        />
        <TimePickerModal
          visible={clockModalShow}
          onDismiss={() => setClockModalShow(false)}
          onConfirm={(time) => {
            var newD = new Date(task.dueDate.date);
            newD.setHours(time.hours);
            newD.setMinutes(time.minutes);
            handleChange('dueDate', { date: newD });
            setClockModalShow(false);
          }}
        />
        <Divider />

        {tasks.filter((t) => t.subtask && t.parent === task.id).length ? (
          <List.Accordion
            expanded={expanded}
            onPress={toggleExpanded}
            left={(props) => (
              <List.Icon {...props} size={24} icon="subdirectory-arrow-right" />
            )}
            title={
              tasks.filter((t) => t.subtask && t.parent === task.id).length +
              ' steps '
            }>
            <FlatList
              data={tasks.filter(
                (t) => t.subtask == true && t.parent === task.id
              )}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => <Subtask item={item} />}
              keyExtractor={(item) => item.id}
            />
          </List.Accordion>
        ) : null}

        <View style={{ padding: 15 }}>
          <TextInput
            multiline
            placeholder="add note..."
            defaultValue={task.description}
            onChangeText={(text) => handleChange('description', text)}
            style={{ fontSize: 18, paddingHorizontal: 4, paddingVertical: 6 }}
          />
        </View>
      </ScrollView>
      <Appbar
        style={{
          backgroundColor: theme?.colors?.surface,
        }}>
        <SubtaskForm listId={task.list} parent={task.id} />
      </Appbar>
    </View>
  ) : null;
}
