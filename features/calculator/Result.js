import React, { useEffect, useState } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Platform, Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { CheckBox, Image } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
// import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { selectCalculator, selectCalculatorError, selectUserInfo } from './calculatorSlice';
import { useSelector, useDispatch } from 'react-redux';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const App = () => {
  const userBoy ="rocky";
  
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const [isChecked, setIsChecked] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const navigation = useNavigation();    
        const handleCheckBox = () => {
          setIsChecked(!isChecked);
        };

        const result = useSelector(selectCalculator);
        // const result = {
        //   co2Emission : 4545
        // }
        const resulterror = useSelector(selectCalculatorError);

       
        const print = async () => {
          // On iOS/android prints the given html. On web prints the HTML from the current page.
          await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
          });
        };
        const html = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of CO2 Emission</title>
    <style>
        @font-face {
            font-family: 'Magnolia Script';
            src: url('MagnoliaScript.ttf') format('truetype');
        }

        body {
            font-family: 'Playfair Display', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f9fa;
            margin: 0;
        }

        .certificate {
            border: 10px solid #D4AF37;
            padding: 30px;
            width: 700px;
            text-align: center;
            background-color: #fff;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            position: relative;
            background: url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png');
        }

        .certificate h1 {
            font-size: 36px;
            margin-bottom: 20px;
            font-family: 'Magnolia Script', cursive;
            color: #D4AF37;
        }

        .certificate p {
            font-size: 18px;
            margin: 10px 0;
        }

        .certificate .highlight {
            font-weight: bold;
            color: #2c3e50;
        }

        .top-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .top-section p {
            margin: 0;
            font-size: 16px;
        }

        .signature-section {
            margin-top: 40px;
            text-align: right;
        }

        .signature-line {
            margin-top: 20px;
            border-top: 1px solid #000;
            width: 250px;
            margin-left: auto;
            margin-right: 0;
        }

        .issuer-section {
            margin-top: 40px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="certificate">
        <div class="top-section">
            <p>Certificate Number: <span class="highlight" id="certificateNumber">${result && result.certificateNumber}</span></p>
            <p>Date: <span class="highlight" id="date">${result && result.certificateIssueDate}</span></p>
        </div>
        <h1>Certificate of CO2 Emission</h1>
        <p>This is to certify that the vehicle owned by</p>
        <p class="highlight" id="vehicleOwner">${result && result.vehicleOwner}</p>
        <p>with vehicle number</p>
        <p class="highlight" id="vehicleNumber">${result && result.vehicleNumber}</p>
        <p>has emitted</p>
        <p><span class="highlight" id="co2Emission">${result && result.co2Emission}</span> kg of CO2</p>

        <div class="signature-section">
            <p>Authorized Signature</p>
            <div class="signature-line" id="signature"></div>
        </div>

        <div class="issuer-section">
            <p>Issued by:</p>
            <p class="highlight">Transvue Solution India Pvt. Ltd.</p>
        </div>
    </div>

    <script>
        // You can set the values dynamically using JavaScript
        document.getElementById("vehicleOwner").innerText = "John Doe";
        document.getElementById("vehicleNumber").innerText = "ABC1234";
        document.getElementById("co2Emission").innerText = "120.5";
        document.getElementById("date").innerText = "June 18, 2024";
        document.getElementById("certificateNumber").innerText = "CERT-2024-001";
        document.getElementById("signature").innerText = "Jane Smith";  // Example signature name
    </script>
</body>

</html>
        `;
        const printToFile = async () => {
          // On iOS/android prints the given html. On web prints the HTML from the current page.
          const { uri } = await Print.printToFileAsync({ html });
          console.log('File has been saved to:', uri);
          await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        };
      
        const selectPrinter = async () => {
          const printer = await Print.selectPrinterAsync(); // iOS only
          setSelectedPrinter(printer);
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
          
            <Text className="text-xl">{result && result.co2Emission}   kg</Text>
           
        </View>
        <View className="bg-blue-100 mt-6 h-[60px] w-[250px] ml-[70px] rounded-2xl flex items-center justify-center">
          
            <Text className="text-xl">{result && (result.co2Emission/1000).toFixed(1)}   unit</Text>
           
        </View>

        <View className=" mt-10 h-[60px] w-[250px] ml-[70px] rounded-2xl flex items-center justify-center">
          <View className="flex-row">
            <Text className="text-xl">Plant  {result && (result.co2Emission/1000).toFixed(0)} trees</Text>
            {/* <Image
        source={{ uri: "../../assets/images/bg4.jpg" }}
        style={styles.image}
      /> */}
           <Image
          // className="mt-[50px] ml-[30px]"
          source={require("../../assets/images/R.png")}
          style={{ width: 22, height: 20 }}
        />
        <Text className="text-xl "> to compensate </Text>
        </View>
        <View>
        <Text className="text-xl px-[5%] ml-[10%]">for your co2 Emission</Text>
        </View>
        </View>
        
        <View className="items-center justify-center mt-11">
        <Text className="text-xl text-red-700">{resulterror && resulterror} </Text></View>

     

          <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
         </ScrollView>
         <View className="flex-1 flex-row items-center justify-center mt-0">
        <Text className="text-white">Made in</Text>
        <Image
          className=" ml-2"
          source={require("../../assets/images/image 10.png")}
          style={{ width: 40, height: 22 }}
        />
      </View>
      </KeyboardAvoidingView>

      
    </ImageBackground>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});

export default App;