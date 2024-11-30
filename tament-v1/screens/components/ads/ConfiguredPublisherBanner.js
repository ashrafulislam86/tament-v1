import * as React from 'react';
import { View } from 'react-native';
import { AdMobRewarded,PublisherBanner } from 'expo-ads-admob';
import { Card } from 'react-native-paper';

import { useSelector } from 'react-redux';

export default function ConfiguredPublisherBanner(props) {
  const { showPersonalizedAds } = useSelector(s => s.settings);

  const adUnitId = 'ca-app-pub-3940256099942544/5224354917' 

  return (
    <Card>
      <PublisherBanner
        bannerSize={props.bannerSize ?? 'smartbanner'}
        adUnitID
        servePersonalizedAds={showPersonalizedAds} // true or false
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </Card>
  );
}
