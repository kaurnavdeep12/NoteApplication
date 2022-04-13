import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  mediaDevice,
  setAudioMuteState,
  showToast,
  startCall,
  stopCall,
  switchCamera,
} from '../../services/CallService';
interface Props {
  isActiveCall: boolean;
  setisActiveCall: (state: any, callback?: () => void) => void;
  isActiveSelect: boolean;
  resetState: () => void;
  localStream: any;
  selectedUsersIds: any[];
  closeSelect: () => void;
  initRemoteStreams: (opponentsIds: any) => void;
  SetLocalStream: (stream: any) => void;
}
const ToolBar = ({
  isActiveCall,
  isActiveSelect,
  resetState,
  localStream,
  selectedUsersIds,
  closeSelect,
  initRemoteStreams,
  SetLocalStream,
}: Props) => {
  // console.log('setlocalstream======>', SetLocalStream);
  // console.log('localStream========>', localStream);
  // const isAudioMuted = false;
  const isCallInProgress = isActiveCall || !isActiveSelect;
  const isAvailableToSwitch = isActiveCall && mediaDevice.length > 1;
  const [isFrontCamera, setisFrontCamera] = useState<boolean>(true);
  const [isAudioMuted, setisAudioMuted] = useState(false);
  const type = isFrontCamera ? 'camera-rear' : 'camera-front';

  // for muteUnmuteAudio
  function muteUnmuteAudio() {
    const mute = setisAudioMuted(!isAudioMuted);
    setAudioMuteState(mute);
    return {isAudioMuted: mute};
  }

  function renderMuteButton() {
    const type = isAudioMuted ? 'mic-off' : 'mic';
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonSwitch]}
        onPress={muteUnmuteAudio}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  }

  function StopCall() {
    stopCall();
    resetState();
  }

  function StartCall() {
    console.log('enter in startcall==');
    if (selectedUsersIds.length === 0) {
      showToast('Select at less one user to start Videocall');
    } else {
      closeSelect();
      initRemoteStreams(selectedUsersIds);
      startCall(selectedUsersIds).then(SetLocalStream);
    }
  }

  function renderCallStartStopButton(isCallInProgress: any) {
    console.log('isCallInProgress=======>', isCallInProgress);
    const style = isCallInProgress ? styles.buttonCallEnd : styles.buttonCall;
    const onPress = isCallInProgress ? StopCall : StartCall;
    const type = isCallInProgress ? 'call-end' : 'call';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, style]}
        onPress={onPress}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  }

  function SwitchCamera() {
    switchCamera(localStream);
    setisFrontCamera(!isFrontCamera);
  }

  function _renderSwitchVideoSourceButton() {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonSwitch]}
        onPress={SwitchCamera}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolBarItem}>
        {isActiveCall && renderMuteButton()}
      </View>
      <View style={styles.toolBarItem}>
        {renderCallStartStopButton(isCallInProgress)}
      </View>
      <View style={styles.toolBarItem}>
        {isAvailableToSwitch && _renderSwitchVideoSourceButton}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  toolBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 80,
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSwitch: {
    backgroundColor: 'orange',
  },
  buttonCallEnd: {
    backgroundColor: 'red',
  },
  buttonCall: {
    backgroundColor: 'green',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default ToolBar;
