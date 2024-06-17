import React, { useEffect, useState } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
// import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { selectCalculator, selectCalculatorError, selectUserInfo } from './calculatorSlice';
import { useSelector, useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const navigation = useNavigation();    
        const handleCheckBox = () => {
          setIsChecked(!isChecked);
        };

        const result = useSelector(selectCalculator);
        const resulterror = useSelector(selectCalculatorError);

        const generatePDF = async () => {
          try {
            const htmlContent = `
              <html>
                <head>
                  <title>Sample PDF</title>
                </head>
                <body>
                  <h1>This is a sample PDF</h1>
                  <p>Generated with react-native-html-to-pdf</p>
                </body>
              </html>
            `;
      
            // Generate PDF
            const { uri } = await RNHTMLtoPDF.convert({
              html: htmlContent,
              fileName: 'sample',
              base64: true,
            });
      
            // Save PDF to file system
            const pdfUri = FileSystem.documentDirectory + 'sample.pdf';
            await FileSystem.writeAsStringAsync(pdfUri, uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
      
            // Share the PDF file
            await Sharing.shareAsync(pdfUri);
      
            Alert.alert('Success', 'PDF downloaded and shared!');
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        };
      
        

  return(
  <View className=" h-[100%] ">
    <ImageBackground source={require("../../assets/images/bg4.jpg")} resizeMode="cover" className="h-[100%] flex items-center">
      <View className="w-[105%] h-[13%] bg-cyan-200 rounded-b-[100px] flex-row">
        <Text className="mt-[40px] text-2xl ml-[120px]">Hello, {userInfo?userInfo.userName:"Name"}</Text>
        <View className="mt-[40px] ml-[60px] flex items-center justify-center h-[40px] w-[40px] bg-white rounded-3xl">
        <FontAwesome name="user-o" size={24} color="black" /></View>
      </View>
      <Text className="text-xl mt-2 px-6">Track your carbon footprint </Text>
      <Text className="text-xl px-6">effortlessly with our CO2 emission</Text>
      <Text className="text-xl px-6">calculator. Small steps, big impact!</Text>

      <KeyboardAvoidingView className=" h-[70%] w-[100%] mt-8">
        <ScrollView>
        <Text className="text-2xl ml-[80px] mb-1">Total Carbon Emission</Text>
        <View className="bg-blue-100 mt-6 h-[60px] w-[250px] ml-[70px] rounded-2xl flex items-center justify-center">
          
            <Text className="text-xl">{result && result}   kg</Text>
           
        </View>
        <View className="items-center justify-center mt-11">
        <Text className="text-xl text-red-700">{resulterror && resulterror} </Text></View>

        <TouchableOpacity onPress={generatePDF} className="h-11 w-[60%] mx-auto flex-row justify-center items-center bg-blue-400">
          <Text className="font-semibold text-lg mr-4">Download Certificate</Text>
          <AntDesign name="download" size={24} color="black" />
          </TouchableOpacity>
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