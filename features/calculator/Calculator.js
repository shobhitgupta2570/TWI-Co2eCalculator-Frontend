import React, { useEffect, useRef, useState } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { CheckBox, Image } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
// import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { calculateResultAsync, selectUserInfo } from './calculatorSlice';
import { useSelector, useDispatch } from 'react-redux';



const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [vehiclePart1, setVehiclePart1] = useState('');
  const [vehiclePart2, setVehiclePart2] = useState('');
  const [vehiclePart3, setVehiclePart3] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false); // State to toggle additional details
  const userInfo = useSelector(selectUserInfo);

  const [box1, setBox1] = useState('');
  const [box2, setBox2] = useState('');
  const [box3, setBox3] = useState('');
  
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  const handleBox1Change = (text) => {
    if (text.length <= 2) {
      setBox1(text);
      if (text.length === 2) {
        box2Ref.current.focus();
      }
    }
  };

  const handleBox2Change = (text) => {
    if (text.length <= 4) {
      setBox2(text);
      if (text.length === 4) {
        box3Ref.current.focus();
      }
    }
  };

  const handleBox3Change = (text) => {
    if (text.length <= 4) {
      setBox3(text);
    }
  };

  const handleBox3Blur = () => {
    const totalDigits = box1.length + box2.length + box3.length;
    if (totalDigits === 9) {
      const newBox2 = box2.slice(0, -1);
      const newBox3 = box2.slice(-1) + box3;
      setBox2(newBox2);
      setBox3(newBox3);
    }
  };


  const part1Ref = useRef(null);
  const part2Ref = useRef(null);
  const part3Ref = useRef(null);
  const navigation = useNavigation();   
  const dispatch = useDispatch(); 
  const result = useSelector((state) => state.calculator.result); // Adjust according to your state structure
  const resultStatus = useSelector((state) => state.calculator.status); // Assuming you have status in your state
  const error = useSelector((state) => state.calculator.error);

  useEffect(() => {
    if (resultStatus === 'idle' && result) {
      setIsLoading(false);
      navigation.navigate('Result');
    } else if (resultStatus === 'idle' && error) {
      setIsLoading(false);
      // Handle error if necessary
      Alert.alert('Error', error); // Display error using Alert (or any other notification mechanism)
    }
  }, [resultStatus, result, error]);

  const toggleAdditionalDetails = () => {
    setShowAdditionalDetails(!showAdditionalDetails); // Toggle additional details visibility
  };
  
        const handleCheckBox = () => {
          setIsChecked(!isChecked);
        };
        
       

  return(
  <View className=" h-[100%]">
    <ImageBackground source={require("../../assets/images/bg4.jpg")} resizeMode="cover" className="h-[100%] flex items-center">
      <View className="w-[100%] h-[13%] bg-cyan-200 rounded-b-[100px] flex-row">
        <Text className="mt-[40px] text-2xl ml-[120px]">Hello, {userInfo?userInfo.userName:"Name"}</Text>
        <TouchableOpacity onPress={(()=>navigation.navigate("Profile"))} className="mt-[40px] ml-[60px] flex items-center justify-center h-[40px] w-[40px] bg-white rounded-3xl">
        <FontAwesome name="user-o" size={24} color="black" /></TouchableOpacity>
      </View>
      {/* <Text className="text-xl mt-2 px-6">Track your carbon footprint </Text>
      <Text className="text-xl px-6">effortlessly with our CO2 emission</Text>
      <Text className="text-xl px-6">calculator. Small steps, big impact!</Text> */}

      <KeyboardAvoidingView className=" h-[70%] w-[100%] mt-8">
        <ScrollView> 
      <Formik
     initialValues={{ VechileNumber: '' , SourcePincode: '', DestinationPincode:'' , LoadedWeight:'' , VechileType: '' , MobilisationDistance:'', DeMobilisationDistance:'' }}
     onSubmit={async (values) => {
      setIsLoading(true); // Start loading
      values.VechileNumber = box1+box2+box3;
      if (isChecked) {
        console.log(values);
        dispatch(calculateResultAsync(values));
        // navigation.navigate('Result');
        
      } else {
        // Do nothing, stay on the same page
        setIsLoading(false);
      }
      // navigation.navigate('MarketplaceAfterRebid') 
      
      // setFormValues(values);
    }}
   >
     {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
       <View className="pb-[50px]">
    
        <Text className="text-2xl mx-auto mb-1">Trip Details</Text>
         {/* <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('VechileNumber')}
           onBlur={handleBlur('VechileNumber')}
           value={values.VechileNumber}
           placeholder='Vechile Number'
         /> */}
         <Text className="text-xl  mb-1 ml-[12%] mt-6">Vehicle Number</Text>
         {/* <View className="flex-row items-center mx-[12%] w-[80%]">
         <TextInput
              className=" my-2 rounded-xl border-2 pl-[10%] text-black-200 text-lg font-semibold w-[50%]"
              onChangeText={(text) => setVehiclePart1(text)}
              onBlur={handleBlur('VechileNumber')}
              value={vehiclePart1}
              placeholder=''
            />
            {(errors.vechilePart1 && touched.vechileNumber1) &&
                  <Text style={{ color: 'red' }}>{errors.userName}</Text>
                }
            <TextInput
              className=" my-2 mx-[5%] pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[30%]"
              onChangeText={(text) => setVehiclePart2(text)}
              onBlur={handleBlur('VechileNumber')}
              value={vehiclePart2}
              placeholder=''
            />
            </View> */}
{/* <View style={styles.container}> */}
{/* <View className="flex-row items-center mx-[12%] w-[80%]">
      <TextInput
      className="my-2 rounded-xl border-2 pl-[10%] text-black-200 text-lg font-semibold w-[20%]"
        // style={styles.input}
        value={box1}
        onChangeText={handleBox1Change}
        // keyboardType="numeric"
        maxLength={2}
        ref={box1Ref}
      />
      <TextInput
      className="my-2 mx-[5%] pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[30%]"
        // style={styles.input}
        value={box2}
        onChangeText={handleBox2Change}
        // keyboardType="numeric"
        maxLength={4}
        ref={box2Ref}
      />
      <TextInput
      className="my-2 pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[40%]"
        // style={styles.input}
        value={box3}
        onChangeText={handleBox3Change}
        onBlur={handleBox3Blur}
        keyboardType="numeric"
        maxLength={4}
        ref={box3Ref}
      />
      
    </View> */}

<View className="flex-row items-center mx-[12%] w-[80%]">
      <TextInput
      className="my-2 rounded-xl border-2 pl-[10%] text-black-200 text-lg font-semibold w-[20%]"
        // style={styles.input}
        value={box1}
        onChangeText={handleBox1Change}
        // keyboardType="numeric"
        maxLength={2}
        ref={box1Ref}
      />
      <TextInput
      className="my-2 mx-[5%] pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[30%]"
        // style={styles.input}
        value={box2}
        onChangeText={handleBox2Change}
        // keyboardType="numeric"
        maxLength={4}
        ref={box2Ref}
      />
      <TextInput
      className="my-2 pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[40%]"
        // style={styles.input}
        value={box3}
        onChangeText={handleBox3Change}
        onBlur={handleBox3Blur}
        keyboardType="numeric"
        maxLength={4}
        ref={box3Ref}
      />
      
    </View>

      
            {/* <View className="flex-row items-center mx-[12%] w-[80%]">
                    <TextInput
                      ref={part1Ref}
                      className="my-2 rounded-xl border-2 pl-[10%] text-black-200 text-lg font-semibold w-[20%]"
                      onChangeText={(text) => {
                        setVehiclePart1(text);
                        if (text.length === 2) {
                          part2Ref.current.focus();
                        }
                      }}
                      onBlur={handleBlur('VechileNumber')}
                      value={vehiclePart1}
                      placeholder=''
                      maxLength={2}
                    />
                    <TextInput
                      ref={part2Ref}
                      className="my-2 mx-[5%] pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[30%]"
                      onChangeText={(text) => {
                        setVehiclePart2(text);
                        if (text.length === 4) {
                          part3Ref.current.focus();
                        }
                      }}
                      onBlur={handleBlur('VechileNumber')}
                      value={vehiclePart2}
                      placeholder=''
                      maxLength={4}
                    />
                    <TextInput
                      ref={part3Ref}
                      className="my-2 pl-[5%] rounded-xl border-2 text-black-200 text-lg font-semibold w-[40%]"
                      onChangeText={(text) => setVehiclePart3(text)}
                      onBlur={handleBlur('VechileNumber')}
                      value={vehiclePart3}
                      placeholder=''
                      maxLength={4}
                    />
                  </View> */}
                  
            <Text className="text-xl  mb-1 ml-[12%] mt-2">Source Pincode</Text>
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('SourcePincode')}
           onBlur={handleBlur('SourcePincode')}
           value={values.SourcePincode}
           placeholder='Source Pincode'
           keyboardType="numeric"
         />
        
         <Text className="text-xl  mb-1 ml-[12%] mt-2">Destination Pincode</Text>
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('DestinationPincode')}
           onBlur={handleBlur('DestinationPincode')}
           value={values.DestinationPincode}
           placeholder='Destination Pincode'
           keyboardType="numeric"
         />
         <Text className="text-xl  mb-1 ml-[12%] mt-2">Loaded Weight</Text>
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[70px]"
           onChangeText={handleChange('LoadedWeight')}
           onBlur={handleBlur('LoadedWeight')}
           value={values.LoadedWeight}
           placeholder='Loaded Weight'
           keyboardType="numeric"
         />
       
       <TouchableOpacity onPress={toggleAdditionalDetails}>
                    <Text className="text-xl font-[500] ml-10 mb-1 mt-4">
                      Additional Details (optional) {showAdditionalDetails ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>
                  {showAdditionalDetails && (
                    <>
                      <Text className="text-xl  mb-1 ml-[12%] mt-2">Mobilisation Distance</Text>
                      <TextInput
                        className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[30px]"
                        onChangeText={handleChange('MobilisationDistance')}
                        onBlur={handleBlur('MobilisationDistance')}
                        value={values.MobilisationDistance}
                        placeholder='Mobilisation Distance (km)'
                        keyboardType="numeric"
                      />
                      <Text className="text-xl  mb-1 ml-[12%] mt-2">DeMobilisation Distance</Text>
                      <TextInput
                        className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[30px]"
                        onChangeText={handleChange('DeMobilisationDistance')}
                        onBlur={handleBlur('DeMobilisationDistance')}
                        value={values.DeMobilisationDistance}
                        placeholder='DeMobilisation Distance (km)'
                        keyboardType="numeric"
                      />
                    </>
                  )}
         {/* <Text className="text-xl font-[500] ml-10 mb-1 mt-4">Additional Details (optional)</Text>
         <Text className="text-xl  mb-1 ml-[12%] mt-2">Mobilisation Distance</Text>
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[30px]"
           onChangeText={handleChange('MobilisationDistance')}
           onBlur={handleBlur('MobilisationDistance')}
           value={values.MobilisationDistance}
           placeholder='Mobilisation Distance (km)'
           keyboardType="numeric"
         />
         <Text className="text-xl  mb-1 ml-[12%] mt-2">DeMobilisation Distance</Text>
           <TextInput className="mx-[12%] my-2 rounded-xl border-2 text-black-200 text-lg font-semibold pl-[30px]"
           onChangeText={handleChange('DeMobilisationDistance')}
           onBlur={handleBlur('DeMobilisationDistance')}
           value={values.DeMobilisationDistance}
           placeholder='DeMobilisation Distance (km)'
           keyboardType="numeric"
         /> */}
          
        <View className="mx-[65px]  flex-row justify-center">
         <CheckBox
        title='By checking this box, you agree to our terms and conditions'
        checked={isChecked}
        onPress={handleCheckBox}
      /> 
      <TouchableOpacity><Text className="text-blue-800 font-bold w-[50px] pl-2 bg-white text-lg mt-2 mr-11 pt-5 h-[70px]">T&C</Text></TouchableOpacity>
        </View>

         <TouchableOpacity onPress={handleSubmit}>
         <View className="w-[150px] h-[50px] ml-[130px] rounded-2xl mt-5 bg-blue-900 flex items-center justify-center">
         {isLoading ? (
                        <ActivityIndicator size="large" color="#ffffff" />
                      ) : (
                        <Text className="text-white text-2xl">Submit</Text>
                      )}
         {/* <Text className="text-white text-2xl">Submit</Text> */}
         </View>
         </TouchableOpacity>
       </View>
     )}
   </Formik>
   
   </ScrollView>
   
      </KeyboardAvoidingView>
      <View className="flex-1 flex-row items-center justify-center mt-0">
        <Text className="text-white">Made in</Text>
        <Image
          className=" ml-2"
          source={require("../../assets/images/image 10.png")}
          style={{ width: 40, height: 22 }}
        />
      </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    width: '30%',
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
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
