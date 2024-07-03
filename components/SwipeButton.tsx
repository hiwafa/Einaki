import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";

import {lightStyles, darkStyles} from "../app/styles";

export default function SwipeButton() {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    return (
        <GestureHandlerRootView style={styles.swipeContainer}>
            <Swiping />
        </GestureHandlerRootView>
    )
}


const buttonWidth = 250;
export const circleWidth = 50;
const defaultXTranslation = 5;
const calculatedValue = buttonWidth - circleWidth - defaultXTranslation;

const Swiping = () => {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    const offset = useSharedValue(defaultXTranslation);
    const checker = useSharedValue(false);

    const gesture = Gesture.Pan().onBegin(() => {

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
                <Animated.View style={[styles.swipeBall, animatedStyless]} />
            </GestureDetector>
        </View>
    )
}