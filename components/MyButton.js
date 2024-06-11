import { StyleSheet, Text, Pressable } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyButton({ label }) {
    return (
        <view style={styles.container}>
            <Pressable style={styles.buttonStyle} onPress={() => { alert('Hi dear') }}>
                <FontAwesome
                    name="picture-o"
                    size={18}
                    color="#fff"
                    style={styles.buttonIcon}
                />
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </view>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },
    buttonStyle: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'orange'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    buttonIcon: {
        paddingRight: 8,
    }
});
