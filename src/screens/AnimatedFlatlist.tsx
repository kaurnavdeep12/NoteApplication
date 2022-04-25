import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import List from '../components/List';

interface data {
  name: string;
  email: string;
  job_title: string;
  key: string;
  avatar: string;
}

export default function App() {
  // const { faker } = require('@faker-js/faker');
  const faker = [
    {
      name: 'pooja',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'pragya',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'John',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'Alisa',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'Tejaswani',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'KomalPreet',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'Roma',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'UserA',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'Alisa',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
    {
      name: 'Tejaswani',
      job_title: 'Professional',
      email: 'abc123@yopmail.com',
      key: '4654656dhhghghjg',
      avatar:
        'https://wowslider.com/sliders/demo-71/data1/images/edinburgh.jpg',
    },
  ];
  const data = faker.map(item => ({
    name: item.name,
    job_title: item.job_title,
    email: item.email,
    key: item.key,
    avatar: item.avatar,
  }));

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text
        style={{
          marginTop: 10,
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 20,
        }}>
        FlatList
      </Text>
      <List data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
