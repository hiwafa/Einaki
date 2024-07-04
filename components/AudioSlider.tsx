import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { Button, View } from 'react-native';
import { Audio } from 'expo-av';


export default () => {

    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        const mainSound = await Audio.Sound.createAsync(require('../assets/audios/sample.mp3'));
        const { sound } = mainSound;
        setSound(sound);

        
        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View>
            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={100}
                value={50}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <Button title="Play Sound" onPress={playSound} />
        </View>
    )
}