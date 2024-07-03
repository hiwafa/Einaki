import React from "react";
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get('window');
import { circleWidth, buttonWidth } from "../components/SwipeButton";

export const lightStyles = StyleSheet.create({

    // main index style
    mainContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        color: '#191919',
        backgroundColor: '#F6F5F2',
    },
    mainHeader: {
        height: 70,
        width: '100%',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 3.5 },
        // shadowOpacity: 0.1,
        // shadowRadius: 1.1,
        // elevation: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        color: '#191919'
    },
    // main index style


    // swipe styles
    swipeContainer: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#55AD9B',
        alignItems: 'center',
        fontSize: 20
    },
    swipeBall: {
        width: circleWidth,
        height: circleWidth,
        borderRadius: circleWidth/2,
        backgroundColor: '#F6F5F2',
        cursor: 'pointer'
    },
    swipeBallContainer: {
        width: buttonWidth,
        height: circleWidth + 5,
        backgroundColor: '#55AD9B',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: (circleWidth + 5)/2
    }
    // swipe styles
});

export const darkStyles = StyleSheet.create({
    
});