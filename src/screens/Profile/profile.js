import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeColors from '../../utils/Colors';
import {Icon} from 'react-native-elements';

const Profile = () => {
  const navigation = useNavigation();
  const [cred, setCred] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_credentials');
        console.log('YOOOOOOOOOOOOOOOOOOOOOOOO ---> ', JSON.parse(jsonValue));
        setCred(JSON.parse(jsonValue));
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
              <Text style={styles.userNameText}>{cred.name}</Text>
              <View style={styles.note}>
                <Text style={styles.noteText}>{cred.email}</Text>
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
              <Icon
                raised
                name="user"
                type="font-awesome"
                color={themeColors.TextPurlple}
              />
            </Text>
            <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
              {cred.name}
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
                raised
                name="mail"
                type="MaterialCommunityIcons"
                color={themeColors.TextPurlple}
              />
            </Text>
            <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
              {cred.email}
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
                raised
                name="supervised-user-circle"
                type="MaterialIcons"
                color={themeColors.TextPurlple}
              />
            </Text>
            <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
              Male
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
                raised
                name="location-pin"
                type="MaterialIcons"
                color={themeColors.TextPurlple}
              />
            </Text>
            <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
              Rawalpindi
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
                raised
                name="code-fork"
                type="font-awesome"
                color={themeColors.TextPurlple}
              />
            </Text>
            <Text style={{color: 'black', fontSize: wp('5%'), marginLeft: 20}}>
              ${cred?.code?.slice(0, 18)}%...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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

export default Profile;
