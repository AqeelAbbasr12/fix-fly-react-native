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
import SmallHolder from '../../components/smallHolder';
import {Icon} from 'react-native-elements';
import themeColors from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api/api';
import image from '../../images/background.jpeg';
import openMap from 'react-native-open-maps';

const Otherservices = ({route}) => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState(route.params.filters);
  const [shops, setShops] = useState([]);
  useEffect(() => {
    console.log('filters  ->>>>>>>>>>>>>>', filters);
    const GetAllShops = () => {
      Api.GetAllShops()
        .then(R => {
          setShops(R.data);
        })
        .catch(c => console.log(c));
    };

    GetAllShops();
  }, []);

  const _goToYosemite = location => {
    openMap({latitude: location.latitude, longitude: location.longitude});
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
            justifyContent: 'space-between',
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
              marginRight: 10,
            }}>
            {route.params.title} Specialist
          </Text>
        </View>
        <View style={styles.settings}>
          {shops &&
            shops
              ?.filter(
                fl =>
                  fl.wash === filters.wash ||
                  fl.interior_clean === filters.interior_clean ||
                  fl.polishing === filters.polishing ||
                  fl.engine_wash === filters.engine_wash ||
                  fl.car_spray === filters.car_spray ||
                  fl.carpet_clean === filters.carpet_clean,
              )
              .map(item => {
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
                          <Icon
                            name="store"
                            color={themeColors.Icon}
                            size={20}
                          />{' '}
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
                          {filters.wash === true ? 'Wash ' : ''}
                          {filters.interior_clean === true
                            ? 'Interior Clean '
                            : ''}
                          {filters.polishing === true ? 'Polishing ' : ''}
                          {filters.engine_wash === true ? 'Engine Wash ' : ''}
                          {filters.car_spray === true ? 'Car Spray ' : ''}
                          {filters.carpet_clean === true ? 'Carpet Clean ' : ''}
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
});

export default Otherservices;
