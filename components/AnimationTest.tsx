import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Animated, { useSharedValue , withSpring} from 'react-native-reanimated';


export default function AnimationTest() {

    const animatedValue = useSharedValue(100);
    const animW = useSharedValue(100)

    return (
        <View style={styles.container}>
            <Animated.View style={{
                width: animW,
                height: animatedValue,
                backgroundColor: 'violet',
                marginBottom: 10
            }} />
            <Button title="Increase Height" onPress={()=> { 
                animatedValue.value = withSpring(animatedValue.value+50)
             }} />
            <Button title="Increase Width" onPress={()=> { 
                animW.value = withSpring(animW.value+50)
             }} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    }
})