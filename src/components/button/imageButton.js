import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import themeColors from '../../utils/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fontFamily from '../../utils/fontfamily';

const ImageButton = props => {
  const Icon = () => {
    if (props.name === 'facebook') {
      return (
        <Image
          style={styles.facebook}
          source={require('../../images/icons/facebook.png')}
        />
      );
    } else if (props.name === 'google')
      return (
        <Image
          style={styles.google}
          source={require('../../images/icons/google.png')}
        />
      );
    else return <Image source={require('../../images/icons/warning.png')} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button} backgroundColor={props.buttonColor}>
        <Icon />
        <Text
          style={
            props.name == 'facebook' ? styles.buttonText : styles.buttonText2
          }>
          {props.title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: wp('28%'),
    height: wp('10%'),
    borderRadius: wp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: wp('1%'),
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontFamily.primary,
    color: themeColors.misty,
  },
  buttonText2: {
    fontSize: 14,
    fontFamily: fontFamily.primary,
    color: 'black',
  },
  facebook: {
    tintColor: 'white',
    width: wp('4%'),
    height: wp('4%'),
  },
  google: {
    width: wp('4%'),
    height: wp('4%'),
  },
});

export default ImageButton;
