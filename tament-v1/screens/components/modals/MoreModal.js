import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import ConfiguredModal, {
  ConfiguredModalBottomContent,
} from './ConfiguredModal';
import ListOptions from '../ListOptions';
import MoreItems from '../MoreItems';

export default function MoreModal(props) {
  const { colors } = useTheme();
  return (
    <ConfiguredModal {...props} onDismiss={props.hideModal}>
      <ConfiguredModalBottomContent>
        <ListOptions {...props} />
        <MoreItems {...props} />
      </ConfiguredModalBottomContent>
    </ConfiguredModal>
  );
}
