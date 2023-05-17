import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
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

const Signup = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.containerBox}>
        <Text style={styles.sectionTitle}>Get on Board</Text>

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
            if (name == '') {
              showToast('Please enter user name!');
            } else if (email == '') {
              showToast('Please enter an email!');
            } else if (emailValidation != true) {
              showToast('Please enter a valid email!');
            } else if (phone == '') {
              showToast('Please enter your phone number!');
            } else if (password == '') {
              showToast('Please enter your password!');
            } else if (confirmPassword == '') {
              showToast('Please enter confirm password!');
            } else {
              Api.SignupApi(
                name,
                email,
                (sp = false),
                phone,
                password,
                confirmPassword,
                'user',
              ).then(R => {
                R.success == true
                  ? (showToast('Signup Successful!'),
                    navigation.replace('SignIn'))
                  : showToast(R.message);
              });
            }
          }}
          style={{marginTop: hp('5%')}}>
          <Button title="Sign Up" />
        </TouchableOpacity>

        <View style={styles.signup}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.underline}>I am already a member</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup_M')}>
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
    marginBottom: hp('2%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
});

export default Signup;
