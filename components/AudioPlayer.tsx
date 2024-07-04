// components/AudioPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const AudioPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(1.0);

  const soundRef = useRef(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audios/sample.mp3'),
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(sound);
    soundRef.current = sound;
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } else {
      loadSound();
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={handleSliderChange}
      />
      <Text>
        {new Date(position).toISOString().substr(14, 5)} / {new Date(duration).toISOString().substr(14, 5)}
      </Text>
      <Text>Volume</Text>
      <Slider
        style={styles.slider}
        value={volume}
        minimumValue={0}
        maximumValue={1}
        onValueChange={handleVolumeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 300,
    height: 40,
  },
});

export default AudioPlayer;
