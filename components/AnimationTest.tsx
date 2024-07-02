import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

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
        <GestureHandlerRootView style={styles.container}>
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
        </GestureHandlerRootView>
    )
}


const buttonWidth = 250;
const circleWidth = 50;
const defaultXTranslation = 5;
const calculatedValue = buttonWidth - circleWidth - defaultXTranslation;

const Ball = () => {

    const offset = useSharedValue(defaultXTranslation);
    const checker = useSharedValue(false);

    const gesture = Gesture.Pan().onBegin(() => {

    }).onUpdate(e => {

        // this "if" check to move circle only within the button area

        if (
            checker.value === false &&
            offset.value < calculatedValue
            && e.translationX < calculatedValue
            && e.translationX > -1
        ) {

            offset.value = e.translationX;

        } else {
            // offset.value = calculatedValue + e.translationX;
        }

    }).onEnd(e => {

        if (offset.value > (calculatedValue / 2)) {
            offset.value = withSpring(calculatedValue);
            checker.value = true;
        } else {
            offset.value = withSpring(defaultXTranslation);
            checker.value = false;
        }

    }).onFinalize(() => {

    });

    const animatedStyless = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value }
        ]
    }));

    return (
        <View style={{
            width: buttonWidth,
            height: 55,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 27.5
        }}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.ball, animatedStyless]} />
            </GestureDetector>
        </View>
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
        width: circleWidth,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'green',
        cursor: 'pointer'
    },
})