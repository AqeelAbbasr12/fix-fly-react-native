import React from 'react';
import {Image, StyleSheet, SafeAreaView} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BackButton = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.button}
        source={require('../../images/icons/back.png')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    width: wp('10%'),
    height: wp('10%'),
    tintColor: 'white',
  },
});

export default BackButton;
