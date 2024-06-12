import { useRouter } from "expo-router";
import { View, Text, Pressable  } from "react-native";


export default function AboutScreen(){
    const router = useRouter();
    return (
        <View>
            <Text>About Page</Text>
            <Pressable onPress={()=> router.back()}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
    )
}