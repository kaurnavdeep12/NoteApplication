import React from 'react';
import {View, TextInput, Platform} from 'react-native';
import {fontScale} from '../utils/Config';

export const EditTextComponent = (props: any) => {
  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: '£333',
          borderRadius: 10,
          marginVertical: 7.5,
        },
        props.style,
      ]}>
      {props.isNumber ? (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === 'ios' ? 10 : 0,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TextInput
            ref={props.getRef}
            placeholderTextColor="#BDC1CD"
            {...props}
            style={[
              {
                fontSize: fontScale(17),
                color: '#102624',
                fontFamily: 'NotoSerif-Bold',
              },
              props.style,
            ]}
          />
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === 'ios' ? 10 : 0,
            justifyContent: 'center',
          }}>
          <TextInput
            ref={props.getRef}
            {...props}
            placeholderTextColor="#BDC1CD"
            secureTextEntry={
              props.secureTextEntry ? props.secureTextEntry : false
            }
            style={[
              {
                fontSize: fontScale(17),
                color: '#102624',
                fontFamily: 'NotoSerif-Bold',
                paddingVertical: 13,
              },
              props.style,
            ]}
            keyboardType={'default'}
          />
        </View>
      )}
    </View>
  );
};
