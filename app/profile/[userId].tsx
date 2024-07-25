import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default ()=> {

    const {userId} = useLocalSearchParams();

    return (
        <View>
            <Text>User Id: {userId}</Text>
        </View>
    )
}