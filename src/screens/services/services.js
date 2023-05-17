import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Icon} from 'react-native-elements';

import themeColors from '../../utils/Colors';
import fontFamily from '../../utils/fontfamily';
import Api from '../../Api/api';
import image from '../../images/background.jpeg';

import openMap from 'react-native-open-maps';

const Services = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const GetAllShops = () => {
      Api.GetAllShops()
        .then(R => {
          setData(R.data);
        })
        .catch(c => console.log(c));
    };

    GetAllShops();
  }, []);

  const _goToYosemite = location => {
    openMap({latitude: location.latitude, longitude: location.longitude});
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.settings}>
          {data?.map(item => {
            return (
              <TouchableOpacity
                key={item.title}
                style={{
                  paddingBottom: 5,
                  width: '47%',
                  backgroundColor: themeColors.misty,
                  marginBottom: 10,
                  width: '47%',
                  backgroundColor: 'white',
                  borderRadius: wp('3%'),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
                onPress={() => _goToYosemite(item.location)}>
                <Image
                  source={image}
                  style={{
                    width: '100%',
                    height: 150,
                    borderTopLeftRadius: wp('2%'),
                    borderTopRightRadius: wp('2%'),
                  }}
                />
                <View style={{padding: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text>
                      <Icon name="store" color={themeColors.Icon} size={20} />{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                      }}>
                      {item.title?.slice(0, 9)}
                      {item.title?.length > 9 ? '...' : ''}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                      }}>
                      <Icon
                        name="home-repair-service"
                        color={themeColors.Icon}
                        size={20}
                      />{' '}
                      {item.services?.wash ? 'Wash, ' : ''}
                      {item.services?.interior_clean ? 'Interior Clean, ' : ''}
                      {item.services?.polishing ? 'Polishing, ' : ''}
                      {item.services?.engine_wash ? 'Engine Wash, ' : ''}
                      {item.services?.car_spray ? 'Car Spray, ' : ''}
                      {item.services?.carpet_clean ? 'Carpet Clean, ' : ''}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                      }}>
                      <Icon
                        name="location-pin"
                        color={themeColors.Icon}
                        size={20}
                      />{' '}
                      {item.address?.slice(0, 14)}
                      {item.address?.length > 14 ? '...' : ''}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  settings: {
    flex: 1,
    backgroundColor: 'white',
    width: wp('100%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('0.5%'),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
  },
});

export default Services;
