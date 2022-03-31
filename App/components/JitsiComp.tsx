import React, {useEffect} from 'react';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

function App() {
  useEffect(() => {
    setTimeout(() => {
      // here you need to give join link
      const url = 'https://meet.jit.si/exemple';
      const userInfo = {
        displayName: 'User',
        email: 'user@example.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call(url, userInfo);
      /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
      /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent: any) {
    /* Conference terminated event */
    console.log(nativeEvent);
    console.log('Meeting Ended');
  }

  function onConferenceJoined(nativeEvent: any) {
    /* Conference joined event */
    console.log(nativeEvent);
    console.log('Meeting Joined');
  }

  function onConferenceWillJoin(nativeEvent: any) {
    /* Conference will join event */
    console.log(nativeEvent);
    console.log('Meeting before Join');
  }
  return (
    <JitsiMeetView
      onConferenceTerminated={(e: any) => onConferenceTerminated(e)}
      onConferenceJoined={(e: any) => onConferenceJoined(e)}
      onConferenceWillJoin={(e: any) => onConferenceWillJoin(e)}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
    />
  );
}
export default App;
