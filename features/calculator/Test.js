import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Animated, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const animation = useRef(null);
  const translateX = useRef(new Animated.Value(-200)).current; // Starting position off-screen

  const startAnimation = () => {
    Animated.timing(translateX, {
      toValue: width,
      duration: 5000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <LottieView
          autoPlay
          ref={animation}
          style={styles.lottieView}
          source={require('../../Truck1.json')}
        />
      </Animated.View>
      <View style={styles.buttonContainer}>
        {/* <Button
          title="Restart Animation"
          onPress={() => {
            translateX.setValue(-200);
            startAnimation();
          }}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottieView: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});








































// import React, { useRef, useEffect } from 'react';
// import { Button, StyleSheet, View, Animated, Dimensions } from 'react-native';
// import LottieView from 'lottie-react-native';

// const { width } = Dimensions.get('window');

// export default function App() {
//   const animation = useRef(null);
//   const translateX = useRef(new Animated.Value(-200)).current; // Starting position off-screen

//   const startAnimation = () => {
//     Animated.timing(translateX, {
//       toValue: width,
//       duration: 5000, // Adjust the duration as needed
//       useNativeDriver: true,
//     }).start(() => {
//       // Optionally reset animation after it finishes
//       translateX.setValue(-200);
//       startAnimation();
//     });
//   };

//   useEffect(() => {
//     startAnimation();
//   }, []);

//   return (
//     <View style={styles.animationContainer}>
//       <Animated.View style={{ transform: [{ translateX }] }}>
//         <LottieView
//           autoPlay
//           ref={animation}
//           style={styles.lottieView}
//           source={require('../../Truck1.json')}
//         />
//       </Animated.View>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Restart Animation"
//           onPress={() => {
//             translateX.setValue(-200);
//             startAnimation();
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   animationContainer: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   lottieView: {
//     width: 200,
//     height: 200,
//   },
//   buttonContainer: {
//     paddingTop: 20,
//   },
// });






































// import React, { useRef, useEffect } from 'react';
// import { Button, StyleSheet, View } from 'react-native';
// import LottieView from 'lottie-react-native';

// export default function App() {
//   const animation = useRef(null);
//   useEffect(() => {
//     // You can control the ref programmatically, rather than using autoPlay
//     // animation.current?.play();
//   }, []);

//   return (
//     <View style={styles.animationContainer}>
//       <LottieView className="h-[500px] w-[100%]"
//         autoPlay
//         ref={animation}
//         // style={{
//         //   width: 200,
//         //   height: 200,
//         //   backgroundColor: '#eee',
//         // }}
//         // Find more Lottie files at https://lottiefiles.com/featured
//         source={require('../../Truck1.json')}
//       />
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Restart Animation"
//           onPress={() => {
//             animation.current?.reset();
//             animation.current?.play();
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   animationContainer: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   buttonContainer: {
//     paddingTop: 20,
//   },
// });
