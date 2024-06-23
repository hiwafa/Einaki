import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';


export default function AnimationTest() {

    const animatedValue = useSharedValue(100);
    const animW = useSharedValue(100)
    const translateX = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value * 2) }
        ]
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
                        duration: 800,
                        easing: Easing.inOut(Easing.quad)
                    }
                )
            }} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    },
})