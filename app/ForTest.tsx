import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const Example = () => {
    
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 300],  // محدوده ورودی (اسکرول از 0 تا 300)
      [1, 2],     // محدوده خروجی (اندازه از 1 تا 2 برابر)
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
      <View style={styles.container}>
      <View style={{ height: 300 }} />
        <Animated.Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={[styles.image, animatedStyle]}
        />
        {/* محتوای اضافی برای اسکرول */}
        <View style={{ height: 1000 }} />
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Example;
