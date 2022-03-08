import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RateModal from 'react-native-store-rating';

interface props {
  visible: boolean;
  toggleModal: (notVisible: boolean) => void;
}
const RatePopupComp = ({visible, toggleModal}: props) => {
  // const [isModalOpen, setisModalOpen] = useState(true);

  //  useEffect(() => {
  //   setisModalOpen(true);
  // }, []);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={OnPressModal}>
        <Text style={{fontWeight:'bold',fontSize:20}}> Open Modal </Text>
      </TouchableOpacity> */}

      <RateModal
        rateBtnText={'Rate'}
        cancelBtnText={'Cancel'}
        totalStarCount={5}
        defaultStars={5}
        isVisible={true}
        sendBtnText={'Send'}
        commentPlaceholderText={'Placeholder text'}
        emptyCommentErrorMessage={'Empty comment error message'}
        playStoreUrl={'market://details?id=${com.noteapplication}'}
        iTunesStoreUrl={'market://details?id=${com.noteapplication}'}
        isModalOpen={visible}
        storeRedirectThreshold={3}
        style={{
          paddingHorizontal: 30,
        }}
        onStarSelected={e => {
          console.log('change rating', e);
        }}
        onClosed={() => {
          console.log('pressed cancel button...');
          toggleModal(false);

          // setisModalOpen(false);
        }}
        sendContactUsForm={state => {
          Alert.alert(JSON.stringify(state));
        }}
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default RatePopupComp;
