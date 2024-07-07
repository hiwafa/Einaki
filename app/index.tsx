import React from "react";
import { View, SafeAreaView, Text, ScrollView, Dimensions, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

import { lightStyles, darkStyles } from "./styles";
import SwipeButton from "../components/SwipeButton";
import AudioSlider from "../components/AudioSlider";
import AudioPlayer from "../components/AudioPlayer";

import Slider from '@react-native-community/slider';

export interface EmptyProps { }

export default function RootApp({ }: EmptyProps) {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainHeader}>
                <View style={{ marginHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 40 : 0 }}>
                    <SwipeButton />
                </View>
                <View style={{ flex: 1, marginHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 0 }}>
                    
                </View>
            </View>
            <View style={styles.overflowContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate esse est eaque saepe, itaque accusamus ab sed maxime perspiciatis et vel ad reiciendis. Fugiat temporibus dignissimos asperiores quos cumque.</Text>
                    <AudioPlayer />
                </ScrollView>
            </View>
        </View>
    )
}