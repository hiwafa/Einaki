
import React, { useContext } from "react";
import { View, Text } from "react-native"

import { GlobalContext } from "../index";

export default function HomePage(){
    
    const homeData = useContext(GlobalContext);

    return (
        <View>
            <Text>Home Page {homeData.lang.farsi.currentLangText}</Text>
        </View>
    )
}