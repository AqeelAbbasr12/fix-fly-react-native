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

const AllSpecialist = () => {
  const navigation = useNavigation();

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
  }, []);

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
              marginLeft: wp('25%'),
            }}>
            All Specialist
          </Text>
        </View>
        <View style={styles.settings}>
          {approvedMechanics &&
            approvedMechanics?.map(item => {
              return (
                <View style={{marginBottom: 15}}>
                  <SmallHolder
                    key={item.user_name}
                    title={item.user_name}
                    specialist={item.specialist}
                    email={item.email}
                    code={item.code}
                    image={require('../../images/mechanic.png')}
                    subtitle={item.specialist}
                  />
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
});

export default AllSpecialist;
