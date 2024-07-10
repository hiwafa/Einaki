import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";
const { height } = Dimensions.get('window');
import { circleWidth, buttonWidth } from "./utils/Constants";

export const lightPrimaryBackColor = "#F6F5F2";
const lightPrimaryColor = "#191919";
const lightPrimarySpecificColor = "orange"
const headerHeight = Platform.OS === 'ios' ? 120 : 70;

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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: lightPrimarySpecificColor
    },
    overflowContainer: {
        height: height - headerHeight,
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 20
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
    }
    // swipe styles
});

export const darkStyles = StyleSheet.create({
    
});