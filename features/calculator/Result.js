import React, { useEffect, useState } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
// import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { selectCalculator, selectCalculatorError } from './calculatorSlice';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();    
        const handleCheckBox = () => {
          setIsChecked(!isChecked);
        };

        const result = useSelector(selectCalculator);
        const resulterror = useSelector(selectCalculatorError);
        

  return(
  <View className=" h-[100%] ">
    <ImageBackground source={require("../../assets/images/image2.png")} resizeMode="cover" className="h-[100%] flex items-center">
      <View className="w-[105%] h-[13%] bg-[#ABE87A] rounded-b-[100px] flex-row">
        <Text className="mt-[40px] text-2xl ml-[120px]">Hello, Name</Text>
        <View className="mt-[40px] ml-[60px] flex items-center justify-center h-[40px] w-[40px] bg-white rounded-3xl">
        <FontAwesome name="user-o" size={24} color="black" /></View>
      </View>
      <Text className="text-xl mt-2 px-6">Track your carbon footprint </Text>
      <Text className="text-xl px-6">effortlessly with our CO2 emission</Text>
      <Text className="text-xl px-6">calculator. Small steps, big impact!</Text>

      <KeyboardAvoidingView className=" h-[70%] w-[100%] mt-8">
        <ScrollView>
        <Text className="text-2xl ml-[80px] mb-1">Total Carbon Emission</Text>
        <View className="bg-[#ABE87A] mt-6 h-[60px] w-[250px] ml-[70px] rounded-2xl flex items-center justify-center">
            <Text className="text-xl">"{result ? result : resulterror}"</Text>
        </View>
   </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;