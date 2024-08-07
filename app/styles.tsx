import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";
const { height } = Dimensions.get('window');
import { circleWidth, buttonWidth } from "./utils/Constants";

export const lightPrimaryBackColor = "#F6F5F2";
const lightPrimaryColor = "#191919";
const lightPrimarySpecificColor = "orange"
const headerHeight = 80;

export const lightStyles = StyleSheet.create({

    // main index style
    mainContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        color: lightPrimaryColor,
        backgroundColor: lightPrimaryBackColor,
    },
    mainHeader: {
        height: headerHeight,
        width: '100%',
        shadowColor: lightPrimarySpecificColor,
        shadowOffset: { width: 0, height: 3.5 },
        shadowOpacity: 0.9,
        shadowRadius: 1.75,
        elevation: 1,
        zIndex: 10,
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: lightPrimarySpecificColor
    },
    overflowContainer: {
        height: height - headerHeight,
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 20,
        // backgroundColor: 'lightblue'
    },
    scrollView: {
        // padding: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: lightPrimaryColor
    },
    // main index style


    // swipe styles
    swipeContainer: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'orange',
        alignItems: 'center',
        fontSize: 20
    },
    swipeBall: {
        width: circleWidth,
        height: circleWidth,
        borderRadius: circleWidth/2,
        backgroundColor: lightPrimarySpecificColor,
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center'
    },
    swipeBallContainer: {
        width: buttonWidth,
        height: circleWidth + 5,
        backgroundColor: lightPrimaryBackColor,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: (circleWidth + 5)/2
    },
    animatedSwipeText: {
        // paddingLeft: 10
    },
    // swipe styles


    // Slider Styles
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
      },
      slider: {
        flex: 1,
        minWidth: 200,
        alignSelf: 'center'
      },
      timerStyle: {
        fontSize: 13
      },
      playIcon: {
        alignSelf: 'center',
        marginHorizontal: 5,
      },
      timerConainer: {
        flexDirection: 'row',
      },
      touchableOpacity: {
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowColor: '#ffffff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.99,
        shadowRadius: 1.75,
        width: 28,
        height: 24,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      nextPrevLesson: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
      },
      timerLessonContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }
    // Slider Styles
});

export const darkStyles = StyleSheet.create({
    
});