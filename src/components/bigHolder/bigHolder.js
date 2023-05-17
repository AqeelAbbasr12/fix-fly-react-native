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
import {useNavigation} from '@react-navigation/native';

const BigHolder = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate(props.navigateTo)}>
        <Image
          style={styles.image}
          source={require('../../images/carRepair2.jpg')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    width: wp('85%'),
    height: hp('22%'),
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.41,

    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp('3%'),
  },
});

export default BigHolder;
