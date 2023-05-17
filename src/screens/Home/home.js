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
import DrawerModal from '../../components/DrawerModal';

import SearchBar from '../../components/searchBar';
import BigHolder from '../../components/bigHolder';
import SmallHolder from '../../components/smallHolder';
import SmallHolder2 from '../../components/smallHolder2';
import CircleHolder from '../../components/circleHolder';
import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';

import Settings from '../settings';
import Services from '../services';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import Api from '../../Api/api';

const Home = () => {
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

  const StoreLocation = async value => {
    try {
      await AsyncStorage.setItem('@user_location', JSON.stringify(value)).then(
        () => {
          console.log('Location Stored!');
        },
      );
    } catch (e) {
      console.log("Login token didn't get stored!");
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
                StoreLocation({
                  latitude: latitude,
                  longitude: longitude,
                });
                Api.UserLocation(EM, {
                  latitude,
                  longitude,
                })
                  .then(R => {
                    R.success == true
                      ? console.log('gg')
                      : showToast(R.message);
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

  const navigation = useNavigation();
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
            <DrawerModal
              setDrawerVisible={setDrawerVisible}
              storeLoginToken={storeLoginToken}
              screenNavigator={screenNavigator}
              navigateTo={{
                profile: 'Profile',
                appointments: 'Appointments',
                settings: 'Settings',
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
                profile: 'Profile',
                appointments: 'Appointments',
              }}
            />
          </Modal>
        </TouchableOpacity>
      </View>

      {/*------------- HOME SCREEN -------------*/}
      {bottomBar && bottomBar == 2 ? (
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            {/*Remote Repair*/}
            <View>
              <BigHolder navigateTo="AllSpecialist" />
            </View>

            {/*Other Services*/}
            <View
              style={{
                marginTop: hp('3%'),
                marginBottom: hp('2%'),
                paddingLeft: wp('5%'),
              }}>
              <Text style={styles.title}>Other Services</Text>
              <View style={styles.otherServices}>
                <CircleHolder
                  title="Wash"
                  filters={{
                    wash: true,
                    interior_clean: 3,
                    polishing: 3,
                    engine_wash: 3,
                    car_spray: 3,
                    carpet_clean: 3,
                  }}
                  image={require('../../images/icons/car-wash.png')}
                />
                <CircleHolder
                  title="Interior Clean"
                  filters={{
                    wash: 3,
                    interior_clean: true,
                    polishing: 3,
                    engine_wash: 3,
                    car_spray: 3,
                    carpet_clean: 3,
                  }}
                  image={require('../../images/icons/vacuum.png')}
                />
                <CircleHolder
                  title="Polishing"
                  filters={{
                    wash: 3,
                    interior_clean: 3,
                    polishing: true,
                    engine_wash: 3,
                    car_spray: 3,
                    carpet_clean: 3,
                  }}
                  image={require('../../images/icons/polish.png')}
                />
              </View>

              <View style={styles.otherServices}>
                <CircleHolder
                  title="Engine Wash"
                  filters={{
                    wash: 3,
                    interior_clean: 3,
                    polishing: 3,
                    engine_wash: true,
                    car_spray: 3,
                    carpet_clean: 3,
                  }}
                  image={require('../../images/icons/engine.png')}
                />
                <CircleHolder
                  title="Car Spray"
                  filters={{
                    wash: 3,
                    interior_clean: 3,
                    polishing: 3,
                    engine_wash: 3,
                    car_spray: true,
                    carpet_clean: 3,
                  }}
                  image={require('../../images/icons/spray.png')}
                />
                <CircleHolder
                  title="Carpet Clean"
                  filters={{
                    wash: 3,
                    interior_clean: 3,
                    polishing: 3,
                    engine_wash: 3,
                    car_spray: 3,
                    carpet_clean: true,
                  }}
                  image={require('../../images/icons/carpet.png')}
                />
              </View>
            </View>

            {/*Specialist*/}
            <View style={styles.specialist}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title}>Specialist</Text>
                <TouchableOpacity
                  style={{marginRight: wp('5%')}}
                  onPress={() => navigation.navigate('AllSpecialist')}>
                  <Text style={styles.title}>View all</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={{marginVertical: wp('3%')}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {approvedMechanics &&
                  approvedMechanics?.map(item => {
                    return (
                      <SmallHolder
                        key={item.user_name}
                        title={item.user_name}
                        specialist={item.specialist}
                        email={item.email}
                        phone={item.phone}
                        code={item.code}
                        image={require('../../images/mechanic.png')}
                        subtitle={item.specialist}
                      />
                    );
                  })}
              </ScrollView>
            </View>

            {/*Category*/}
            <View style={styles.specialist}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title}>Work Shops</Text>
                <TouchableOpacity style={{marginRight: wp('5%')}}>
                  <Text style={styles.title}>View all</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={{marginVertical: wp('2%')}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {shops?.map(item => {
                  return (
                    <SmallHolder2
                      key={item.user_name}
                      specialist={item.specialist}
                      email={item.email}
                      phone={item.phone}
                      code={item.code}
                      title={item.title}
                      image={require('../../images/carWash.jpg')}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      ) : null}

      {/*Bottom Bar*/}
      {bottomBar && bottomBar == 1 ? <Services /> : null}

      {bottomBar && bottomBar == 3 ? <Settings hide="hide" /> : null}

      {/*Bottom Bar*/}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => setBottomBar(1)}
          style={[
            styles.navbarItem,
            {
              borderRightColor: themeColors.textlight,
              borderRightWidth: wp('0.1%'),
            },
          ]}>
          {bottomBar && bottomBar == 1 ? (
            <Image
              style={styles.barIcon}
              source={require('../../images/icons/services.png')}
            />
          ) : null}
          <Text style={bottomBar == 1 ? styles.clicked : null}>Work Shops</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setBottomBar(2)}
          style={styles.navbarItem}>
          {bottomBar && bottomBar == 2 ? (
            <Image
              style={styles.barIcon}
              source={require('../../images/icons/home.png')}
            />
          ) : null}
          <Text style={bottomBar == 2 ? styles.clicked : null}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setBottomBar(3)}
          style={[
            styles.navbarItem,
            {
              borderLeftColor: themeColors.textlight,
              borderLeftWidth: wp('0.1%'),
            },
          ]}>
          {bottomBar && bottomBar == 3 ? (
            <Image
              style={styles.barIcon}
              source={require('../../images/icons/settings.png')}
            />
          ) : null}
          <Text style={bottomBar == 3 ? styles.clicked : null}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Home;
