
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";


export default function StackLayout() {

    const router = useRouter();
    const goToHme = "< Home";

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Page is not available</Text>
            <Link href="/" asChild>
                <Pressable>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10, color: 'blue'}}>
                        {goToHme}
                    </Text>
                </Pressable>
            </Link>
        </View>
    )
}