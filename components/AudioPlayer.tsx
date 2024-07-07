// components/AudioPlayer.js
import React, { useState, useEffect, useRef, useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';

let pointer = -1;
const initialAudio = {
  audioFile: null,
  location: 0,
  length: 0,
  played: false,
  loudness: 0.7
}
const audioReducer = (state, { type, value }) => {
  switch (type) {
    case "replace":
      return value;
    case "allExceptAudio":
      return {audioFile: state.audioFile, ...value};
    case "audioFile":
      return { ...state, [type]: value }
    default: return state;
  }
}

const AudioPlayer = () => {

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const [audio, setAudio] = useReducer(audioReducer, initialAudio);

  // useEffect(() => {
  //   return () => {
  //     if (sound) sound.unloadAsync();
  //   };

  // }, [sound]);

  useEffect(() => {
    return () => {
      if (audio.audioFile) audio.audioFile.unloadAsync();
    };

  }, [audio.audioFile]);

  // if (position > 0 && position === duration) {
  //   pointer = -1;
  //   setIsPlaying(false);
  //   setPosition(0);
  // }

  const loadSound = async () => {

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audios/sample.mp3'),
        {
          shouldPlay: true, // Automatically start playing the sound
          // volume: 0.5,      // Set initial volume to 50%
          // isLooping: false, // Do not loop the sound
          // rate: 1.0,        // Play at normal speed
          positionMillis: 0 // Start from the beginning
        },
        (status) => {
          if (status.isLoaded) {

            // if (pointer < 0) {
            //   setDuration(status.durationMillis);
            //   // setIsPlaying(status.isPlaying);
            //   setVolume(status.volume);
            //   pointer++;
            // }

            // setPosition(status.positionMillis);

            setAudio({
              type: 'allExceptAudio', value: {
                location: status.positionMillis,
                length: status.durationMillis,
                played: status.isPlaying,
                loudness: status.volume
              }
            });

          }
        }
      );

      // setSound(sound);
      // setIsPlaying(true);

      setAudio({
        type: "audioFile",
        value: sound
      });

    } catch (err) {
      console.log("loadSound: ", err)
    }

  }

  const handlePlayPause = async () => {
    // if (sound && position > 0) {
    //   try {
    //     if (isPlaying) {
    //       await sound.pauseAsync();
    //       setIsPlaying(false);
    //     } else {
    //       await sound.playAsync();
    //       setIsPlaying(true);
    //     }
    //   } catch (err) {
    //     console.log("handlePlayPause: ", err)
    //   }
    // } else {
    //   loadSound();
    // }
    if (audio.audioFile) {
      try {
        if (audio.played) {
          await audio.audioFile.pauseAsync();
        } else {
          await audio.audioFile.playAsync();
        }
      } catch (err) {
        console.log("handlePlayPause: ", err)
      }
    } else {
      loadSound();
    }
  }

  const handleSliderChange = async (value) => {
    // if (sound && value) {
    //   try {
    //     await sound.setPositionAsync(value);
    //   } catch (err) {
    //     console.log("handleSliderChange: ", err)
    //   }
    // }
    if (audio.audioFile && value) {
      try {
        await audio.audioFile.setPositionAsync(value);
      } catch (err) {
        console.log("handleSliderChange: ", err)
      }
    }
  }

  const handleBackward = async ()=> {
    if (audio.audioFile) {
      try {
        await audio.audioFile.setPositionAsync(audio.location-5000);
      } catch (err) {
        console.log("handleBackward: ", err)
      }
    }
  }
  
  const handleForward = async ()=> {
    if (audio.audioFile) {
      try {
        await audio.audioFile.setPositionAsync(audio.location+5000);
      } catch (err) {
        console.log("handleForward: ", err)
      }
    }
  }

  const handleVolumeChange = async (value) => {
    // setVolume(value);
    // if (sound) {
    //   await sound.setVolumeAsync(value);
    // }
  };

  return (
    <>
      <View style={styles.sliderContainer}>
        {/* <Slider
          style={styles.slider}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onValueChange={handleSliderChange}
        /> */}
        <Slider
          style={styles.slider}
          value={audio.location}
          minimumValue={0}
          maximumValue={audio.length}
          onValueChange={handleSliderChange}
        />
        <FontAwesome5 style={styles.playIcon} name="backward" size={18} color="black" onPress={handleBackward} />
        <FontAwesome5 style={styles.playIcon} name={audio.played ? 'pause' : 'play'} size={18} onPress={handlePlayPause} />
        <FontAwesome5 style={styles.playIcon} name="forward" size={18} color="black" onPress={handleForward} />
      </View>

      {/* <View style={styles.durationConainer}>
        <Text style={styles.duration}>{new Date(position).toISOString().substring(14, 19)}</Text>
        <Text style={styles.duration}>{new Date(duration).toISOString().substring(14, 19)}</Text>
      </View> */}
      <View style={styles.durationConainer}>
        <Text style={styles.duration}>{new Date(audio.location).toISOString().substring(14, 19)}</Text>
        <Text style={styles.duration}>{new Date(audio.location).toISOString().substring(14, 19)}</Text>
      </View>

      {/* <Slider
        style={styles.slider}
        value={volume}
        minimumValue={0}
        maximumValue={1}
        onValueChange={handleVolumeChange}
      /> */}
    </>
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
    // marginHorizontal: 30,
    // marginRight: 92
  },
  playIcon: {
    alignSelf: 'center',
    marginHorizontal: 5,
    // cursor: 'pointer'
  },
  durationConainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default AudioPlayer;
