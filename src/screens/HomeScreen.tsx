import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SlideShowComp from '../components/SlideShowComp';
import CategoryComp from '../components/CategoryComp';
import CardwrapperComp from '../components/CardwrapperComp';
const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SlideShowComp />
        <CategoryComp />
        <CardwrapperComp />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default HomeScreen;
