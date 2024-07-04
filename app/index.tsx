import React from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

import { lightStyles, darkStyles } from "./styles";
import SwipeButton from "../components/SwipeButton";
import AudioSlider from "../components/AudioSlider";

export interface EmptyProps { }

export default function RootApp({ }: EmptyProps) {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainHeader}>
                <View style={{ marginHorizontal: 20}}>
                    <SwipeButton />
                </View>
                <View style={{flex: 1, marginHorizontal: 20}}>
                    <AudioSlider />
                </View>
            </View>
            <View style={styles.overflowContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {Array.from({ length: 50 }, (_, index) => (
                        <Text key={index} style={styles.text}>
                            {index + 1} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos eum laboriosam delectus aut officia omnis, vitae alias eligendi unde quia esse vel beatae atque eveniet! Fuga officia fugit quaerat veritatis.
                        </Text>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}