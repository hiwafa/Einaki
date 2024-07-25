
import { Stack } from "expo-router";
import { createContext } from "react";

import { GlobalData } from "../data";

interface ContextType {
    lang: {
        farsi: any, english: any, german: any, arabic: any, turkish: any
    };
    theme: {
        dark: {[key: string]: (string | number)},
        light: {[key: string]: (string | number)}
    }
}

export const GlobalContext = createContext<ContextType>(null);

export default function StackLayout() {

    return (
        <GlobalContext.Provider value={{
            ...GlobalData
        }}>

            <Stack>
                <Stack.Screen name="index" options={{ headerTitle: "Home", headerShown: false }} />
                <Stack.Screen name="[missing]" options={{ headerTitle: "Page Not Found" }} />
            </Stack>

        </GlobalContext.Provider>

    )
}