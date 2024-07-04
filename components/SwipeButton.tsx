import { View, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { FontAwesome6 } from '@expo/vector-icons';

import { lightStyles, darkStyles, lightPrimaryBackColor } from "../app/styles";
import { useState } from "react";


export default function SwipeButton() {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    return (
        <GestureHandlerRootView style={styles.swipeContainer}>
            <Swiping />
        </GestureHandlerRootView>
    )
}


export const buttonWidth = 150;
export const circleWidth = 30;
const defaultXTranslation = 5;
const calculatedValue = buttonWidth - circleWidth - defaultXTranslation;

const Swiping = () => {

    console.log("Swipe button is rendering")

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    const offset = useSharedValue(defaultXTranslation);
    const checker = useSharedValue(false);
    const onSwipe = useSharedValue(false);
    const [toSetting, setToSetting] = useState(false);

    const gesture = Gesture.Pan().onBegin(() => {
        onSwipe.value = true;
    }).onUpdate(e => {

        if (
            checker.value === false
            && e.translationX < calculatedValue
            && e.translationX > 0
        ) {

            offset.value = e.translationX;

        } else {
            if (
                checker.value === true
                && e.translationX < 1
                && e.translationX > -calculatedValue
            ) {

                offset.value = calculatedValue + e.translationX;

            }
        }

    }).onEnd(e => {

        if (offset.value > (calculatedValue / 2)) {
            offset.value = withSpring(calculatedValue);
            checker.value = true;
            setToSetting(true)
        } else {
            offset.value = withSpring(defaultXTranslation);
            checker.value = false;
            setToSetting(false)
        }

    }).onFinalize(() => {
        onSwipe.value = false;
    });

    const animatedStyless = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value },
            {rotate: withSpring(checker.value === false ? "0deg" : "-180deg") }
        ]
    }));

    const animatedTextStyle = useAnimatedStyle(()=> ({
        opacity: withSpring(onSwipe.value === true ? 0 : 1),
        marginLeft: withSpring(checker.value === false ? 15 : -15)
    }))

   

    return (
        <View style={styles.swipeBallContainer}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.swipeBall, animatedStyless]}>
                    <FontAwesome6 name="arrows-turn-right" size={15} color={theme === 'light' ? lightPrimaryBackColor : 'black'} />
                </Animated.View>
            </GestureDetector>
            <Animated.Text style={[styles.animatedSwipeText, animatedTextStyle]}>
                {toSetting === false ? "Go to Settings" : "Go to Home"}
            </Animated.Text>
        </View>
    )
}