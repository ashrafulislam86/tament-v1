import * as React from 'react';
import { View, Text, Alert, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import BottomAppbar from '../components/BottomAppBar';
import MenuModal from './modals/MenuModal';
import MoreModal from './modals/MoreModal';
import NewTaskModal from './modals/NewTaskModal';

import { MaterialIcons } from '@expo/vector-icons';

export default function Layout(props) {
  const theme = useTheme();

  const [newTaskModalVisible, setNewTaskModalVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [moreVisible, setMoreVisible] = React.useState(false);

  const hideNewTaskModal = () => setNewTaskModalVisible(false);

  const menuRef = React.useRef();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{props.children}</View>
      <MenuModal
        {...props}
        hideModal={() => setMenuVisible(false)}
        isVisible={menuVisible}
      />
      <NewTaskModal
        {...props}
        visible={newTaskModalVisible}
        hideModal={hideNewTaskModal}
      />
      <MoreModal
        {...props}
        hideModal={() => setMoreVisible(false)}
        isVisible={moreVisible}
      />

      <BottomAppbar
        onMenuPress={() => {
          setMenuVisible(true);
        }}
        onFabPress={() => {
          setNewTaskModalVisible(true);
        }}
        onMorePress={() => {
          setMoreVisible(true);
        }}
      />
    </View>
  );
}
