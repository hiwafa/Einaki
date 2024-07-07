// components/AudioPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';

let pointer = -1;
const AudioPlayer = () => {

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };

  }, [sound]);

  const loadSound = async () => {

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/sample.mp3'),
        {
          shouldPlay: true, // Automatically start playing the sound
          // volume: 0.5,      // Set initial volume to 50%
          // isLooping: false, // Do not loop the sound
          // rate: 1.0,        // Play at normal speed
          // positionMillis: 0 // Start from the beginning
        },
        (status) => {
          if (status.isLoaded) {

            if (pointer < 0) {
              setDuration(status.durationMillis);
              // setIsPlaying(status.isPlaying);
              setVolume(status.volume);
              pointer++;
            }

            setPosition(status.positionMillis);

          }
        }
      );

      setSound(sound);
      setIsPlaying(true);
    } catch (err) {

    }

  }


  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      loadSound();
    }
  }

  const handleSliderChange = async (value) => {
    if (sound && value) {
      await sound.setPositionAsync(value);
    }
  }

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onValueChange={handleSliderChange}
        />
        <FontAwesome5 style={styles.playIcon} name={isPlaying ? 'pause' : 'play'} size={18} onPress={handlePlayPause} />
      </View>

      <View style={styles.durationConainer}>
        <Text style={styles.duration}>{new Date(position).toISOString().substring(14, 19)}</Text>
        <Text style={styles.duration}>{new Date(duration).toISOString().substring(14, 19)}</Text>
      </View>

      {/* <Slider
        style={styles.slider}
        value={volume}
        minimumValue={0}
        maximumValue={1}
        onValueChange={handleVolumeChange}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'green'

  },
  sliderContainer: {
    flexDirection: 'row'
  },
  slider: {
    flex: 1,
    minWidth: 200,
    alignSelf: 'center'
  },
  duration: {
    fontSize: 13,
    marginHorizontal: 30
  },
  playIcon: {
    alignSelf: 'center',
    marginHorizontal: 5,
    cursor: 'pointer'
  },
  durationConainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default AudioPlayer;
