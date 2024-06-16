import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable  } from "react-native";


export default function UserScreen(){
    const router = useRouter();
    const {id} = useLocalSearchParams(); 
    return (
        <View>
            <Text>User Page: {id}</Text>
            <Pressable onPress={()=> router.replace('/')}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
    )
}