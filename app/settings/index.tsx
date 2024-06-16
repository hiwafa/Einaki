
import React, { useContext } from "react";
import { View, Text } from "react-native"

import { GlobalContext } from "../_layout";

export default function SettingsPage(){
    
    const homeData = useContext(GlobalContext);

    return (
        <View>
            <Text>Settings Page: {homeData.lang.farsi.currentLangText}</Text>
            <Text>
                Hi dear welcome to settings
            </Text>
        </View>
    )
}