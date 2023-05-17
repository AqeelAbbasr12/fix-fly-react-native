import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import Api from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../assets/svg/Header.svg';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

import Button from '../../components/button/button';
import ImageButton from '../../components/button/imageButton';
import Input from '../../components/Input';

import {Icon} from 'react-native-elements';

const SignIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  let testRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
  let emailValidation = testRegex.test(email);

  const [password, setPassword] = useState('');

  const storeLoginToken = async value => {
    try {
      await AsyncStorage.setItem('@logintoken', value);
    } catch (e) {
      console.log("Login token didn't get stored!");
    }
  };

  const storeCredentials = async (name, email, phone, code) => {
    var data = {name: name, email: email, phone: phone, code: code};
    try {
      await AsyncStorage.setItem('@user_credentials', JSON.stringify(data));
    } catch (e) {
      console.log("Login token didn't get stored!");
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.containerBox}>
        <Text style={styles.sectionTitle}>Hello there, {'\n'}welcome back</Text>

        <View style={{marginTop: hp('5%')}}>
          <View style={styles.textInput}>
            <Input placeholder="Email" setValue={setEmail} />
          </View>
          <View>
            <Input
              password={true}
              placeholder="Password"
              setValue={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{alignSelf: 'center', marginVertical: hp('5%')}}
          onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.underline}>Forgot your password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (email == '') {
              showToast('Please enter email!');
            } else if (emailValidation != true) {
              showToast('Please enter a valid email!');
            } else if (password == '') {
              showToast('Please enter password!');
            } else {
              Api.LoginApi(email, password, 'user').then(R => {
                R.success == true
                  ? (showToast('Login Successful!'),
                    storeLoginToken('true'),
                    storeCredentials(
                      R.data.user_name,
                      R.data.email,
                      R.data.phone,
                      R.data.code,
                    ),
                    navigation.replace('Home'))
                  : showToast(R.message);
              });
            }
          }}>
          <Button title="Sign In" />
        </TouchableOpacity>

        <View style={styles.signin}>
          <Text style={styles.text}>New here ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.underline}>Sign Up Instead</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'flex-end', marginTop: hp('10%')}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn_M')}>
            <Icon
              name="wrench"
              type="font-awesome"
              color={themeColors.textlight}
              size={22}
              style={{
                backgroundColor: '#b9beed',
                borderRadius: wp('10%'),
                paddingVertical: 8,
                paddingHorizontal: 9,
              }}
            />
          </TouchableOpacity>
        </View>
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
    fontSize: 34,
    fontWeight: '600',
    color: 'white',
    fontFamily: fontFamily.primary,
  },
  textInput: {
    marginBottom: hp('3%'),
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
    marginVertical: hp('5%'),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signin: {
    flexDirection: 'row',
    marginTop: hp('6%'),
    marginBottom: hp('3%'),
    alignSelf: 'center',
  },
});

export default SignIn;
