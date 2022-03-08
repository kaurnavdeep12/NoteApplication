import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import StarRating from 'react-native-star-rating';

const StarRatingComp = () => {
  const [starCount, setstarCount] = useState(3.5);

  function onStarRatingPress(rating: any) {
    setstarCount(rating);
  }

  return (
    <View style={styles.container}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={starCount}
        selectedStar={(rating: any) => onStarRatingPress(rating)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height:500,
    // width:500,
    // backgroundColor: 'red',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StarRatingComp;
