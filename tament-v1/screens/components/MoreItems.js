import * as React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useTheme, List } from 'react-native-paper';

function renderItems(props) {
  const { item } = props;
  return (
    <List.Item
      title={item.name}
      left={(props) => <List.Icon {...props} icon={item.icon} size={24} />}
      onPress={item.onPress}
    />
  );
}

export default function ModalItems(props) {
  const { colors } = useTheme;
  const ITEMS = [
    {
      id: 1,
      name: 'settings',
      icon: 'cog',
      onPress: () => {
        props.navigation.navigate('Settings');
        props.hideModal();
      },
    },
  ];

  

  return (
    <>

    <FlatList
      data={ITEMS}
      renderItem={renderItems}
      keyExtractor={(i) => i.id}
    />
    </>
  );
}
