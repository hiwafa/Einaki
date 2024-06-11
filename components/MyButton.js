import { StyleSheet, Text, Pressable } from 'react-native';

export default function MyButton({ label }) {
    return (
        <view style={styles.container}>

            <Pressable style={styles.buttonStyle} onPress={() => { alert('Hi dear') }}>
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
        flexDirection: 'row'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    }
});
