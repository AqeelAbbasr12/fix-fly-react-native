import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import ModalPicker from '../../components/ModalPicker';
import DrawerModalM from '../../components/DrawerModalM';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';

import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import Api from '../../Api/api';

const HomeMechanic = () => {
  const navigation = useNavigation();

  var loc = false;
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This App needs access to your location ' +
            'so we can know where you are.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loc = true;
        console.log('You can use locations ');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const getData = async (latitude, longitude) => {
      try {
        const TK = await AsyncStorage.getItem('@logintoken');
        const EM = await AsyncStorage.getItem('@email');

        console.log('key --> ', TK);
        console.log('email --> ', EM);

        if (TK !== null) {
          console.log('TK not null!');

          if (TK === 'true') {
            console.log('TK true!');

            if (EM !== null) {
              console.log('EM not null!');

              console.log('Calling the API');
              if (loc !== false) {
                Api.UserLocation(EM, {
                  latitude,
                  longitude,
                })
                  .then(R => {
                    R.success == true ? console.log(R) : showToast(R.message);
                  })
                  .catch(c => {
                    console.log(c);
                  });
              } else {
                showToast('Turn on your location!');
              }
            }
          }
        }
      } catch (e) {
        // error reading value
      }
    };

    requestLocationPermission();
    Geolocation.getCurrentPosition(
      info => (
        console.log('info --------------> ', info),
        getData(info.coords.latitude, info.coords.longitude)
      ),
    );
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const storeLoginToken = async value => {
    try {
      await AsyncStorage.setItem('@logintoken', value).then(() => {
        showToast('Logout Successful!');
        navigation.replace('SignIn');
      });
    } catch (e) {
      console.log("Login token didn't get stored!");
    }
  };

  const screenNavigator = screen => {
    return navigation.navigate(screen);
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [bottomBar, setBottomBar] = useState(2);

  const [shops, setShops] = useState([]);
  const [approvedMechanics, setApprovedMechanics] = useState([]);
  useEffect(() => {
    const GetApprovedMechanics = () => {
      Api.GetApprovedMechanics()
        .then(R => {
          setApprovedMechanics(R);
        })
        .catch(c => console.log(c));
    };

    GetApprovedMechanics();

    const GetAllShops = () => {
      Api.GetAllShops()
        .then(R => {
          setShops(R.data);
        })
        .catch(c => console.log(c));
    };

    GetAllShops();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        {/*Menu Options*/}
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Image
            style={styles.icon}
            source={require('../../images/icons/menu.png')}
          />
          <Modal
            isVisible={isDrawerVisible}
            onBackButtonPress={() => setDrawerVisible(false)}
            hideModalContentWhileAnimating={true}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            useNativeDriver={true}>
            <DrawerModalM
              setDrawerVisible={setDrawerVisible}
              storeLoginToken={storeLoginToken}
              screenNavigator={screenNavigator}
              navigateTo={{
                profile: 'ProfileM',
                appointments: 'AppointmentsM',
                settings: 'SettingsM',
              }}
            />
          </Modal>
        </TouchableOpacity>

        {/*Logo*/}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={require('../../images/logo.png')}
          />
        </View>

        {/*Profile*/}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={[styles.profile, {tintColor: themeColors.TextPurlple}]}
            source={require('../../images/icons/profile.png')}
          />
          <Modal
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible(false)}
            hideModalContentWhileAnimating={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver={true}>
            <ModalPicker
              setModalVisible={setModalVisible}
              storeLoginToken={storeLoginToken}
              screenNavigator={screenNavigator}
              navigateTo={{
                profile: 'ProfileM',
                appointments: 'AppointmentsM',
              }}
            />
          </Modal>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AppointmentsM')}
          style={{
            backgroundColor: themeColors.container,
            width: '100%',
            padding: 20,
            paddingVertical: 10,
            borderRadius: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
            My Appointments
          </Text>
          <Icon
            raised
            name="list"
            type="font-awesome"
            color={themeColors.TextPurlple}
            size={15}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileM')}
          style={{
            backgroundColor: themeColors.container,
            width: '100%',
            padding: 20,
            paddingVertical: 10,
            borderRadius: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
            My Profile
          </Text>
          <Icon
            raised
            name="user"
            type="font-awesome"
            color={themeColors.TextPurlple}
            size={15}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn_M')}
          style={{
            backgroundColor: themeColors.container,
            width: '100%',
            padding: 20,
            paddingVertical: 10,
            borderRadius: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
            Logout
          </Text>
          <Icon
            raised
            name="logout"
            color={themeColors.TextPurlple}
            size={15}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  ScrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    width: wp('100%'),
    height: hp('7%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 1.41,

    elevation: 2,
  },
  logo: {
    width: wp('40%'),
    height: wp('9%'),
  },
  icon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  profile: {
    width: wp('8%'),
    height: wp('8%'),
  },
  body: {
    width: wp('100%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('0.5%'),
  },
  bottomBar: {
    backgroundColor: themeColors.TextPurlple,
    width: wp('100%'),
    height: hp('7.5%'),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,

    elevation: 50,
  },
  otherServices: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: wp('2..5%'),
  },
  title: {
    color: themeColors.TextPurlple,
    fontFamily: fontFamily.primary,
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  navbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialist: {
    paddingLeft: wp('5%'),
    marginTop: 10,
  },
  clicked: {
    color: 'white',
    fontWeight: 'bold',
  },
  barIcon: {
    tintColor: 'white',
    width: wp('4%'),
    height: wp('4%'),
    marginBottom: wp('0.5%'),
  },
});

export default HomeMechanic;
