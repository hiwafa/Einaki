import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import MyButton from './components/MyButton';

export default function App() {
  return (
    <ImageBackground style={styles.container} source={'./assets/images/background-image.png'}>
      <Text style={{color: '#fff'}}>Open up App.js to start working on your app!</Text>

      <MyButton label="Click Me" />

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
