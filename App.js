import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import MyButton from './components/MyButton';
import { useState } from 'react';

export default function App() {

  const [backImage, setBackImage] = useState('./assets/images/background-image.png');

  const handleBackImage = imgData => {
    if(imgData.assets && imgData.assets[0] && imgData.assets[0].uri){
      console.log(imgData)
      setBackImage({uri: imgData.assets[0].uri});
    }
  }

  return (
    <ImageBackground style={styles.container} source={backImage}>
      <Text style={{color: '#fff'}}>Open up App.js to start working on your app!</Text>

      <MyButton label="Click Me" handleBackImage={handleBackImage} />

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
