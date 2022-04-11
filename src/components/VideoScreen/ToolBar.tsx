import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {mediaDevices, switchCamera} from '../../services/CallService';
interface Props {
  isActiveCall: boolean;
  setisActiveCall: (state: any, callback?: () => void) => void;
  isActiveSelect: boolean;
  resetState: () => void;
  localStream: any;
}
const ToolBar = ({
  isActiveCall,
  setisActiveCall,
  isActiveSelect,
  resetState,
  localStream,
}: Props) => {
  const isAudioMuted = false;
  const isCallInProgress = isActiveCall || !isActiveSelect;
  const isAvailableToSwitch = isActiveCall && mediaDevices.length > 1;
  const [isFrontCamera, setisFrontCamera] = useState<boolean>(true);
  const type = isFrontCamera ? 'camera-rear' : 'camera-front';
  // for muteUnmuteAudio
  function muteUnmuteAudio() {}

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

  function stopCall() {
    // CallService.stopCall();
    resetState();
  }

  function startCall() {}

  function renderCallStartStopButton(isCallInProgress: any) {
    const style = isCallInProgress ? styles.buttonCallEnd : styles.buttonCall;
    const onPress = isCallInProgress ? stopCall : startCall;
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
