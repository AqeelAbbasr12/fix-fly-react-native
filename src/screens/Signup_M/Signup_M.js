import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import Api from '../../Api/api';

import Header from '../../assets/svg/Header.svg';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

import Button from '../../components/button/button';
import ImageButton from '../../components/button/imageButton';
import Input from '../../components/Input';

import {Icon} from 'react-native-elements';

const Signup_M = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  let testRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
  let emailValidation = testRegex.test(email);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [spModal, setSpModal] = useState(false);
  const [sp, setSp] = useState('Choose Specialization');

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.containerBox}>
        <Text style={styles.sectionTitle}>Mechanic Registration</Text>

        <View style={{marginTop: hp('3%')}}>
          <View style={styles.textInput}>
            <Input placeholder="User Name" setValue={setName} />
          </View>
          <View style={styles.textInput}>
            <Input placeholder="Email" setValue={setEmail} />
          </View>
          <View style={styles.textInput}>
            <Input placeholder="Phone number" setValue={setPhone} />
          </View>
          <View style={styles.textInput}>
            <TouchableOpacity
              style={{
                width: wp('85%'),
                borderBottomColor: themeColors.textlight,
                borderWidth: 0.5,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                marginTop: 9,
              }}
              onPress={() => setSpModal(true)}>
              <Text
                style={{
                  paddingBottom: 15,
                  color: `${
                    sp === 'Choose Specialization'
                      ? themeColors.textlight
                      : 'white'
                  }`,
                }}>
                {sp}
              </Text>
            </TouchableOpacity>

            {spModal === true ? (
              <View
                style={{
                  borderTopRightRadius: wp('2%'),
                  borderTopLeftRadius: wp('2%'),
                  padding: 20,
                  height: hp('50%'),
                  width: wp('90%'),
                  backgroundColor: 'white',
                  zIndex: 9999,
                }}>
                <ScrollView>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: themeColors.misty,
                    }}
                    onPress={() => (setSp('Wash'), setSpModal(false))}>
                    <Text style={{color: 'black', fontSize: 18}}>Wash</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: themeColors.misty,
                    }}
                    onPress={() => (
                      setSp('Interior Clean'), setSpModal(false)
                    )}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Interior Clean
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: themeColors.misty,
                    }}
                    onPress={() => (setSp('Polishing'), setSpModal(false))}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Polishing
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: themeColors.misty,
                    }}
                    onPress={() => (setSp('Engine Wash'), setSpModal(false))}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Engine Wash
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: themeColors.misty,
                    }}
                    onPress={() => (setSp('Car Spray'), setSpModal(false))}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Car Spray
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: themeColors.misty,
                    }}
                    onPress={() => (setSp('Carpet Clean'), setSpModal(false))}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Carpet Clean
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            ) : null}
          </View>
          <View style={styles.textInput}>
            <Input
              password={true}
              placeholder="Enter Password"
              setValue={setPassword}
            />
          </View>
          <View style={styles.textInput}>
            <Input
              password={true}
              placeholder="Confirm Password"
              setValue={setConfirmPassword}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (name === '') {
              showToast('Please enter user name!');
            } else if (email === '') {
              showToast('Please enter an email!');
            } else if (emailValidation !== true) {
              showToast('Please enter a valid email!');
            } else if (phone === '') {
              showToast('Please enter your phone number!');
            } else if (password === '') {
              showToast('Please enter your password!');
            } else if (confirmPassword === '') {
              showToast('Please enter confirm password!');
            } else if (sp === 'Choose specialization') {
              showToast('Please enter specialization');
            } else {
              Api.SignupApi(
                name,
                email,
                sp,
                phone,
                password,
                confirmPassword,
                'mechanic',
              ).then(R => {
                R.success == true
                  ? (showToast('Signup Successful!'),
                    navigation.replace('SignIn_M'))
                  : showToast(R.message);
              });
            }
          }}>
          <Button title="Sign Up" />
        </TouchableOpacity>

        <View style={styles.signup}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn_M')}>
            <Text style={styles.underline}>I am already a member</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          alignSelf: 'flex-end',
          marginTop: hp('15%'),
          marginRight: wp('5%'),
          marginBottom: wp('5%'),
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Icon
            name="user"
            type="font-awesome"
            color={themeColors.textlight}
            size={22}
            style={{
              backgroundColor: '#b9beed',
              borderRadius: wp('10%'),
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeColors.container,
  },
  header: {
    top: 0,
    left: 0,
    width: wp('100%'),
    height: wp('30%'),
    zIndex: -99999,
  },
  containerBox: {
    flex: 1,
    marginVertical: wp('3%'),
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    fontFamily: fontFamily.primary,
  },
  textInput: {
    marginBottom: hp('2.5%'),
  },
  underline: {
    color: themeColors.textlight,
    textDecorationLine: 'underline',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontFamily: fontFamily.primary,
    letterSpacing: 0.5,
  },
  text: {
    color: themeColors.textlight,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontFamily: fontFamily.primary,
    letterSpacing: 0.5,
  },
  otherButtons: {
    marginVertical: hp('3%'),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signup: {
    flexDirection: 'row',
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    alignSelf: 'center',
  },
});

export default Signup_M;
