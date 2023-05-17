import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/fixfly.png')}
        style={styles.imagecontainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    width: wp('100%'),
    height: hp('50%'),
  },
});

export default SplashScreen;
