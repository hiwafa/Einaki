import React, { useReducer } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { Link } from "expo-router";


import HomePage from "../components/HomePage";

const { height } = Dimensions.get('window');
export interface EmptyProps { }

export default function RootApp({ }: EmptyProps) {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainHeader}>

            </View>

            <View style={styles.container}>
                <View style={styles.overflowContainer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {Array.from({ length: 50 }, (_, index) => (
                            <Text key={index} style={styles.text}>
                                Item {index + 1}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis similique, molestias possimus aliquam ullam alias quas reprehenderit ad neque architecto voluptates molestiae ratione laborum soluta velit, porro corporis ipsam ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis similique, molestias possimus aliquam ullam alias quas reprehenderit ad neque architecto voluptates molestiae ratione laborum soluta velit, porro corporis ipsam ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis similique, molestias possimus aliquam ullam alias quas reprehenderit ad neque architecto voluptates molestiae ratione laborum soluta velit, porro corporis ipsam ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis similique, molestias possimus aliquam ullam alias quas reprehenderit ad neque architecto voluptates molestiae ratione laborum soluta velit, porro corporis ipsam ipsa.
                            </Text>
                        ))}
                    </ScrollView>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        margin: 0,
        padding: 0,
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignContent: 'flex-start',
        // gap: 5,
        // backgroundColor: 'orange',
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
    },

    mainHeader: {
        height: 70,
        width: '100%',
        backgroundColor: 'green'
    },

    mainBody: {
        overflow: 'scroll'
    },


    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    overflowContainer: {
        height: height-70,
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
    },
    scrollView: {
        padding: 10,
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
    },
});