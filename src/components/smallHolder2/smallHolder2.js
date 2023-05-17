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

const SmallHolder2 = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.Holder}
        onPress={() =>
          navigation.navigate('ShopProfile', {
            name: props.title,
            specialist: props.specialist,
            email: props.email,
            phone: props.phone,
            code: props.code,
          })
        }>
        <View style={styles.ImageHodler}>
          <Image style={styles.image} source={props.image} />
          <View style={styles.titleHolder}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  Holder: {
    backgroundColor: 'white',
    width: wp('45%'),
    height: wp('50%'),
    borderRadius: wp('3%'),
    marginRight: wp('3%'),
    marginBottom: wp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  ImageHodler: {
    borderRadius: wp('3%'),
    height: '100%',
    marginBottom: wp('1%'),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: wp('3%'),
  },
  title: {
    color: 'white',
    fontFamily: fontFamily.primary,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: wp('0.5%'),
  },
  titleHolder: {
    backgroundColor: 'rgba(26, 26, 26, 0.6)',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('50%'),
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
});

export default SmallHolder2;
