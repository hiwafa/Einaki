import React, { useReducer } from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";


import HomePage from "../components/HomePage";


export interface EmptyProps {}

export default function RootApp({}: EmptyProps) {

    return (
        <HomePage />
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        
        gap: 5,

        backgroundColor: 'orange',
    },
    boxContainer: {
        width: 100,
        height: 120,
        backgroundColor: 'tomato',
        flexGrow: 1,
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});