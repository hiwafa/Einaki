import { useState } from "react";
import { View, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { FontAwesome6 } from '@expo/vector-icons';

import { lightStyles, darkStyles, lightPrimaryBackColor } from "../app/styles";

import { buttonWidth, circleWidth } from "../app/utils/Constants";
import { useRouter } from "expo-router";

export default function SwipeButton() {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    return (
        <GestureHandlerRootView style={styles.swipeContainer}>
            <Swiping />
        </GestureHandlerRootView>
    )
}

const defaultXTranslation = 5;
const calculatedValue = buttonWidth - circleWidth - defaultXTranslation;

const Swiping = () => {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    const route = useRouter();

    const offset = useSharedValue(defaultXTranslation);
    const checker = useSharedValue(false);
    const onSwipe = useSharedValue(false);

    const [txt, setTxt] = useState("Go to Settings");

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

    }).runOnJS(true).onEnd(e => {

        if (offset.value > (calculatedValue / 2)) {
            offset.value = withSpring(calculatedValue);
            checker.value = true;
            setTxt("Go to Home");
            setTimeout(() => { 
                route.push('/profile')
            }, 500);
        } else {
            offset.value = withSpring(defaultXTranslation);
            checker.value = false;
            setTxt("Go to Settings");
        }
 
    }).onFinalize(() => {
        onSwipe.value = false;
    });

    const animatedStyless = useAnimatedStyle(() => ({
        transform: [
            {translateX: offset.value},
            {rotate: withSpring(checker.value === false ? '0deg' : '-180deg')}
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
                {txt}
            </Animated.Text>
        </View>
    )
}