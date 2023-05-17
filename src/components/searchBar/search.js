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

import themeColors from '../../utils/Colors';

const SearchBar = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,

          borderRadius: wp('50%'),
        }}>
        <TextInput
          style={styles.search}
          returnKeyType={'search'}
          keyboardType={'web-search'}
          placeholder={'search'}
          placeholderTextColor={'black'}
        />

        <View style={styles.iconHolder}>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../../images/icons/search.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  search: {
    width: wp('80%'),
    height: hp('5.5%'),
    backgroundColor: 'white',
    borderRadius: wp('50%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('13%'),
    color: 'black',
  },
  icon: {
    tintColor: 'black',
    marginLeft: wp('1%'),
    width: wp('5%'),
    height: wp('5%'),
  },
  iconHolder: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
