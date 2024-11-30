
import * as React from 'react';
import { AdmobBanner } from 'expo-ads-admob';
import { View,StyleSheet,Text,Modal } from 'react-native';
import { useTheme,IconButton,Appbar } from 'react-native-paper';
import ListForm from '../ListForm';


export default function NewTaskModal(props) {
  const { colors } = useTheme();
  return (
    <Modal isVisible={props.visible} {...props} >
      
      <Appbar>
       <Appbar.Action
     icon="close"
     onPress={() => props.hideNewListModal()}
    />
    <Appbar.Content title={props.initialName ? 'Rename List' : 'New List' }  />
      </Appbar>
      <View style={{ paddingTop : 6 }} >
        <ListForm {...props} />
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({

})