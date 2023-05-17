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

import {useNavigation} from '@react-navigation/native';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

const settingsM = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {props.hide == 'hide' ? null : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backbutton}
            source={require('../../images/icons/back.png')}
          />
        </TouchableOpacity>
      )}

      <View style={styles.settings}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.holder}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.icon}
              source={require('../../images/icons/profile2.png')}
            />
            <Text style={styles.text}>Accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.holder}>
            <Image
              style={styles.icon}
              source={require('../../images/icons/notification.png')}
            />
            <Text style={styles.text}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.holder}
            onPress={() => navigation.navigate('AppointmentsM')}>
            <Image
              style={styles.icon}
              source={require('../../images/icons/payment.png')}
            />
            <Text style={styles.text}>My Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.holder}>
            <Image
              style={styles.icon}
              source={require('../../images/icons/question.png')}
            />
            <Text style={styles.text}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.holder}>
            <Image
              style={styles.icon}
              source={require('../../images/icons/information.png')}
            />
            <Text style={styles.text}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: 'white',
    paddingVertical: hp('3%'),
  },
  settings: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  title: {
    color: 'black',
    fontFamily: fontFamily.primary,
    fontSize: wp('7%'),
  },
  backbutton: {
    width: wp('10%'),
    height: wp('10%'),
    marginHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  box: {
    flex: 1,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('6%'),
  },
  icon: {
    width: wp('8%'),
    height: wp('8%'),
    marginRight: wp('5.5%'),
  },
  text: {
    color: 'black',
    fontFamily: fontFamily.primary,
    fontSize: wp('5%'),
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
});

export default settingsM;
