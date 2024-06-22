
import React from "react";
import { StyleSheet, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';

import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';


export default function SettingsButton() {

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });

    const gesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            // offset.value = {
            //   x: e.translationX + start.value.x,
            //   y: e.translationY + start.value.y,
            // };
            offset.value.x = e.translationX + start.value.x;
        })
        .onEnd(() => {
            // start.value = {
            //   x: offset.value.x,
            //   y: offset.value.y,
            // };
            start.value.x = offset.value.x;
        })
        .onFinalize(() => {
            isPressed.value = false;
        });

    // const rotateAnim = useSharedValue(0);
    // const rotatin = useDerivedValue(()=>{
    //     return interpolate(rotateAnim.value, [0, 360], [0, 360])
    // });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                //   { translateY: offset.value.y },
                //   { scale: withSpring(isPressed.value ? 2 : 1) },
                { rotate: isPressed.value ? '90deg' : '0deg' }
            ],
            // backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
    });

    return (
        <GestureHandlerRootView style={{}}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[animatedStyles]} >
                    <AntDesign name="home" size={24} color="black" />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
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