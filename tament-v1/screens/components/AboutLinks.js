import * as React from 'react';
import { FlatList,Linking } from 'react-native';
import { List } from 'react-native-paper';


const DATA = [
  { 
    title : "Privacy policy",
    url : "https://tament.herokuapp.com/privacy"
  },
  
  { 
    title : "Terms of use",
    url : "https://tament.herokuapp.com/tament-next/terms"
  },
  
  {
    title : "Rate us",
    url : "https://play.google.com/app/detail?id=com.ashrafulislam.tament"
  },
  
]


const Item = ({ item }) => (
  <List.Item 
    title={item.title}
    onPress={() => Linking.openURL(item.url)}
  />
)

export default function AboutLinks(props) { 
  return (
    <List.Section title="About" >
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.url}
      />
      <List.Item 
        title="App version"
        description="1.0.0"
        onPress={() => {}}
      />
    </List.Section>
  );
}

