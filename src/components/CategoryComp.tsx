import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
const CategoryComp = () => {
  return (
    <ScrollView>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categorytext}>Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={35}
              color="#FF6347"
            />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            Fastfood center
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="food" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            Snacks Center
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer]}>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            Hotels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            dineouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            Show More
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer]}>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            Hotels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            dineouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categorybtn}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FF6347" />
          </View>
          <Text style={{alignSelf: 'center', marginTop: 5, color: '#FF6347'}}>
            Show More
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    // width: '90%',

    alignSelf: 'center',
    // marginTop: 10,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  categoryIcon: {
    height: 70,
    width: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  categorybtn: {
    width: '30%',
  },
  cardImg: {
    height: 100,
    width: 120,

    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  categorytext: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#FF6347',
  },
});

export default CategoryComp;
