import React, { useState } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
// import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { calculateResultAsync } from './calculatorSlice';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();   
  const dispatch = useDispatch(); 
        const handleCheckBox = () => {
          setIsChecked(!isChecked);
        };
        const vehicleType=[
          "LCV-PICKUP",
          "TATA407/410",
          "CANTER",
          "LPT17FT",
          "CBT CONTAINER",
          "SCOOTER BODY",
          "CAR CARRIER",
          "LPT19FT",
          "OBT",
          "JCB",
          "32FT CONTAINER SXL",
          "JUMBOTRK",
          "24FT CONTAINER CBT",
          "TAURAS1518",
          "OPEN TAURAS",
          "32FT CONTAINER MXL",
          "TAURAS 22FT",
          "TAURAS 32FT",
          "HBT TRAILER",
          "SLBT TRAILER",
          "LOW BED TRAILER",
          "ULTRA LBT TRAILER",
          "Trailer (ICD) 40FT",
         " TAURAS 24FT",
          "Trailer (ICD) 20FT",
          "SIDE BODY TRAILER",
          "3XL HBT TRAILER",
          "3XL SLBT TRAILER",
          "3XL LOW BED TRAILER",
          "3XL ULTRA LBT TRAILER",
          "4923 Prime Mover"
          ]
       

  return(
  <View className=" h-[100%] ">
    <ImageBackground source={require("../../assets/images/image2.png")} resizeMode="cover" className="h-[100%] flex items-center">
      <View className="w-[105%] h-[13%] bg-[#ABE87A] rounded-b-[100px] flex-row">
        <Text className="mt-[40px] text-2xl ml-[120px]">Hello, Name</Text>
        <TouchableOpacity onPress={(()=>navigation.navigate("Profile"))} className="mt-[40px] ml-[60px] flex items-center justify-center h-[40px] w-[40px] bg-white rounded-3xl">
        <FontAwesome name="user-o" size={24} color="black" /></TouchableOpacity>
      </View>
      <Text className="text-xl mt-2 px-6">Track your carbon footprint </Text>
      <Text className="text-xl px-6">effortlessly with our CO2 emission</Text>
      <Text className="text-xl px-6">calculator. Small steps, big impact!</Text>

      <KeyboardAvoidingView className=" h-[70%] w-[100%] mt-8">
        <ScrollView>
      <Formik
     initialValues={{ VechileNumber: '' , SourcePincode: '', DestinationPincode:'' , LoadedWeight:'' , VechileType: '' , MobilisationDistance:'', DeMobilisationDistance:'' }}
     onSubmit={async (values) => {
     
      if (isChecked) {
        console.log(values);
        dispatch(calculateResultAsync(values));
        navigation.navigate('Result');
      } else {
        // Do nothing, stay on the same page
      }
      // navigation.navigate('MarketplaceAfterRebid') 
      
      // setFormValues(values);
    }}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View className="pb-[50px]">
    
        <Text className="text-xl ml-10 mb-1">Trip Details</Text>
         <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('VechileNumber')}
           onBlur={handleBlur('VechileNumber')}
           value={values.VechileNumber}
           placeholder='Vechile Number'
         />
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('SourcePincode')}
           onBlur={handleBlur('SourcePincode')}
           value={values.SourcePincode}
           placeholder='Source Pincode'
           keyboardType="numeric"
         />
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('DestinationPincode')}
           onBlur={handleBlur('DestinationPincode')}
           value={values.DestinationPincode}
           placeholder='Destination Pincode'
           keyboardType="numeric"
         />
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('LoadedWeight')}
           onBlur={handleBlur('LoadedWeight')}
           value={values.LoadedWeight}
           placeholder='Loaded Weight'
           keyboardType="numeric"
         />
         <Text className="text-lg ml-10 mb-1 font-">Confirm vechile type</Text>
          {/* <TextInput className="mx-[12%] my-1 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[90px]"
           onChangeText={handleChange('VechileNumber')}
           onBlur={handleBlur('VechileNumber')}
           value={values.VechileNumber}
           placeholder='Type'
         /> */}
         <View className="mx-[12%]  rounded-xl border-2 text-black-200 text-lg h-10 flex justify-center font-semibold pl-[90px]">
         <Picker className="text-black-200 text-lg font-semibold pl-[90px]"
            enabled={true}
            mode="dropdown"
            placeholder="Vechile Type"
            onValueChange={handleChange('VechileType')}
            selectedValue={values.VechileType}
      >
       {vehicleType.map((item) => {
        return(<Picker.Item
              label={item.toString()}
              value={item.toString()}
              key={item.toString()} />)
        })}

     </Picker>
     </View>
         <Text className="text-xl ml-10 mb-1">Additional Details</Text>
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[40px]"
           onChangeText={handleChange('MobilisationDistance')}
           onBlur={handleBlur('MobilisationDistance')}
           value={values.MobilisationDistance}
           placeholder='Mobilisation Distance (km)'
           keyboardType="numeric"
         />
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[30px]"
           onChangeText={handleChange('DeMobilisationDistance')}
           onBlur={handleBlur('DeMobilisationDistance')}
           value={values.DeMobilisationDistance}
           placeholder='DeMobilisation Distance (km)'
           keyboardType="numeric"
         />
          
        <View className="mx-[65px]  flex-row">
         <CheckBox
        title='By checking this box, you agree to our terms and conditions'
        checked={isChecked}
        onPress={handleCheckBox}
      /> 
      <TouchableOpacity><Text className="text-blue-800 font-bold w-[50px] pl-2 bg-white text-lg mt-2 mr-11 pt-5 h-[70px]">T&C</Text></TouchableOpacity>
        </View>

         <TouchableOpacity onPress={handleSubmit}>
         <View className="w-[150px] h-[50px] ml-[130px] rounded-2xl mt-5 bg-blue-900 flex items-center justify-center">
         <Text className="text-white text-2xl">Submit</Text>
         </View>
         </TouchableOpacity>
       </View>
     )}
   </Formik>
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






























// import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
// import React from 'react'


// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

// export default function Calculator() {
  
//   return (
//     <SafeAreaView className="flex items-center h-screen mt-7">
//       <ImageBackground source={image} resizeMode="cover"  ></ImageBackground>
//       <Text>Calculator</Text>
//     </SafeAreaView>
//   )
// }











































// import { useState } from "react";

// export default function Anuj() {
//   const [formdata, setFormdata] = useState({
//     mobileNumber: "",
//   });

//   const handleForm = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("mobileNumber", formdata.mobileNumber);

//     try {
//       const response = await fetch("https://ranaadmin.anujdwivedi.in/ownerapi/v1/otp-login", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
        
//       } else {
//         const error = await response.text();
       
//       }
//     } catch (error) {
//       console.log(error);
//     }
    
//   };

//   return (
//     <div className="w-[100%] bg-[green]  h-[100vh] mx-auto flex flex-col items-center">
//       <h1 className="text-2xl my-3 py-3">Register User</h1>
//       <div className="">
//         <form onSubmit={handleSubmit} className="mx-auto flex flex-col">
//           <label htmlFor="number">Mobile Number</label>
//           <input type="number" id="number" name="number" onChange={handleForm} />
//           <input type="submit"></input>
//         </form>
//       </div>
//     </div>
//   );
// }
