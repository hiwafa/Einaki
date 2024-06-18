
import React, { useContext, useState } from "react";
import { View, Text, Pressable } from "react-native"

import { GlobalContext } from "../app/_layout";
import { Link } from "expo-router";
import { Image } from 'expo-image';

import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const emji = require('../assets/images/icon.png');

export default function HomePage() {

    const homeData = useContext(GlobalContext);
    const [pickedEmoji, setPickedEmoji] = useState(emji);

    return (
        <GestureHandlerRootView style={{flex: 1, paddingTop: 100, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home Page: {homeData.lang.farsi.currentLang} mmm</Text>
            <Link href='settings'>Go To Settings</Link>
            {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </GestureHandlerRootView>
    )
}


function EmojiSticker({ imageSize, stickerSource }) {


    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

    const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

    const scaleImage = useSharedValue(imageSize);

    

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            }
        });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });


    return (
        <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
    );
}
