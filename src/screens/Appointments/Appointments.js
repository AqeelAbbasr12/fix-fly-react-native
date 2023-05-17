import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
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

const Appointments = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_credentials');
        return jsonValue != null
          ? Api.GetAppointments(JSON.parse(jsonValue))
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

  const getMechanicById = code => {
    Api.GetMechanicById(code)
      .then(R =>
        navigation.navigate('MechanicProfile', {
          name: R.user_name,
          specialist: R.specialist,
          email: R.email,
          phone: R.phone,
          code: R.code,
        }),
      )
      .catch(c => console.log(c));
  };

  const [PaymentModal, setPaymentModal] = useState(false);
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const MakePayment = (code, status) => {
    Api.makePayment(code, status)
      .then(R => {
        if (R === 'success') showToast(R);
        else showToast('Error!');
      })
      .then(() => navigation.goBack())
      .then(() => navigation.navigate('Appointments'))
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
                        {item.mechanic_code.slice(0, 7)}
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
                        {item.mechanic_phone}
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
                          if (item.order_status !== 'paid')
                            getMechanicById(item.mechanic_code);
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
                          View Profile
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
                          style={{
                            backgroundColor:
                              item.order_status === 'pending'
                                ? '#fc9d03'
                                : '#3199FF',
                            width: '45%',
                            paddingVertical: 15,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            {item.order_status === 'pending'
                              ? 'Pending...'
                              : 'Charged'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {item.order_status === 'charged' ? (
                      <View
                        style={{
                          marginTop: 25,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (item.order_status === 'charged')
                              MakePayment(item.code, 'paid');
                          }}
                          style={{
                            backgroundColor: themeColors.misty,
                            width: '100%',
                            paddingVertical: 15,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: themeColors.container,
                            }}>
                            Pay{' '}
                            <Text style={{color: themeColors.container}}>
                              {' '}
                              Rs.{item.order_amount ? item.order_amount : 0}
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </View>
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

export default Appointments;
