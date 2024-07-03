import React from "react";
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get('window');
import { circleWidth } from "../components/SwipeButton";

export const lightStyles = StyleSheet.create({
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3.5 },
        shadowOpacity: 0.1,
        shadowRadius: 1.1,
        elevation: 1,
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

    // swipe styles
    swipeContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        fontSize: 20
    },
    swipeBall: {
        width: circleWidth,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'green',
        cursor: 'pointer'
    },
    // swipe styles
});

export const darkStyles = StyleSheet.create({
    
});