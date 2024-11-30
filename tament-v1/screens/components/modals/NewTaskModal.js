import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Dialog, Portal, Modal } from 'react-native-paper';
import ConfiguredModal, {
  ConfiguredModalBottomContent,
} from './ConfiguredModal';
import TaskFrom from '../TaskForm';

const { width } = Dimensions.get('window');

export default function NewTaskModal(props) {
  const { colors } = useTheme();
  return (
    <Portal>
      <Modal
        {...props}
        style={{ margin: 0 }}
        onDismiss={props.hideModal}
        contentContainerStyle={[
          styles.form,
          { backgroundColor: colors.surface },
        ]}>
        <TaskFrom {...props} />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  form: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: 500,
    width,
  },
});
