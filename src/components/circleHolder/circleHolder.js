import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

import {useNavigation} from '@react-navigation/native';

const CircleHolder = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginRight: wp('6.5%'),
          marginBottom: hp('1%'),
        }}>
        <TouchableOpacity
          style={styles.holder}
          onPress={() =>
            navigation.navigate('OtherServices', {
              title: props.title,
              filters: props.filters,
            })
          }>
          <Image style={styles.icon} source={props.image} />
        </TouchableOpacity>

        <Text style={styles.title}>{props.title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  holder: {
    backgroundColor: 'white',
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    width: wp('10%'),
    height: wp('10%'),
    tintColor: themeColors.TextPurlple,
  },
  title: {
    marginTop: wp('1%'),
    fontFamily: fontFamily.primary,
    color: themeColors.TextPurlple,
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
});

export default CircleHolder;
