import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export default function SwitchButton() {

    const translateX = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);

    const [boxDimensions, setBoxDimensions] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const [circleDimensions, setCircleDimensions] = useState({ x: 0, y: 0, width: 0, height: 0 })

    const onSwipe = (value: number) => {
        console.log("Swipe Completed ", value)
        // alert("value: "+value)
    }

    const pan = Gesture.Pan()
        .onStart(() => {
            prevTranslationX.value = translateX.value;
        })
        .onUpdate(e => {
            const maxOffset = boxDimensions.width - circleDimensions.width - 20;
            if (e.translationX >= 0 && e.translationX <= maxOffset) {
                translateX.value = withSpring(e.translationX)
            }
        })
        .onEnd(e => {
            const middleOffset = boxDimensions.width / 2 - circleDimensions.width / 2;
            const end = boxDimensions.width - circleDimensions.width - 20;

            if (e.translationX < middleOffset) {

                translateX.value = withSpring(0)

            } else {

                translateX.value = withSpring(end, {}, () => {
                    // runOnJS(onSwipe)(end)
                })

            }
        })

    // const pan = Gesture.Pan().onChange((event) => {

    //     const maxOffset = boxDimensions.width - circleDimensions.width - 20;

    //     if (event.translationX >= 0 && event.translationX <= maxOffset) {
    //         translateX.value = event.translationX
    //     }

    // }).onFinalize((event) => {

    //     const middleOffset = boxDimensions.width / 2 - circleDimensions.width / 2;
    //     const end = boxDimensions.width - circleDimensions.width - 20;

    //     if (event.translationX < middleOffset) {

    //         translateX.value = withSpring(0)

    //     } else {

    //         translateX.value = withSpring(end, {}, () => {
    //             runOnJS(onSwipe)(end)
    //         })

    //     }
    // })


    const swipeAnimatedStyle = useAnimatedStyle(() => ({

        transform: [{ translateX: translateX.value }]

    }))

    const textAnimatedStyle = useAnimatedStyle(() => {

        const end = boxDimensions.width - circleDimensions.width - 20
        const opacity = interpolate(translateX.value, [0, end], [1, 0])

        return {
            opacity
        }

    })

    const getBoxLayout = (event: any) => {

        const { x, y, width, height } = event.nativeEvent.layout
        setBoxDimensions({ x, y, width, height })
    }

    const getCircleLayout = (event: any) => {
        const { x, y, width, height } = event.nativeEvent.layout
        setCircleDimensions({ x, y, width, height })
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View onLayout={getBoxLayout} style={styles.box}>
                <GestureDetector gesture={pan}>
                    <Animated.View onLayout={getCircleLayout} style={[styles.circle, swipeAnimatedStyle]}>
                        <Image style={styles.swipeArrowIcon} source={require('../assets/images/swipe_arrow.png')} />
                    </Animated.View>
                </GestureDetector>
                <Animated.Text style={[styles.swipeTxt, textAnimatedStyle]}>swipe to start</Animated.Text>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer',
        // backgroundColor: "#F0A210"
    },
    box: {
        width: 200,
        height: 60,
        borderRadius: 60,
        flexDirection: "row",
        backgroundColor: "#ffffff",
        alignItems: "center",
        elevation: 10,
        shadowOffset: {
            height: 10,
            width: 2
        },
        shadowColor: "#000000",
        shadowOpacity: 0.1
    },
    circle: {
        width: "25%",
        height: "80%",
        borderRadius: 50,
        backgroundColor: "#F0A210",
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center"
    }
    ,
    swipeArrowIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    swipeTxt: {
        fontSize: 12,
        color: "#000000",
        textAlign: "center",
        marginLeft: 10
    }



});