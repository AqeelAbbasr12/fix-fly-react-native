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

import fontFamily from '../../utils/fontfamily';
import Drawer from '../../assets/svg/drawer.svg';
import {Icon} from 'react-native-elements';

const DrawerModal = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Drawer />
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: '50%',
          alignSelf: 'flex-end',
          height: '100%',
        }}
        onPress={() => props.setDrawerVisible(false)}></TouchableOpacity>

      <View style={styles.drawer}>
        <Image style={styles.logo} source={require('../../images/logo.png')} />

        <View style={styles.box}>
          <View style={styles.holder}>
            <TouchableOpacity
              onPress={() => {
                props.setDrawerVisible(false), props.screenNavigator('Profile');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.icon}
                source={require('../../images/icons/profile.png')}
              />
              <Text style={styles.text}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.holder, {marginBottom: hp('2%')}]}>
            <TouchableOpacity
              onPress={() => {
                props.setDrawerVisible(false),
                  props.screenNavigator('Appointments');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                style={styles.icon}
                name="account-balance-wallet"
                type="MaterialIcons"
                size={25}
              />
              <Text style={styles.text}>My Appointments</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.holder, {marginBottom: hp('2%')}]}>
            <TouchableOpacity
              onPress={() => {
                props.setDrawerVisible(false),
                  props.screenNavigator('Settings');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.icon}
                source={require('../../images/icons/settings.png')}
              />
              <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.holder}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                props.setDrawerVisible(false), props.storeLoginToken('false');
              }}>
              <Image
                style={styles.icon}
                source={require('../../images/icons/logout.png')}
              />
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('40%'),
    height: wp('9%'),
  },
  drawer: {
    width: wp('50%'),
    height: '70%',
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  box: {
    marginTop: hp('5%'),
  },
  holder: {
    flexDirection: 'row',
    marginBottom: wp('5%'),
  },
  text: {
    fontFamily: fontFamily.primary,
    color: 'black',
    fontSize: wp('6%'),
  },
  icon: {
    width: wp('7%'),
    height: wp('7%'),
    marginRight: wp('4%'),
  },
});

export default DrawerModal;
