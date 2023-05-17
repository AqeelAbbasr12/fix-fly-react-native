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
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const ModalPicker = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{flex: 1, width: '100%'}}
        onPress={() => props.setModalVisible(false)}></TouchableOpacity>
      <View style={styles.box}>
        <View style={[styles.holder, {marginBottom: hp('2%')}]}>
          <TouchableOpacity
            onPress={() => {
              props.setModalVisible(false),
                props.screenNavigator(props.navigateTo.profile);
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
              props.setModalVisible(false),
                navigation.navigate(props.navigateTo.appointments);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              style={styles.icon}
              name="account-balance-wallet"
              type="MaterialIcons"
              size={20}
            />
            <Text style={styles.text}>My Appointments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.holder}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              props.setModalVisible(false), props.storeLoginToken('false');
            }}>
            <Image
              style={styles.icon}
              source={require('../../images/icons/logout.png')}
            />
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  box: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: wp('5%'),
    borderTopLeftRadius: wp('5%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
  },
  holder: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: fontFamily.primary,
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
  icon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('4%'),
  },
});

export default ModalPicker;
