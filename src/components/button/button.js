import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import themeColors from '../../utils/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import fontFamily from '../../utils/fontfamily';

const Button = props => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.9, y: 1}}
        colors={['#833bbe', '#763acd', '#5f41d7']}
        style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: wp('24%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1.5%'),
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontFamily.primary,
    color: themeColors.misty,
  },
});

export default Button;
