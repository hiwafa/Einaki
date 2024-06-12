import { Link } from "expo-router";
import { View, Text  } from "react-native";


export default function HomeScreen(){
    return (
        <View>
            <Text>Home Page</Text>
            <Link href='about'>Go To About Page</Link>
        </View>
    )
}