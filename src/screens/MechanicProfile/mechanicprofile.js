import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Api from '../../Api/api';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColors from '../../utils/Colors';
import {Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const MechanicProfile = ({route}) => {
  const navigation = useNavigation();

  const [calender, setCalender] = useState('false');
  const [clock, setClock] = useState('false');

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [userCred, setUserCred] = useState({});

  const HireMe = date => {
    var result = moment(date);
    setDate(date);
    console.log(result.format('YYYY-DD-MM'));
    setCalender('false');
    setClock('true');
  };

  const CallApi = time => {
    var result = moment(time);
    setTime(time);
    console.log(result.format('hh:mm a'));
    setClock('false');
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_credentials');
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? setUserCred(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const [userLocation, setUserLocation] = useState('');
  const getUserLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_location');
      console.log('LOCATION ->>>>>>>>>>>>>>>> ', JSON.parse(jsonValue));
      return jsonValue != null ? setUserLocation(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    getData();
    getUserLocation();
    if (time !== '') {
      var data = {
        user_code: userCred.code,
        user_phone: userCred.phone,
        user_location: userLocation,
        mechanic_code: route.params.code,
        mechanic_phone: route.params.phone,
        order_name: route.params.specialist,
        order_date: date,
        order_time: time,
        order_status: 'Pending',
      };
      Api.HireSpecialist(data)
        .then(R => {
          if (R.success === true) showToast('Appointment Added!');
          navigation.navigate('Home');
        })
        .catch(c => console.log(c));
    }
  }, [time]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/*Profile Cover Section*/}
      <ImageBackground
        source={require('../../images/background.jpeg')}
        style={styles.coverContainer}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(15, 15, 15, 0.15)',
            'rgba(15, 15, 15, 1)',
          ]}
          style={styles.linearGradient}></LinearGradient>
        <View style={styles.coverTopBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={styles.coverBarIcon}
              source={require('../../images/icons/back.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              style={styles.coverBarIcon2}
              source={require('../../images/icons/draw.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.coverBottomBar}>
          <View style={styles.userImageHolder}>
            <Image
              source={require('../../images/fixfly.png')}
              style={styles.userImage}
            />
            <TouchableOpacity style={styles.editUserImage}>
              <Image
                style={styles.editUserImageIcon}
                source={require('../../images/icons/drawSmall.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.userNameText}>{route.params.name}</Text>
            <View style={styles.note}>
              <Text style={styles.noteText}>{route.params.email}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={{padding: 30}}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: wp('7%'),
            alignItems: 'center',
          }}>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontSize: wp('5%')}}>
            <Icon name="home-repair-service" color={themeColors.TextPurlple} />
          </Text>
          <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
            {route.params.specialist} Specialist
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: wp('7%'),
            alignItems: 'center',
          }}>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontSize: wp('5%')}}>
            <Icon
              name="mail"
              type="MaterialCommunityIcons"
              color={themeColors.TextPurlple}
            />
          </Text>
          <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
            {route.params.email}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: wp('7%'),
            alignItems: 'center',
          }}>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontSize: wp('5%')}}>
            <Icon
              name="phone"
              type="MaterialIcons"
              color={themeColors.TextPurlple}
            />
          </Text>
          <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
            {route.params.phone}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: wp('7%'),
            alignItems: 'center',
          }}>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontSize: wp('5%')}}>
            <Icon
              name="location-pin"
              type="MaterialIcons"
              color={themeColors.TextPurlple}
            />
          </Text>
          <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
            Rawalpindi
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: themeColors.TextPurlple,
          height: hp('8%'),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
        onPress={() => setCalender('true')}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
          Hire Me!
        </Text>
      </TouchableOpacity>
      {calender === 'true' ? (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={date => HireMe(date.nativeEvent.timestamp)}
        />
      ) : null}

      {clock === 'true' ? (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={date => CallApi(date.nativeEvent.timestamp)}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('70%'),
    width: wp('100%'),
    position: 'absolute',
  },

  coverContainer: {
    justifyContent: 'space-between',
    height: wp('70%'),
  },

  coverTopBar: {
    marginTop: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coverBarIcon: {
    tintColor: 'white',
    width: wp('8%'),
    height: wp('8%'),
    marginHorizontal: wp('4%'),
  },

  coverBarIcon2: {
    tintColor: 'white',
    width: wp('6%'),
    height: wp('6%'),
    marginHorizontal: wp('4%'),
  },

  coverBottomBar: {
    marginBottom: wp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('4%'),
  },

  userImage: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: 74 / 2,
    backgroundColor: '#fff',
    marginBottom: wp('2%'),
    marginRight: wp('3%'),
  },

  editUserImage: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    backgroundColor: themeColors.TextPurlple,
    borderRadius: 50,
    position: 'absolute',
    marginTop: wp('12.5%'),
    marginLeft: wp('13%'),
  },

  editUserImageIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: 'white',
  },

  userDetails: {
    width: wp('60%'),
    marginBottom: wp('1%'),
    paddingBottom: wp('2%'),
  },

  userNameText: {
    fontSize: wp('6.5%'),
    color: 'white',
    fontWeight: 'bold',
  },

  inputField: {
    flex: 1,
  },

  input: {
    backgroundColor: 'rgb(72, 81, 100)',
    width: wp('90%'),
    height: wp('10%'),
    borderRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: wp('3.5%'),
    paddingLeft: wp('5%'),
  },

  TouchableOpacity: {
    backgroundColor: 'rgb(72, 81, 100)',
    width: wp('90%'),
    height: wp('11%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 50,
    marginTop: wp('3.5%'),
    justifyContent: 'center',
  },

  note: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  noteText: {
    color: 'white',
    marginRight: wp('2%'),
  },
});

export default MechanicProfile;
