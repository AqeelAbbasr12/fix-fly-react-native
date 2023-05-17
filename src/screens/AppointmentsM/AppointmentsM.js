import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SmallHolder from '../../components/smallHolder';
import {Icon} from 'react-native-elements';
import themeColors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api/api';
import moment from 'moment';
import openMap from 'react-native-open-maps';
import {showLocation} from 'react-native-map-link';

const AppointmentsM = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@mechanic_credentials');
        return jsonValue != null
          ? Api.GetAppointmentsM(JSON.parse(jsonValue))
              .then(R => {
                setAppointments(R.data);
              })
              .catch(c => console.log(c))
          : null;
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [payment, setPayment] = useState('');
  const ChargeUser = (code, charges, status) => {
    Api.makeCharges(code, charges, status)
      .then(R => {
        if (R === 'success') showToast(R);
        else showToast('Error!');
      })
      .then(() => navigation.goBack())
      .then(() => navigation.navigate('AppointmentsM'))
      .catch(c => console.log(c));
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: themeColors.TextPurlple,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 30,
                height: hp('4%'),
                marginLeft: 10,
                tintColor: 'white',
              }}
              source={require('../../images/icons/backArrow.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'white',
              marginLeft: wp('21%'),
            }}>
            My Appointments
          </Text>
        </View>

        <View style={styles.settings}>
          {appointments.length > 0 &&
            appointments.map(item => {
              return (
                <View key={item.code} style={{marginBottom: 15}}>
                  <View style={styles.card}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '47%',
                      }}>
                      <Icon
                        name="code-fork"
                        type="font-awesome"
                        color={themeColors.TextPurlple}
                        size={20}
                      />
                      <Text
                        style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                        {item.code.slice(0, 7)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '47%',
                      }}>
                      <Icon
                        name="phone"
                        type="MaterialIcons"
                        color={themeColors.TextPurlple}
                        size={20}
                      />
                      <Text
                        style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                        {item.user_phone}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '47%',
                        marginTop: 20,
                      }}>
                      <Icon
                        name="drive-file-rename-outline"
                        type="MaterialIcons"
                        color={themeColors.TextPurlple}
                        size={20}
                      />
                      <Text
                        style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                        {item.order_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '47%',
                        marginTop: 20,
                        marginLeft: 15,
                      }}>
                      <Icon
                        name="date-range"
                        type="MaterialIcons"
                        color={themeColors.TextPurlple}
                        size={20}
                      />
                      <Text
                        style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                        {moment(item.order_date).format('YYYY-DD-MM')}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '47%',
                        marginTop: 20,
                      }}>
                      <Icon
                        name="update"
                        type="MaterialIcons"
                        color={themeColors.TextPurlple}
                        size={20}
                      />
                      <Text
                        style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                        {moment(item.order_time).format('hh:mm a')}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '47%',
                        marginTop: 20,
                        marginLeft: 5,
                      }}>
                      <Text
                        style={{
                          color: themeColors.TextPurlple,
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        Status:
                      </Text>
                      <Text
                        style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                        {item.order_status}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          let loc = JSON.parse(item.user_location);
                          if (
                            item.order_status === 'pending' ||
                            item.order_status === 'charged'
                          )
                            showLocation({
                              latitude: loc.latitude,
                              longitude: loc.longitude,
                              googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
                              googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58', // optionally specify the google-place-id
                              alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
                              dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
                              dialogMessage:
                                'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
                              cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
                              appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
                              naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
                              // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
                              // app: 'uber',  // optionally specify specific app to use
                              directionsMode: 'car', // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
                            });
                        }}
                        style={{
                          backgroundColor: themeColors.container,
                          width: '45%',
                          paddingVertical: 15,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Get Location
                        </Text>
                      </TouchableOpacity>

                      {item.order_status === 'paid' ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#32a852',
                            width: '45%',
                            paddingVertical: 15,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            Paid
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (payment !== '') {
                              if (item.order_status === 'pending')
                                ChargeUser(item.code, payment, 'charged');
                            }
                          }}
                          style={{
                            backgroundColor:
                              item.order_status === 'pending'
                                ? '#3199FF'
                                : '#fc9d03',
                            width: '45%',
                            paddingVertical: 15,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            {item.order_status === 'pending'
                              ? 'Issue Charges'
                              : 'Charged Money'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {item.order_status === 'pending' ? (
                      <TextInput
                        onChangeText={setPayment}
                        placeholder="Enter amount!"
                        placeholderTextColor={'black'}
                        style={{
                          marginTop: 25,
                          backgroundColor: themeColors.misty,
                          width: '100%',
                          paddingVertical: 15,
                          textAlign: 'center',
                          borderRadius: 50,
                          color: 'black',
                        }}
                      />
                    ) : null}
                  </View>
                </View>
              );
            })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  settings: {
    flex: 1,
    backgroundColor: 'white',
    width: wp('100%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('0.5%'),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    backgroundColor: 'white',
  },

  card: {
    backgroundColor: 'white',
    width: wp('90%'),
    borderRadius: wp('3%'),
    marginRight: wp('3%'),
    marginBottom: wp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 30,
    elevation: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AppointmentsM;
