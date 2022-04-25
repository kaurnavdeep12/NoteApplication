// Move animated Carousel from Right to Left using Animted Api
import React, {useEffect, useState} from 'react';
import {Animated, Easing, Text, View} from 'react-native';

const AnimatedCarousel = () => {
  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(new Animated.ValueXY());

  const images = [
    'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    'https://wowslider.com/sliders/demo-71/data1/images/ferris_wheel.jpg',
    'https://wowslider.com/sliders/demo-71/data1/images/london.jpg',
    'https://wowslider.com/sliders/demo-71/data1/images/scotland.jpg',
    'https://wowslider.com/sliders/demo-71/data1/images/windsor.jpg',
  ];

  const reanimation = () => {
    Animated.timing(translate, {
      toValue: {x: -700, y: 0},
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(evt => {
      if (evt.finished) {
        const istrue = index < images.length - 1 ? index + 1 : 0;
        setIndex(istrue);
        const trans = new Animated.ValueXY();
        setTranslate(trans);
      }
      //   reanimation();
    });
  };

  useEffect(() => {
    reanimation();
  });
  const translateXY = translate.getTranslateTransform();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#00688B',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Image
        source={{uri: images[index]}}
        style={{
          right: -400,
          width: '100%',
          height: 400,
          transform: translateXY,
        }}
      />
      <Text style={{color: 'white', fontSize: 20}}>Web Industries</Text>
    </View>
  );
};

export default AnimatedCarousel;
