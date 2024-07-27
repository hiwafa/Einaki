
import { Stack } from "expo-router";
import { createContext } from "react";
import { View, Platform } from "react-native";
import { GlobalData } from "../data";
import SwipeButton from "../components/SwipeButton";
import AudioPlayer from "../components/AudioPlayer";
import Constants from 'expo-constants';

import { lightStyles, darkStyles } from "./styles";
import { StatusBar } from "expo-status-bar";

interface ContextType {
    lang: {
        farsi: any, english: any, german: any, arabic: any, turkish: any
    };
    theme: {
        dark: { [key: string]: (string | number) },
        light: { [key: string]: (string | number) }
    }
}

export const GlobalContext = createContext<ContextType>(null);

export default function StackLayout() {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    return (
        <GlobalContext.Provider value={{
            ...GlobalData
        }}>

            {/* <View style={{
                position: 'absolute',
                top: 0, height: Constants.statusBarHeight,
                width: '100%',
                backgroundColor: 'orange'
            }} />
            
            <View style={[styles.mainHeader, { marginTop: Constants.statusBarHeight }]}>
                <View style={{ marginHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 40 : 0 }}>
                    <SwipeButton />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10, paddingTop: 10, gap: Platform.OS === 'ios' ? 0 : 5 }}>
                    <AudioPlayer />
                </View>
            </View> */}


            <Stack>
                <Stack.Screen name="index" options={{ headerTitle: "Home", headerShown: false }} />
                <Stack.Screen name="[missing]" options={{ headerTitle: "Page Not Found" }} />
            </Stack>

        </GlobalContext.Provider>

    )
}