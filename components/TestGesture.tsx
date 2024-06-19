import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from 'react'
import Animated,{
  event,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'

const CARD_SIZE = 100;

export default function App() {

  const [pos, setPos] = useState(1);

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      // ctx.startY = y.value;
    },

    onActive: (event, ctx) => {
      setPos(event.translationX);

      // if(event.translationX > -100 && event.translationX < 0)
      x.value = withSpring(ctx.startX + event.translationX); 
      // y.value = ctx.startY + event.translationY;
    },

    onEnd: () => {
      // x.value = withSpring(0);
      // y.value = withSpring(0);
      // alert(y.value)
    }
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {pos}
      </Text>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[styles.card, cardStyle]} />
      </PanGestureHandler>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    marginTop: 80,
    fontSize: 32,
    fontWeight:'bold',
    marginBottom: 100
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor:'red',
    borderRadius: CARD_SIZE/2
  }
});
