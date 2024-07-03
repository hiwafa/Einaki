import React from "react";
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get('window');
import { circleWidth, buttonWidth } from "../components/SwipeButton";

const lightPrimaryBackColor = "#F6F5F2";
const lightPrimaryColor = "#191919";
const lightPrimarySpecificColor = "orange"

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
        height: 70,
        width: '100%',
        shadowColor: 'orange',
        shadowOffset: { width: 0, height: 3.5 },
        shadowOpacity: 2.1,
        shadowRadius: 1.75,
        elevation: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: lightPrimarySpecificColor
    },
    overflowContainer: {
        height: height - 70,
        width: '100%',
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
        cursor: 'pointer'
    },
    swipeBallContainer: {
        width: buttonWidth,
        height: circleWidth + 5,
        backgroundColor: lightPrimaryBackColor,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: (circleWidth + 5)/2
    }
    // swipe styles
});

export const darkStyles = StyleSheet.create({
    
});