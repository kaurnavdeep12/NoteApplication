import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import ConnectyCube from 'react-native-connectycube';
import InCallManager from 'react-native-incall-manager';
import Sound from 'react-native-sound';
import {users} from '../config';

const MEDIA_OPTIONS = {audio: true, video: {facingMode: 'user'}};
const incomingCall = new Sound(require('../../assets/sounds/calling.mp3'));
const outgoingCall = new Sound(require('../../assets/sounds/dialing.mp3'));
const endCall = new Sound(require('../../assets/sounds/end_call.mp3'));
let _session: any = null;
export let mediaDevices = [];
export const showToast = (text: any) => {
  const commonToast = Platform.OS === 'android' ? ToastAndroid : Toast;
  // commonToast.showWithGravity(text, Toast.LONG, Toast.TOP);
};

export const getUserById = (userId: any, key: any) => {
  // console.log('userId===>',userId)
  const user: any = users.find(user => user.id == userId);
  // console.log('user in getUserById=======>', user);

  if (typeof key === 'string') {
    return user[key];
  }

  return user;
};

// Set Media Devices
export const setMediaDevices = () => {
  return ConnectyCube.videochat.getMediaDevices().then((mediaDevices: any) => {
    mediaDevices = mediaDevices;
  });
};

//  for Accept call
export const acceptCall = (session: any) => {
  stopSounds();
  _session = session;
  setMediaDevices();

  return _session.getUserMedia(MEDIA_OPTIONS).then((stream: any) => {
    _session.accept({});
    return stream;
  });
};

// For Start Call
export const startCall = (ids: any) => {
  const options = {};
  const type = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible

  _session = ConnectyCube.videochat.createNewSession(ids, type, options);
  setMediaDevices();
  playSound('outgoing');

  return _session.getUserMedia(MEDIA_OPTIONS).then((stream: any) => {
    _session.call({});
    return stream;
  });
};

// For stopCall
export const stopCall = () => {
  stopSounds();
  if (_session) {
    playSound('end');
    _session.stop({});
    ConnectyCube.videochat.clearSession(_session.ID);
    _session = null;
    mediaDevices = [];
  }
};

// For Reject Call
export const rejectCall = (session: any, extension: any) => {
  stopSounds();
  session.reject(extension);
};

export const setAudioMuteState = (mute: any) => {
  if (mute) {
    _session.mute('audio');
  } else {
    _session.unmute('audio');
  }
};

// For switch camera
export const switchCamera = (localStream: any) => {
  localStream
    .getVideoTracks()
    .forEach((track: {_switchCamera: () => any}) => track._switchCamera());
};

export const setSpeakerphoneOn = (flag: any) =>
  InCallManager.setSpeakerphoneOn(flag);

// User not Pickup the call
export const processOnUserNotAnswerListener = (userId: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!_session) {
      reject();
    } else {
      const userName = getUserById(userId, 'name');
      const message = `${userName} did not answer`;

      showToast(message);

      resolve();
    }
  });
};

// when User busy on another call
export const processOnCallListener = (session: any) => {
  return new Promise<void>((resolve, reject) => {
    if (session.initiatorID === session.currentUserID) {
      reject();
    }

    if (_session) {
      rejectCall(session, {busy: true});
      reject();
    }

    playSound('incoming');

    resolve();
  });
};

// User has accepted the call
export const processOnAcceptCallListener = (
  session: any,
  userId: any,
  extension = {},
) => {
  return new Promise<void>((resolve, reject) => {
    if (userId === session.currentUserID) {
      _session = null;
      showToast('You have accepted the call on other side');

      reject();
    } else {
      const userName = getUserById(userId, 'name');
      const message = `${userName} has accepted the call`;

      showToast(message);
      stopSounds();

      resolve();
    }
  });
};

// rejected the call on other side
export const processOnRejectCallListener = (
  session: any,
  userId: any,
  extension = {},
) => {
  return new Promise<void>((resolve, reject) => {
    if (userId === session.currentUserID) {
      _session = null;
      showToast('You have rejected the call on other side');

      reject();
    } else {
      const userName = getUserById(userId, 'name');
      const message = extension.busy
        ? `${userName} is busy`
        : `${userName} rejected the call request`;

      showToast(message);

      resolve();
    }
  });
};

//  stopped/Left the call
export const processOnStopCallListener = (userId: any, isInitiator: any) => {
  return new Promise<void>((resolve, reject) => {
    stopSounds();

    if (!_session) {
      reject();
    } else {
      const userName = getUserById(userId, 'name');
      const message = `${userName} has ${
        isInitiator ? 'stopped' : 'left'
      } the call`;

      showToast(message);

      resolve();
    }
  });
};

export const processOnRemoteStreamListener = () => {
  return new Promise<void>((resolve, reject) => {
    if (_session) {
      reject();
    } else {
      resolve();
    }
  });
};

// For PlaySound
export const playSound = (type: any) => {
  switch (type) {
    case 'outgoing':
      outgoingCall.setNumberOfLoops(-1);
      outgoingCall.play();
      break;
    case 'incoming':
      incomingCall.setNumberOfLoops(-1);
      incomingCall.play();
      break;
    case 'end':
      endCall.play();
      break;

    default:
      break;
  }
};

// For Stop Sounds
export const stopSounds = () => {
  if (incomingCall.isPlaying()) {
    incomingCall.pause();
  }
  if (outgoingCall.isPlaying()) {
    outgoingCall.pause();
  }
};
