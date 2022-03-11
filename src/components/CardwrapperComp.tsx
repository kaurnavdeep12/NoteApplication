import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import StarRating from '../components/StarRating';

const CardwrapperComp = () => {
  return (
    <View style={styles.cardwrapper}>
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
        Recently Viewed
      </Text>
      <View style={styles.card}>
        <View style={{flex: 1}}>
          <Image
            source={require('../assets/banners/food-banner2.jpg')}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'white'}}>
          <Text style={styles.cardTitle}>Amazing Food Place</Text>
          <StarRating ratings={4} reviews={99} />
          <Text style={styles.cardDetails}>
            Amazing description for this amazing place
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={{flex: 1}}>
          <Image
            source={require('../assets/banners/food-banner3.jpg')}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'white'}}>
          <Text style={styles.cardTitle}>Amazing Food Place</Text>
          <StarRating ratings={4} reviews={99} />
          <Text style={styles.cardDetails}>
            Amazing description for this amazing place
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={{flex: 1}}>
          <Image
            source={require('../assets/banners/food-banner4.jpg')}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'white'}}>
          <Text style={styles.cardTitle}>Amazing Food Place</Text>
          <StarRating ratings={4} reviews={99} />
          <Text style={styles.cardDetails}>
            Amazing description for this amazing place
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: 'pink',
    marginVertical: 10,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 20,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  categorytext: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#FF6347',
  },
  cardwrapper: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 25,
  },
  cardImg: {
    height: 100,
    width: 120,

    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default CardwrapperComp;
