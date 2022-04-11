import {useNavigation} from '@react-navigation/core';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {AuthParamList} from '../../Types/NavigationParams';
import RTCViewGrid from './RTCViewGrid';
import ToolBar from './ToolBar';
import UserSelect from './UserSelect';

const VideoScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'AuthScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const opponentsIds = useRoute<RouteProp<AuthParamList, 'VideoScreen'>>();
  const opponentsId = opponentsIds.params.opponentsIds;
  const [selectedUsersIds, setselectedUsersIds] = useState<any>([]);
  const [isActiveCall, setisActiveCall] = useState<boolean>(false);
  const [isActiveSelect, setisActiveSelect] = useState<boolean>(true);
  const [localStream, setlocalStream] = useState(null);

  const resetState = () => {
    setselectedUsersIds([]), setisActiveSelect(true), setisActiveCall(false);
  };

  const selectUser = (userId: any) => {
    setselectedUsersIds({...selectedUsersIds, userId});
  };

  const unselectUser = (userId: any) => {
    setselectedUsersIds((prevState: {selectedUsersIds: any[]}) => ({
      selectedUsersIds: prevState.selectedUsersIds.filter(
        id => console.log('Id +++++++++++=========>', id),
        console.log('userid in unSelectUser=========>', userId),
        // userId !== id
      ),
    }));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {/* <RTCViewGrid streams={streams} /> */}
      <UserSelect
        opponentsIds={opponentsId}
        selectedUsersIds={selectedUsersIds}
        selectUser={selectUser}
        unselectUser={unselectUser}
      />
      <ToolBar
        isActiveCall={isActiveCall}
        setisActiveCall={setisActiveCall}
        isActiveSelect={isActiveSelect}
        resetState={resetState}
        localStream={localStream}
      />
    </SafeAreaView>
  );
};
export default VideoScreen;
