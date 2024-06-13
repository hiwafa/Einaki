import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export default function HomeScreen() {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.boxContainer}>
                <Link href='about'>Go To About Page</Link>
            </View>

            <View style={styles.boxContainer}>
                <Link href='about'>Go To About Page</Link>
            </View>

            <View style={styles.boxContainer}>
                <Link href='about'>Go To About Page</Link>
            </View>

            <View style={styles.boxContainer}>
                <Link href='about'>One</Link>
                <Link href='about'>Two</Link>
                <Link href='about'>Three</Link>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        

        gap: 5,

        backgroundColor: 'orange',
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
    }
});