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
const VideoScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'AuthScreen'>;
  const navigation = useNavigation<NavigationProp>();
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
  const initiatorName = isIncomingCall
    ? getUserById(_session.initiatorID, 'name')
    : '';
  const streams = [...remoteStreams, ...localStreamItem];

  // define functions
  setSpeakerphoneOn(remoteStreams.length > 0);
  const resetState = () => {
    setselectedUsersIds([]), setisActiveSelect(true), setisActiveCall(false);
  };
  const closeSelect = () => {
    setisActiveSelect(!isActiveSelect);
  };
  const initRemoteStreams = (opponentsIds: any) => {
    const emptyStreams = opponentsIds.map((userId: any) => ({
      userId,
      stream: null,
    }));

    setremoteStreams(emptyStreams);
  };
  const SetLocalStream = (stream: any) => {
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

  const showInomingCallModal = (session: any) => {
    _session = session;
    setisIncomingCall(!isIncomingCall);
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

  useEffect(() => {
    _setUpListeners();
  });

  // componentWillUnmount
  useEffect(() => {
    stopCall();
    AuthService.logout();
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
    if (remoteStreams.length === 1 && remoteStreams.length === 0) {
      stopCall();
      resetState();
    }
  });

  // Listeners
  const _onCallListener = (session: any, extension: any) => {
    processOnCallListener(session)
      .then(() => showInomingCallModal(session))
      .catch(hideInomingCallModal);
  };

  const _onAcceptCallListener = (session: any, userId: any, extension: any) => {
    processOnAcceptCallListener(session, userId, extension)
      .then(setOnCall)
      .catch(hideInomingCallModal);
  };

  const _onRejectCallListener = (session: any, userId: any, extension: any) => {
    processOnRejectCallListener(session, userId, extension)
      .then(() => removeRemoteStream(userId))
      .catch(hideInomingCallModal);
  };

  const _onStopCallListener = (
    session: {initiatorID: any},
    userId: any,
    extension: any,
  ) => {
    const isStoppedByInitiator = session.initiatorID === userId;

    processOnStopCallListener(userId, isStoppedByInitiator)
      .then(() => {
        if (isStoppedByInitiator) {
          resetState();
        } else {
          removeRemoteStream(userId);
        }
      })
      .catch(hideInomingCallModal);
  };

  const _onUserNotAnswerListener = (session: any, userId: any) => {
    processOnUserNotAnswerListener(userId)
      .then(() => removeRemoteStream(userId))
      .catch(hideInomingCallModal);
  };

  const _onRemoteStreamListener = (session: any, userId: any, stream: any) => {
    processOnRemoteStreamListener()
      .then(() => {
        updateRemoteStream(userId, stream);
        setOnCall();
      })
      .catch(hideInomingCallModal);
  };

  const setOnCall = () => {
    setisActiveCall(!isActiveCall);
  };

  const updateRemoteStream = (userId: any, stream: any) => {
    setremoteStreams(({remoteStreams}: any) => {
      const updatedRemoteStreams = remoteStreams.map(
        (item: {userId: any; stream: any}) => {
          if (item.userId === userId) {
            return {userId, stream};
          }

          return {userId: item.userId, stream: item.stream};
        },
      );

      return {remoteStreams: updatedRemoteStreams};
    });
  };

  const removeRemoteStream = (userId: any) => {
    const stream_value = remoteStreams.filter(
      (item: {userId: any}) => item.userId != userId,
    );
    setremoteStreams(stream_value);
  };
  //  Call Listeners
  const _setUpListeners = () => {
    ConnectyCube.videochat.onCallListener = _onCallListener;
    ConnectyCube.videochat.onAcceptCallListener = _onAcceptCallListener;
    ConnectyCube.videochat.onRejectCallListener = _onRejectCallListener;
    ConnectyCube.videochat.onStopCallListener = _onStopCallListener;
    ConnectyCube.videochat.onUserNotAnswerListener = _onUserNotAnswerListener;
    ConnectyCube.videochat.onRemoteStreamListener = _onRemoteStreamListener;
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
