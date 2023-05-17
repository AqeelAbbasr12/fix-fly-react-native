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

const Input = props => {
  const [check, setCheck] = useState('show');
  const [resendCode, setResenddCode] = useState(false);
  const [timerCount, setTimer] = useState(15);

  const Icon = () => {
    if (check === 'show') {
      return (
        <Image
          style={styles.Icon}
          source={require('../../images/icons/view.png')}
        />
      );
    } else
      return (
        <Image
          style={styles.Icon}
          source={require('../../images/icons/hidden.png')}
        />
      );
  };

  useEffect(() => {
    if (resendCode != false) {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000);
    }
  }, [resendCode]);

  useEffect(() => {
    if (timerCount == 0) {
      setTimer(15);
      setResenddCode(false);
    }
  }, [resendCode, timerCount]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={themeColors.textlight}
        onChangeText={props.setValue}
        secureTextEntry={
          props.password === true && check === 'show' ? true : false
        }
      />

      {
        props.password === true ? (
          <TouchableOpacity
            style={styles.Holder}
            onPress={() => {
              check === 'show' ? setCheck('hidden') : setCheck('show');
            }}>
            <Icon />
          </TouchableOpacity>
        ) : props.resend == true ? (
          <TouchableOpacity
            style={styles.Holder}
            onPress={() => {
              resendCode == false && timerCount == 15
                ? setResenddCode(true)
                : setResenddCode(false);

              props.sendEmail(props.email, props.user_type);
            }}
            disabled={resendCode == false && timerCount == 15 ? null : true}>
            <Text
              style={
                resendCode == false && timerCount == 15
                  ? styles.getCode
                  : styles.getCodeHidden
              }>
              {resendCode == false && timerCount == 15
                ? 'Get Code'
                : 'Resend code in ' + timerCount}
            </Text>
          </TouchableOpacity>
        ) : null
        //Get Code for reset password
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  input: {
    width: wp('85%'),
    borderBottomColor: themeColors.textlight,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  Icon: {
    tintColor: 'white',
    width: wp('5%'),
    height: wp('5%'),
  },
  Holder: {
    position: 'absolute',
    marginRight: wp('2%'),
  },
  getCode: {
    fontSize: wp('3%'),
  },
  getCodeHidden: {
    color: themeColors.textlight,
    fontSize: wp('3%'),
  },
});

export default Input;
