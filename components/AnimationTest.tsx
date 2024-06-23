import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Animated, {useSharedValue} from 'react-native-reanimated';


export default function AnimationTest() {

    const animatedValue = useSharedValue(100);
    const [w, setW] = useState(100)

    return (
        <View style={styles.container}>
            <Animated.View style={{
                width: w,
                height: animatedValue,
                backgroundColor: 'violet'
            }} />
            <Button title="Increase Height" onPress={()=> { 
                animatedValue.value +=5
             }} />
            <Button title="Increase Width" onPress={()=> { 
                setW(w+5)
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