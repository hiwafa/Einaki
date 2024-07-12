import React from "react";
import { View, SafeAreaView, Text, ScrollView, Dimensions, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

import { lightStyles, darkStyles } from "./styles";
import SwipeButton from "../components/SwipeButton";
import AudioPlayer from "../components/AudioPlayer";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export interface EmptyProps { }

export default function RootApp({ }: EmptyProps) {

    const theme = "light";
    const styles = theme === "light" ? lightStyles : darkStyles;

    return (
        <View style={styles.mainContainer}>
            <View style={{
                position: 'absolute',
                top: 0, height: Constants.statusBarHeight,
                width: '100%',
                backgroundColor: 'orange'
            }} />
            <View style={[styles.mainHeader, {marginTop: Constants.statusBarHeight}]}>
                <View style={{ marginHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 40 : 0 }}>
                    <SwipeButton />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10, paddingTop: 10, gap: Platform.OS === 'ios' ? 0 : 5 }}>
                    <AudioPlayer />
                </View>
            </View>
            <View style={styles.overflowContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cupiditate esse est eaque saepe, itaque accusamus ab sed maxime perspiciatis et vel ad reiciendis. Fugiat temporibus dignissimos asperiores quos cumque.</Text>
                </ScrollView>
            </View>
            <StatusBar style="light" backgroundColor="orange" />
        </View>
    )
}