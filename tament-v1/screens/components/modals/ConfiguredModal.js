import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useTheme, Portal } from 'react-native-paper';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

export function ConfiguredModalBottomContent(props) {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={[
        {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          maxHeight: 500,
          backgroundColor: colors.surface,
        },
        styles.modalContent,
      ]}>
      {props.children}
    </ScrollView>
  );
}

export default function ConfiguredModal(props) {
  return (
    <Portal>
      <Modal
        {...props}
        style={{ margin: 0 }}
        swipeDirection="down"
        onSwipeComplete={props.hideModal}
        onBackdropPress={props.hideModal}>
        {props.children}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
  },
});
