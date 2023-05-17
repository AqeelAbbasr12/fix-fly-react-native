import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './src/screens/SignIn';
import Signup from './src/screens/Signup';
import ForgetPassword from './src/screens/ForgetPassword';
import Settings from './src/screens/settings';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import FindMyMechanic from './src/screens/FindMyMechanic';
import OtherServices from './src/screens/OtherServices';
import MechanicProfile from './src/screens/MechanicProfile';
import SplashScreen from './src/screens/SplashScreen';
import SignIn_M from './src/screens/SignIn_M';
import Signup_M from './src/screens/Signup_M';
import AllSpecialist from './src/screens/AllSpecialist';
import Appointments from './src/screens/Appointments/Appointments';
import ShopProfile from './src/screens/ShopProfile';
import HomeMechanic from './src/screens/HomeMechanic';
import AppointmentsM from './src/screens/AppointmentsM';
import ProfileM from './src/screens/ProfileM';
import settingsM from './src/screens/settingsM';

const Stack = createStackNavigator();

const App = () => {
  const [TimeCheck, setTimeCheck] = useState(true);
  const TheSplashScreen = () => {
    setTimeout(() => {
      setTimeCheck(false);
    }, 3000);
  };

  const [LoginToken, setLoginToken] = useState('SignIn');
  const getLoginToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@logintoken');
      console.log('LOGIN TOKEN =>>>>>>>>>>>>> ', value);
      if (value === 'true') {
        setLoginToken('Home');
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  useEffect(() => {
    TheSplashScreen();
    getLoginToken();
  });

  if (TimeCheck == true) {
    return (
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={LoginToken}>
          <Stack.Screen
            name="SignIn_M"
            component={SignIn_M}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup_M"
            component={Signup_M}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SettingsM"
            component={settingsM}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FindMyMechanic"
            component={FindMyMechanic}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtherServices"
            component={OtherServices}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MechanicProfile"
            component={MechanicProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AllSpecialist"
            component={AllSpecialist}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Appointments"
            component={Appointments}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ShopProfile"
            component={ShopProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeMechanic"
            component={HomeMechanic}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppointmentsM"
            component={AppointmentsM}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileM"
            component={ProfileM}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
