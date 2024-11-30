import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider, useTheme, List } from 'react-native-paper';
import TaskList from '../MyLists';
import NewListModal from './NewListModal';
import ConfiguredModal, {
  ConfiguredModalBottomContent,
} from './ConfiguredModal';

export default function MenuModal(props) {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();
  return (
    <>
      <ConfiguredModal {...props}>
        <ConfiguredModalBottomContent>
          <TaskList {...props} />
          <Divider />
          <List.Item
            title="New List"
            onPress={() => {
              props.hideModal();
              setVisible(true);
            }}
            left={(props) => (
              <List.Icon {...props} icon="playlist-plus" color="#2196f3" />
            )}
          />
        </ConfiguredModalBottomContent>
      </ConfiguredModal>
      <NewListModal
        {...props}
        visible={visible}
        hideNewListModal={() => setVisible(false)}
      />
    </>
  );
}