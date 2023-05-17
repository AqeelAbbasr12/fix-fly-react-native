import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import openMap from 'react-native-open-maps';
import {Button} from 'react-native';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

const FindMyMechanic = () => {
  const _goToYosemite = () => {
    openMap({latitude: 37.865101, longitude: -119.53833});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings}>
        <View style={{height: hp('90%')}}>
          <Button
            color={'#bdc3c7'}
            onPress={_goToYosemite}
            title="Click To Open Maps 🗺"
          />
        </View>
        <View style={{height: hp('10%')}}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings: {
    flex: 1,
    backgroundColor: 'white',
    width: wp('100%'),
    paddingBottom: hp('0.5%'),
  },
});

export default FindMyMechanic;
