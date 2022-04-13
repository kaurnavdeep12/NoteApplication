import {useNavigation} from '@react-navigation/core';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {AuthParamList} from '../../Types/NavigationParams';
import RTCViewGrid from './RTCViewGrid';
import ToolBar from './ToolBar';
import UserSelect from './UserSelect';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  acceptCall,
  getUserById,
  processOnAcceptCallListener,
  processOnCallListener,
  processOnRejectCallListener,
  processOnRemoteStreamListener,
  processOnStopCallListener,
  processOnUserNotAnswerListener,
  rejectCall,
  setSpeakerphoneOn,
  stopCall,
} from '../../services/CallService';
import ConnectyCube from 'react-native-connectycube';
import {AuthService} from '../../services';
import {logout} from '../../services/authService';
const VideoScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'AuthScreen'>;
  const opponentsIds = useRoute<RouteProp<AuthParamList, 'VideoScreen'>>();
  let _session: any = null;
  const opponentsId = opponentsIds.params.opponentsIds;
  const [selectedUsersIds, setselectedUsersIds] = useState<any>([]);
  const [isActiveCall, setisActiveCall] = useState<boolean>(false);
  const [isActiveSelect, setisActiveSelect] = useState<boolean>(true);
  const [remoteStreams, setremoteStreams] = useState<any>([]);
  const [localStream, setlocalStream] = useState(null);
  const [isIncomingCall, setisIncomingCall] = useState(false);
  const localStreamItem = localStream
    ? [{userId: 'localStream', stream: localStream}]
    : [];
  console.log('localStreamItem======>', localStreamItem);
  const initiatorName = isIncomingCall
    ? getUserById(_session.initiatorID, 'name')
    : '';
  const streams = [...remoteStreams, ...localStreamItem];
  console.log('streams in clonning=======>', streams);
  // console.log('remoteStreams=========>', remoteStreams);

  // define functions
  setSpeakerphoneOn(remoteStreams.length > 0);
  const resetState = () => {
    setselectedUsersIds([]), setisActiveSelect(true), setisActiveCall(false);
  };
  const closeSelect = () => {
    setisActiveSelect(!isActiveSelect);
  };
  const initRemoteStreams = (opponentsIds: any) => {
    console.log('opponentsIds>>>>>>>>>', opponentsIds);
    const emptyStreams = opponentsIds.map((userId: any) => ({
      userId,
      stream: null,
    }));
    console.log('emptyStream======>', emptyStreams);

    setremoteStreams(emptyStreams);
  };
  const SetLocalStream = (stream: any) => {
    console.log('stream>>>>>>>>>>>>', stream);
    setlocalStream(stream);
  };
  //  update selectedUserIds state for fill radio buttons
  const selectUser = (userId: any) => {
    setselectedUsersIds([...selectedUsersIds, userId]);
  };
  const unselectUser = (userId: any) => {
    const value = selectedUsersIds.filter((id: any) => userId != id);
    setselectedUsersIds(value);
  };

  const hideInomingCallModal = () => {
    _session = null;
    setisIncomingCall(false);
  };

  const _onPressReject = () => {
    rejectCall(_session, {});
    hideInomingCallModal();
  };

  const _onPressAccept = () => {
    acceptCall(_session).then((stream: any) => {
      const {opponentsIDs, initiatorID, currentUserID} = _session;
      const opponentsIds = [initiatorID, ...opponentsIDs].filter(
        userId => currentUserID !== userId,
      );

      initRemoteStreams(opponentsIds);
      SetLocalStream(stream);
      closeSelect();
      hideInomingCallModal();
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <RTCViewGrid streams={streams} />
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
        selectedUsersIds={selectedUsersIds}
        closeSelect={closeSelect}
        initRemoteStreams={initRemoteStreams}
        SetLocalStream={SetLocalStream}
      />
      <AwesomeAlert
        show={isIncomingCall}
        showProgress={false}
        title={`Incoming call from ${initiatorName}`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Reject"
        confirmText="Accept"
        cancelButtonColor="red"
        confirmButtonColor="green"
        onCancelPressed={_onPressReject}
        onConfirmPressed={_onPressAccept}
        onDismiss={hideInomingCallModal}
        alertContainerStyle={{zIndex: 1}}
        titleStyle={{fontSize: 21}}
        cancelButtonTextStyle={{fontSize: 18}}
        confirmButtonTextStyle={{fontSize: 18}}
      />
    </SafeAreaView>
  );
};
export default VideoScreen;
