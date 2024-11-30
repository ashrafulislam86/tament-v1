import * as Notifications from 'expo-notifications';

export const scheduleNotificationAsync = async (data) => {
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) {
    return await Notifications.scheduleNotificationAsync(data);
  }
};

export const cancelScheduleNotificationAsync = async (id) => {
  await Notifications.cancelScheduledNotificationAsync(id);
};
