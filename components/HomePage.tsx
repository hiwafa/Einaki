
import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native"

import { GlobalContext } from "../app/_layout";
import { Link } from "expo-router";

export default function HomePage() {

    const homeData = useContext(GlobalContext);

    return (
        <View>
            <Text>Home Page: {homeData.lang.farsi.currentLang} mmm</Text>
            <Link href='settings'>Go To Settings</Link>
        </View>
    )
}