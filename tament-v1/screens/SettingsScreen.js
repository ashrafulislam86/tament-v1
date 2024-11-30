import * as React from 'react';
import { View } from 'react-native';
import { AdMobRewarded,PublisherBanner } from 'expo-ads-admob';
import { List, Checkbox } from 'react-native-paper';
import AboutLinks from './components/AboutLinks';
import { useSettings } from '../contexts/SettingsProvider';

import { useSelector,useDispatch } from 'react-redux';

export default function SettingsScreen(props) {
  const { showPersonalizedAds } = useSelector(s => s.settings);
  const dispatch = useDispatch()

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <List.Section title="ad">
        <List.Item
          title="Show Personalized Ads"
          description="if option is enabled then we will show you personalized ads"
          onPress={() => togglePersonalized(!showPersonalizedAds)}
          right={(props) => (
            <Checkbox status={showPersonalizedAds ? 'checked' : 'unchecked'} />
          )}
        />
      </List.Section>
      <AboutLinks />
    </View>
  );
}
