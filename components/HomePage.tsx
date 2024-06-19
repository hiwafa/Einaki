
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native"

import { GlobalContext } from "../app/_layout";
import { Link } from "expo-router";
import { Image } from 'expo-image';

import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const emoji = require('../assets/images/emoji1.png');

export default function HomePage() {

    const homeData = useContext(GlobalContext);

    const gesture = Gesture.Tap();


    useEffect(()=> {

      gesture.onBegin(() => {
        console.log(_WORKLET);
      });

    }, [])

    return (
        <GestureHandlerRootView style={{flex: 1, paddingTop: 100, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home Page: {homeData.lang.farsi.currentLang} mmm</Text>
            <Link href='settings'>Go To Settings</Link>
            <Ball />
        </GestureHandlerRootView>
    )
}


function Ball() {

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const start = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, animatedStyles]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});