import * as React from 'react';
import { View, TextInput, Platform } from 'react-native';
import { Button, IconButton, Colors, Chip } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { myDate, formateDate } from '../../utils/dateUtils';
import { scheduleNotificationAsync } from '../../utils/helpers';
import { addTask } from '../../contexts/reducers';
import { useTasks } from '../../contexts/TaskProvider';

import { useDispatch } from 'react-redux'

export default function TaskForm(props) {
  const [data, setData] = React.useState({
    title: '',
    description: '',
    priority: 'p2',
    dueDate: null,
    reminder: null,
    list: props.listId ?? null,
  });

  const [priorityMenuVisible, setPriorityMenuVisible] = React.useState(false);
  const [calenderModalShow, setCalenderModalShow] = React.useState(false);
  const [clockModalShow, setClockModalShow] = React.useState(false);
  
  const [showDes, setShowDes] = React.useState(false);
  const dispatch = useDispatch()
  const { getListName } = useTasks();

  const handleChange = (key, val) => {
    var newData = { ...data };
    newData[key] = val;
    setData(newData);
  };

  function onSubmit() {
    if (!data.title) return;

    dispatch(addTask(data));
    
    if (data.dueDate) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: data.title.toString(),
          body: data.description.toString(),
        },
        trigger: data.dueDate.date,
      }).then((reminder) => {
        setData({...data,reminder})
      }).catch(err => console.log('fcii '+err));
    }
    console.log(data.reminder)
    props.hideModal();
  }

  const priorityColors = {
    p1: Colors.blue500,
    p2: Colors.grey800,
    p3: Colors.red500,
  };

  const showCalender = () => {
    setCalenderModalShow(true);
  };

  const getDate = formateDate(data.dueDate?.date.toString())
  const getTime = myDate(data.dueDate?.date.toString()).localeTime.toString()

  const renderDes = showDes ? (
    <TextInput
      multiline
      placeholder="add note..."
      defaultValue={data.description}
      onChangeText={(text) => handleChange('description', text)}
      style={{ fontSize: 15, paddingHorizontal: 4, paddingVertical: 6 }}
    />
  ) : null;

  return (
    <View style={{ padding: 7, paddingHorizontal: 10 }}>
      <View style={{ paddingBottom: 6, flex: 1 }}>
        <TextInput
          multiline
          placeholder="New task"
          defaultValue={data.title}
          onChangeText={(text) => handleChange('title', text)}
          style={{ fontSize: 19, paddingHorizontal: 4, paddingVertical: 6 }}
        />
      </View>
      {renderDes}
      <View style={{ paddingVertical: 6, flexDirection: 'row' }}>
        <Chip onPress={() => {}} icon="format-list-bulleted" mode="outlined">
          {getListName(data.list)}
        </Chip>
        {data.dueDate?.date ? (
          <Chip
            onPress={() => setCalenderModalShow(true)}
            icon="calendar"
            mode="outlined"
            style={{ marginHorizontal: 6 }}
            onClose={() => handleChange('dueDate', null)}>
            {getDate}
          </Chip>
        ) : null}
        {data.dueDate?.date ? (
          <Chip
            onPress={() => setClockModalShow(true)}
            icon="clock"
            mode="outlined"
            style={{ marginHorizontal: 6 }}>
            {getTime}
          </Chip>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="text"
            color={Colors.blue500}
            size={22}
            onPress={() => setShowDes(true)}
          />

          <IconButton
            icon="calendar"
            color={Colors.blue500}
            size={22}
            onPress={() => showCalender()}
          />

          {data.dueDate ? (
            <IconButton
              onPress={() => setClockModalShow(true)}
              icon="clock"
              color={Colors.blue500}
              size={22}
            />
          ) : null}
        </View>
        <Button
          style={{ marginTop: 6 }}
          disabled={!data.title}
          onPress={onSubmit}>
          save
        </Button>
      </View>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={calenderModalShow}
        onDismiss={() => setCalenderModalShow(false)}
        date={data?.dueDate?.date ?? new Date()}
        onConfirm={({ date }) => {
          console.log(date);
          handleChange('dueDate', { date });
          setCalenderModalShow(false);
        }}
      />
      <TimePickerModal
        visible={clockModalShow}
        onDismiss={() => setClockModalShow(false)}
        onConfirm={(time) => {
          var newD = new Date(data.dueDate.date);
          newD.setHours(time.hours);
          newD.setMinutes(time.minutes);
          handleChange('dueDate', { date: newD });
          setClockModalShow(false);
        }}
      />
    </View>
  );
}
