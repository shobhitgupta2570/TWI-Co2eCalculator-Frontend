// import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './features/calculator/Calculator';
import Login from './features/calculator/Login';
import Result from './features/calculator/Result';
import Signup from './features/calculator/Signup';
import Profile from './features/calculator/Profile';
import Splash1 from './screens/Splash1';
import Splash2 from './screens/Splash2';

const Stack = createNativeStackNavigator();

export default () => {

   const [splash1Visible, setSplash1Visible] = useState(true);
  const [splash2Visible, setSplash2Visible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSplash1Visible(false);
      setSplash2Visible(true);
    }, 2000); // Set duration for Splash1 (in milliseconds)

    const timer2 = setTimeout(() => {
      setSplash2Visible(false);
    }, 4000); // Set duration for Splash2 (in milliseconds)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

   return (
      <>
      {/* {splash1Visible && <Splash1 />} */}
      {splash2Visible && <Splash2 />}
      {!splash1Visible && !splash2Visible && (
   <Stack.Navigator initialRouteName='Result' screenOptions={{ headerShown: false }}>
   <Stack.Screen name="Calculator" component={Calculator} />
   <Stack.Screen name="Result" component={Result} />
   <Stack.Screen name="Signup" component={Signup} />
   <Stack.Screen name="Profile" component={Profile} />
   <Stack.Screen name="Login" component={Login} />
   <Stack.Screen name="Splash1" component={Splash1} />
   <Stack.Screen name="Splash2" component={Splash2} />
</Stack.Navigator>
   )}  
 </>
);

}