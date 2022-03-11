import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
const SlideShowComp = () =>{
    return(
        <View style={styles.slideshow}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#FF6347">
            <View style={styles.slide}>
              <Image
                source={require('../assets/banners/food-banner1.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assets/banners/food-banner2.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assets/banners/food-banner3.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    slideshow: {
        height: 200,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 8,
      },
      sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
      },
      slide: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 8,
      },
})

export default SlideShowComp;