// components/AudioPlayer.js
import React, { useState, useEffect, useRef, useReducer } from 'react';
import { View, Text, Button, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import { lightStyles, darkStyles, lightPrimaryBackColor } from "../app/styles";

const initialAudio = {
  audioFile: null,
  location: 1,
  length: 1000,
  played: false,
  loudness: 0.7,
  loadingStatus: false
}

const audioReducer = (state, { type, value }) => {
  switch (type) {
    case "replace":
      return value;
    case "allExceptAudio":
      return { ...value, audioFile: state.audioFile };
    case "audioFile":
      return { ...state, [type]: value }
    case "loading":
      return { ...state, [type]: value }
    default: return state;
  }
}

let h = 0, m = 0, s = 0;
const getTimeString = (seconds) => {

  h = parseInt(seconds / (60 * 60));
  m = parseInt(seconds % (60 * 60) / 60);
  s = parseInt(seconds % 60);

  // return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
};

const AudioPlayer = () => {

  const theme = "light";
  const styles = theme === "light" ? lightStyles : darkStyles;

  const [audio, setAudio] = useReducer(audioReducer, initialAudio);

  useEffect(() => {
    return () => {
      if (audio.audioFile) audio.audioFile.unloadAsync();
    };
  }, [audio.audioFile]);

  if (audio.location > 10 && audio.location === audio.length) {
    setAudio({
      type: "allExceptAudio",
      value: {
        location: 10,
        length: audio.length + 1,
        played: audio.played,
        loudness: 0.7,
        loadingStatus: false
      }
    })
  }

  const loadSound = async () => {

    setAudio({
      type: 'loadingStatus',
      value: true
    })

    try {
      const { sound } = await Audio.Sound.createAsync({uri: 'https://6a63fca904fd268f15f7-d5770ffdd579eb31eaa89faeffc55fe7.ssl.cf1.rackcdn.com/LE_listening_B1_A_phone_call_from_a_customer.mp3'},
        {
          shouldPlay: true, // Automatically start playing the sound
          // volume: 0.5,      // Set initial volume to 50%
          // isLooping: false, // Do not loop the sound
          // rate: 1.0,        // Play at normal speed
          positionMillis: 0 // Start from the beginning
        },
        (status) => {
          if (status.isLoaded && status.durationMillis && status.positionMillis) {

            // if (status.didJustFinish && !status.isLooping) {
            // }

            setAudio({
              type: 'allExceptAudio', value: {
                location: status.positionMillis,
                length: status.durationMillis,
                played: status.isPlaying,
                loudness: status.volume,
                loadingStatus: false
              }
            });



          }
        }
      );

      setAudio({
        type: "audioFile",
        value: sound
      });

    } catch (err) {
      console.log("loadSound: ", err)
    }

  }

  const handlePlayPause = async () => {
    if (audio.audioFile && audio.location > 10) {
      try {
        if (audio.played) {
          await audio.audioFile.pauseAsync();
        } else {
          console.log("Else Not Played Reloaded..................")
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
    if (audio.audioFile && value) {
      try {
        await audio.audioFile.setPositionAsync(value);
      } catch (err) {
        console.log("handleSliderChange: ", err, value);
      }
    }
  }

  const handleBackward = async () => {
    if (audio.audioFile) {
      try {
        await audio.audioFile.setPositionAsync(audio.location - 5000);
      } catch (err) {
        console.log("handleBackward: ", err)
      }
    }
  }

  const handleForward = async () => {
    if (audio.audioFile) {
      try {
        await audio.audioFile.setPositionAsync(audio.location + 5000);
      } catch (err) {
        console.log("handleForward: ", err)
      }
    }
  }

  const handleSliderComplete = () => {
  }

  const handleSliderStart = () => {
  }

  const handleVolumeChange = async (value) => {
    // if (audio.audioFile) { // increase volume
    //   await audio.audioFile.setVolumeAsync(value);
    // }
  };

  return (
    <>
      <View style={styles.sliderContainer}>

      {/* (audio.location / audio.length ) * 100 */}

        <Slider
          style={{
            flex: 1,
            width: '100%',
            alignSelf: 'center'
          }}
          thumbTintColor='#fff'
          maximumTrackTintColor='#000'
          minimumTrackTintColor='#fff'
          value={audio.location}
          minimumValue={0}
          maximumValue={audio.length}
          onValueChange={handleSliderChange}
          onSlidingStart={handleSliderStart}
          onSlidingComplete={handleSliderComplete}
        />


        <TouchableOpacity disabled={audio.loadingStatus} style={styles.touchableOpacity} onPress={handleBackward}>
          <FontAwesome5 style={styles.playIcon} name="backward" size={10} color="black" />
        </TouchableOpacity>

        <TouchableOpacity disabled={audio.loadingStatus} style={styles.touchableOpacity} onPress={handlePlayPause}>
          <FontAwesome5 style={styles.playIcon} name={audio.played ? 'pause' : 'play'} size={10} />
        </TouchableOpacity>
        <TouchableOpacity disabled={audio.loadingStatus} style={styles.touchableOpacity} onPress={handleForward}>
          <FontAwesome5 style={styles.playIcon} name="forward" size={10} color="black" />
        </TouchableOpacity>

      </View>

      <View style={styles.timerLessonContainer}>
        <View style={styles.timerConainer}>
          <Text style={styles.timerStyle}>{getTimeString(audio.location / 1000)} / </Text>
          <Text style={styles.timerStyle}>{getTimeString(audio.length / 1000)}</Text>
        </View>

        <View style={styles.nextPrevLesson}>
          <TouchableOpacity style={styles.touchableOpacity}>
            <MaterialIcons name="navigate-before" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <MaterialIcons name="navigate-next" size={20} color="black" />
          </TouchableOpacity>

        </View>

      </View>

    </>
  );
};


export default AudioPlayer;
