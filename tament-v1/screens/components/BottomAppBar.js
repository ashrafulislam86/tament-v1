import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, useTheme, FAB } from 'react-native-paper';
import Icons from '@expo/vector-icons';

export default function BottomAppbar(props) {
  const theme = useTheme();
  {/*  backgroundColor: theme?.colors?.background  */}
  return (
    <Appbar style={{ backgroundColor : '#fff' , elevation: 12 }} >
      <View style={styles.container}>
        <Appbar.Action
          color={theme.colors.placeholder}
          icon="menu"
          onPress={props.onMenuPress}
        />
        <FAB
          style={{ backgroundColor: theme?.colors?.primary, bottom: 25 }}
          icon="plus"
          animated
          onPress={props.onFabPress}
        />
        <Appbar.Action
          color="#424242"
          icon="dots-vertical"
          onPress={props.onMorePress}
        />
      </View>
    </Appbar>
  );
}
//ndcsncns

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
