import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const SplashScreen = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) });
    translateY.value = withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const image = require('../assets/images/icon-transparent.png');

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
     
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>Data Compras</Text>
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
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#407aff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
