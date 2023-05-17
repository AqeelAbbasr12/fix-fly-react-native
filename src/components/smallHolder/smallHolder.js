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

const SmallHolder = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.Holder}
        onPress={() =>
          navigation.navigate('MechanicProfile', {
            name: props.title,
            specialist: props.specialist,
            email: props.email,
            phone: props.phone,
            code: props.code,
          })
        }>
        <View style={styles.ImageHodler}>
          <Image style={styles.image} source={props.image} />
        </View>
        <View style={{paddingHorizontal: '4%'}}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.starHolder}>
            <Image
              style={styles.star}
              source={require('../../images/icons/FStar.png')}
            />
            <Image
              style={styles.star}
              source={require('../../images/icons/FStar.png')}
            />
            <Image
              style={styles.star}
              source={require('../../images/icons/FStar.png')}
            />
            <Image
              style={styles.star}
              source={require('../../images/icons/FStar.png')}
            />
            <Image
              style={styles.star}
              source={require('../../images/icons/FStar.png')}
            />
          </View>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
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
    width: wp('38%'),
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
    height: '60%',
    marginBottom: wp('1%'),
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: wp('3%'),
    borderTopRightRadius: wp('3%'),
  },
  title: {
    color: themeColors.TextPurlple,
    fontFamily: fontFamily.primary,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: wp('0.5%'),
  },
  starHolder: {
    flexDirection: 'row',
    marginBottom: wp('1%'),
  },
  star: {
    tintColor: themeColors.gold,
    width: wp('4%'),
    height: wp('4%'),
    marginRight: wp('1%'),
  },
  subtitle: {
    color: themeColors.TextPurlple,
    fontFamily: fontFamily.primary,
    fontSize: wp('3.5%'),
    marginBottom: wp('0.5%'),
  },
});

export default SmallHolder;
