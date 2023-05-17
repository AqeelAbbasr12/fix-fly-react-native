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

import Header from '../../assets/svg/Header.svg';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

import Button from '../../components/button/button';
import BackButton from '../../components/button/backbutton';
import Input from '../../components/Input';
import Api from '../../Api/api';

const ForgetPassword = props => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  let testRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
  let emailValidation = testRegex.test(email);

  const [code, setCode] = useState('');
  const [codeMatch, setCodeMatch] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [check, setCheck] = useState(false);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const sendEmail = (email, user_type) => {
    Api.sendEmail(email, user_type).then(R => {
      console.log('R ====> ', R);
      if (R.success == true) {
        showToast('Code sent successfully!');
        return setCheck(true);
      } else {
        showToast("Code didn't get sent!");
      }
    });
  };

  const checkCode = (email, user_type, code) => {
    Api.checkCode(email, user_type, code).then(R => {
      if (R.success == true) {
        if (R.success == true) {
          showToast('Code matched!');
          return setCodeMatch(true);
        }
      } else {
        showToast("Code didn't match!");
      }
    });
  };

  const resetPassword = (email, user_type, password, confirm_password) => {
    Api.resetPassword(email, user_type, password, confirm_password).then(R => {
      if (R.success == true) {
        showToast('Password reset successful!');
        return navigation.replace('SignIn');
      } else {
        showToast('Password reset unsuccessful!');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
          <BackButton />
        </TouchableOpacity>
      </View>

      <View style={styles.containerBox}>
        {codeMatch == true ? (
          <Text style={styles.sectionTitle}>Write your new password.</Text>
        ) : (
          <Text style={styles.sectionTitle}>
            {check == false
              ? 'A Code will be sent to your registered email.'
              : 'Please Enter the Code Below.'}
          </Text>
        )}

        {codeMatch == true ? (
          <View>
            <View style={{marginTop: hp('2.5%'), alignSelf: 'center'}}>
              <Input
                password={true}
                placeholder="Password"
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
        ) : (
          <View>
            {check == false ? (
              <View style={styles.textInput}>
                <Input placeholder="Email" setValue={setEmail} />
              </View>
            ) : (
              <View style={styles.textInput}>
                <Input
                  placeholder="Enter Code"
                  setValue={setCode}
                  resend={check == true ? true : false}
                  sendEmail={sendEmail}
                  email={email}
                  user_type={1}
                />
              </View>
            )}
          </View>
        )}

        {codeMatch == true ? (
          <TouchableOpacity
            onPress={() => {
              if (password == '') {
                showToast('Please enter your password!');
              } else if (confirm_password == '') {
                showToast('Please enter your confirm password!');
              } else {
                resetPassword(email, 1, password, confirm_password);
              }
            }}>
            <Button title="RESET" />
          </TouchableOpacity>
        ) : (
          <View>
            {check == false ? (
              <TouchableOpacity
                onPress={() => {
                  if (email == '') {
                    showToast('Please enter email!');
                  } else if (emailValidation != true) {
                    showToast('Please enter a valid email!');
                  } else {
                    setCheck(true);
                  }
                }}>
                <Button title="NEXT" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (code == '') {
                    showToast('Please enter the code!');
                  } else {
                    checkCode(email, 1, code);
                  }
                }}>
                <Button title="CHECK" />
              </TouchableOpacity>
            )}
          </View>
        )}
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
    marginTop: hp('5%'),
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontFamily: fontFamily.primary,
  },
  textInput: {
    marginTop: hp('2.5%'),
    marginBottom: hp('7%'),
    alignSelf: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: wp('6%'),
  },
});

export default ForgetPassword;
