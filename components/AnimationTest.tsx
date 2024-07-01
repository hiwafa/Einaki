import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, Easing, useAnimatedProps } from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function AnimationTest() {

    const animatedValue = useSharedValue(100);
    const animW = useSharedValue(100);
    const translateX = useSharedValue(0);
    const radius = useSharedValue(10);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value * 2) }
        ]
    }));

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(radius.value),
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[
                {
                    width: animW,
                    height: animatedValue,
                    backgroundColor: 'violet',
                    marginBottom: 10
                },
                animatedStyles
            ]} />
            <Button title="Increase Height" onPress={() => {
                animatedValue.value = withSpring(animatedValue.value + 50)
            }} />
            <Button title="Increase Width" onPress={() => {
                animW.value = withSpring(animW.value + 50)
            }} />
            <Button title="Translate X" onPress={() => {
                translateX.value = withSpring(translateX.value + 50)
            }} />
            <Button title="Translate -X" onPress={() => {
                translateX.value = withTiming(
                    translateX.value - 50,
                    {
                        duration: 3800,
                        easing: Easing.inOut(Easing.quad)
                    }
                )
            }} />

            <Button title="Change Circle" onPress={() => {
                radius.value += 10
            }} />

            <Ball />

            <Svg>
                <AnimatedCircle cx="50" cy="50" r={radius} fill="blue" animatedProps={animatedProps} />
            </Svg>
        </View>
    )
}


const Ball = () => {

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });

    const animatedStyless = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value.x },
            { translateY: offset.value.y },
            { scale: withSpring(isPressed.value ? 1.2 : 1) }
        ],
        backgroundColor: isPressed.value ? 'yellow' : 'green'
    }));

    const gesture = Gesture.Pan().onBegin(() => {
        isPressed.value = true;
    }).onUpdate(e => {
        offset.value = {
            x: e.translationX + start.value.x,
            y: e.translationY + start.value.y
        }
    }).onEnd(() => {
        // start.value = {
        //     x: offset.value.x,
        //     y: offset.value.y
        // }
        offset.value = withSpring({
            x: 0,
            y: 0
        })
    }).onFinalize(() => {
        isPressed.value = false;
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.ball, animatedStyless]} />
        </GestureDetector>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'orange',
        alignItems: 'center',
        fontSize: 20
    },

    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
})