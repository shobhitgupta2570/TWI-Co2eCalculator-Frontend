import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const App = () => {
  const translation = useRef(new Animated.Value(-200)).current; // Initial position off-screen to the left

  useEffect(() => {
    Animated.timing(translation, {
      toValue: width, // Move to the right of the screen
      duration: 5000, // Duration of the animation in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [translation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.videoContainer, { transform: [{ translateX: translation }] }]}>
        <Video
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} // Sample video URL
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default App;
