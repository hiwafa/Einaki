import React, { createContext, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";


import HomePage from "./home";
import { GlobalData } from "./data";
export const GlobalContext = createContext(null);

export default function RootApp() {

    return (
        <GlobalContext.Provider value={{
            ...GlobalData
        }}>
            <HomePage />
        </GlobalContext.Provider>
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