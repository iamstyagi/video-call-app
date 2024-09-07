import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as JsSIP from '../../../assets/jssip-config/jssip'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MywebrtcDetailsService {

  private userAgent :JsSIP.UA | null =  null ;
  private useVideo = false;
  private statusSubject = new BehaviorSubject<string>('');
  // Expose status observable
  status$ = this.statusSubject.asObservable();
  private userAgentNew :JsSIP | null =  null ;
  Message: string;
  newDetailsOfId:any = '5003'
  newDetailsOfpassword:any = '1234'
  getDetailsOfIp:any = '7777'
  CallState: number;
  localMediaSend:any
  remoteAudioSend:any
  mySessionDetails:any
  mysocket:any
  userNameDetails:any
  userPassWordDetail:any
  userMainDetails:any
  remoteVideoSend:any
  localVideoSend:any
  private isMicrophoneMuted = false;
  stunUrl = environment.stun;
  constructor(){
}

  // public initSipClient(localMedia,remoteAudio,username,password,mainDetails) {
  //    this.localMediaSend = localMedia
  //   this.remoteAudioSend = remoteAudio
  //   this.userNameDetails = username
  //   this.userPassWordDetail = password
  //   this.userMainDetails = mainDetails
  public initSipClient(localMedia, remoteAudio, localVideo, remoteVideo, username, password, mainDetails) {
    this.localMediaSend = localMedia;
    this.remoteAudioSend = remoteAudio;
    this.localVideoSend = localVideo;
    this.remoteVideoSend = remoteVideo;
    this.userNameDetails = username;
    this.userPassWordDetail = password;
    this.userMainDetails = mainDetails;
    const socket = new JsSIP.WebSocketInterface(`wss://${this.userMainDetails.webRTCServerIP}:${this.userMainDetails.webRTCPort}`);
    // const socket = new JsSIP.WebSocketInterface('wss://office.icallmate.in:5091');
   this.mysocket = socket
    const configuration = {
      sockets: [socket],
      uri: `sip:${this.userNameDetails}@${this.userMainDetails.webRTCServerIP}:${this.userMainDetails.webRTCPort}`,
      // uri: `sip:${this.userNameDetails}@office.icallmate.in:9021`,
      // uri: 'sip:5003@office.icallmate.in:9021',
      authorizationUser: `${this.userNameDetails}`,
      password: `${this.userPassWordDetail}`,
      display_name: `${this.userNameDetails}`,
    };
    this.userAgent = new JsSIP.UA(configuration);
    localStorage.setItem('webrtcStatus','Registering')
    this.userAgent.on('connected', () => {
      localStorage.setItem('webrtcStatus','Connected');
    });

    this.userAgent.on('registered', () => {
      localStorage.setItem('webrtcStatus','Registered');
    });

    this.userAgent.on('registrationFailed', (data) => {
      localStorage.setItem('webrtcStatus',data.cause);
    });

    this.userAgent.start();
    localStorage.setItem('webrtcStatus','Ready')
    setTimeout(() => {
      // this.makeCall()
      this.makeCall(true)
    }, 1000);
  }
  // makeCall() {
    makeCall(useVideo: boolean) {
    localStorage.setItem('webrtcStatus','Ready')

    if (this.userAgent) {
        const destinationNumber = `85${this.userMainDetails.agLoginCode}`; // Replace with the destination number or extension
        const destination = `sip:${destinationNumber}@${this.userMainDetails.webRTCServerIP}:${this.userMainDetails.webRTCPort}`;
        // const destination = `sip:${destinationNumber}@office.icallmate.in:9021`;
        const options = {
            // mediaConstraints: { audio: true, video: false },
            mediaConstraints: { audio: true, video: useVideo },
            'pcConfig': {
              'iceServers': [
                { 'urls':`${this.stunUrl}`},
              ]
            }
        };
// const session // Send the INVITE request to initiate the call
const session = this.userAgent.call(destination, options);
session.on('sending', function(e) {
  var lines = e.request.body.split('\r\n');

  // Find the index of the line containing "a=rtcp-mux"
  var rtcpMuxIndex = lines.findIndex(line => line.startsWith('a=rtcp-mux'));

  // Find the index of the line containing "a=rtpmap:126 telephone-event/8000"
  var telEventIndex = lines.findIndex(line => line.startsWith('a=rtpmap:126 telephone-event/8000'));

  // Find the index of the line containing "a=rtpmap:13 CN/8000"
  var cnIndex = lines.findIndex(line => line.startsWith('a=rtpmap:13 CN/8000'));

  // Find the index of the line containing "a=rtpmap:8 PCMA/8000"
  var pcmaIndex = lines.findIndex(line => line.startsWith('a=rtpmap:8 PCMA/8000'));

  // Find the index of the line containing "a=rtcp-fb:111 transport-cc"
  var rtcpFbIndex = lines.findIndex(line => line.startsWith('a=rtcp-fb:111 transport-cc'));

  // Find the index of the line containing "a=rtpmap:63 red/48000/2"
  var redIndex = lines.findIndex(line => line.startsWith('a=rtpmap:63 red/48000/2'));

  // Find the index of the line containing "a=rtpmap:9 G722/8000"
  var g722Index = lines.findIndex(line => line.startsWith('a=rtpmap:9 G722/8000'));

  // Find the index of the line containing "a=rtpmap:111 opus/48000/2"
  var opusIndex = lines.findIndex(line => line.startsWith('a=rtpmap:111 opus/48000/2'));

  // Find the index of the line containing "a=fmtp:111 minptime=10;useinbandfec=1"
  var fmtp111Index = lines.findIndex(line => line.startsWith('a=fmtp:111 minptime=10;useinbandfec=1'));

  // Find the index of the line containing "a=fmtp:63 111/111"
  var fmtp63Index = lines.findIndex(line => line.startsWith('a=fmtp:63 111/111'));

  // Find the index of the line containing "a=rtpmap:0 PCMU/8000"
  var pcmuIndex = lines.findIndex(line => line.startsWith('a=rtpmap:0 PCMU/8000'));

  // Rearrange lines in the desired order
  var reorderedLines = [
      lines[rtcpMuxIndex],
      lines[telEventIndex],
      lines[pcmaIndex],
      lines[pcmuIndex],
      lines[opusIndex],
      lines[rtcpFbIndex],
      lines[redIndex],
      lines[g722Index],
      lines[cnIndex],
      lines[fmtp111Index],
      lines[fmtp63Index],
  ];

  // Remove lines from their original positions
  lines.splice(rtcpMuxIndex, reorderedLines.length);

  // Insert lines back in the desired order
  lines.splice(rtcpMuxIndex, 0, ...reorderedLines);

  // Join the lines back together
  e.request.body = lines.join('\r\n');
});

this.mySessionDetails = session
session.on("icecandidate", function (event) {
    if (event.candidate.type === "srflx" &&
        event.candidate.relatedAddress !== null &&
        event.candidate.relatedPort !== null) {
        event.ready();
    }
  });
session.on('connecting', () => {
  localStorage.setItem('webrtcStatus','Idle');
});

// setInterval(() => {
//   this.getFunction(); 
//   }, 1000);
// session.on('peerconnection', (e) => {
//   e.peerconnection.ontrack = (event: any) => {
//     if (event.track.kind === 'video') {
//       this.remoteVideoSend.nativeElement.srcObject = event.streams[0];
//     } else if (event.track.kind === 'audio') {
//       this.remoteAudioSend.nativeElement.srcObject = event.streams[0];
//     }
//   };
// });
session.on('peerconnection', (e) => {
  e.peerconnection.ontrack = (event: any) => {
    if (event.track.kind === 'video') {
      this.remoteVideoSend.nativeElement.srcObject = event.streams[0];
    }
  };
});

  // const session = this.userAgent.invite(destination, options);
  setTimeout(() => {
    localStorage.setItem('webrtcStatus',`login dialing - 85${this.userMainDetails.agLoginCode}`)
    
  }, 3000);
  session.on('progress', () => {
    localStorage.setItem('webrtcStatus','Progress');
  });
 
  session.on('connect', () => {
    localStorage.setItem('webrtcStatus','Idle');

  });
  setTimeout(() => {
    localStorage.setItem('webrtcStatus',`Idle`)
  }, 6000);
  session.on('newRTCSession', (e) => this.call_session(e));
  session.on('accepted', () => {
    // this.localMediaSend.nativeElement.srcObject = session.connection.getLocalStreams()[0];
    this.remoteAudioSend.nativeElement.srcObject= session.connection.getRemoteStreams[0];
    this.remoteAudioSend.nativeElement.srcObject = session.connection.getRemoteStreams()[0];
    this.localVideoSend.nativeElement.srcObject = session.connection.getLocalStreams()[0];
    this.remoteVideoSend.nativeElement.srcObject = session.connection.getRemoteStreams()[0];
    var outgoingAudioStream1 = session.local_identity;
    this.setupMediaStream(session);
    // Perform any actions when the call is accepted
  });
  // session.on('newRTCSession', (e) => this.call_session(e));
 
  this.setupAudioStream()
  
// session.on('peerconnection', (e) => {
//   // Handle peer connection established
// });

  session.on('failed', (data) => {
    localStorage.setItem('webrtcStatus',data.cause);
    // Handle call failure
  });
  session.on('ended', (e) => {
    localStorage.setItem('webrtcStatus',e.cause);
  });
} else {
    }
}
getFunction(){
  this.mySessionDetails.on('progress',(e)=>{
      })
  this.mySessionDetails.on('newRTCSession', (e) => this.call_session(e));

}
handleIncomingCall(session) {
  session.on('progress', () => {
    console.log('Ringing...');
  });

  session.on('accepted', () => {
    console.log('Call accepted');
    this.setupMediaStream(session); // Set up the media streams for video
  });

  session.answer({
    mediaConstraints: { audio: true, video: true } // Enable video
  });
}
// handleIncomingCall(session) {
//   session.on('progress', () => {
//   });

//   session.on('accepted', () => {
//   });

//   session.on('failed', (data) => {
//   });

//   session.answer();
// }
mystreamData:any

setupAudioStream() {
  // Check for browser compatibility
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        this.mystreamData = stream
        this.remoteAudioSend.nativeElement.srcObject = stream;
        this.remoteVideoSend.nativeElement.srcObject = stream;
        this.localMediaSend.nativeElement.srcObject = stream; // Local media
        this.localVideoSend.nativeElement.srcObject = stream; // Local video
        // this.localVideoSend.nativeElement.srcObject = stream;
        // this.localMediaSend.nativeElement.srcObject = stream;
        
      })
      .catch((error) => {
      });
  } else {
  }
}
setupMediaStream(session) {
  session.on('peerconnection', (e) => {
    const pc = e.peerconnection;

    pc.ontrack = (event) => {
      if (event.track.kind === 'video') {
        this.remoteVideoSend.nativeElement.srcObject = event.streams[0];
      } else if (event.track.kind === 'audio') {
        this.remoteAudioSend.nativeElement.srcObject = event.streams[0];
      }
    };

    this.localVideoSend.nativeElement.srcObject = session.connection.getLocalStreams()[0];
  });
}

Session:any
  incoming_call = new Audio("https://www.soundjay.com/phone/sounds/telephone-ring-01a.mp3");
//   call_session(e){
//     this.Session = e.session;
//     this.Session.on('connecting', (e) => this.call_connecting(e));
//     this.Session.on('confirmed', (e) => this.call_confirmed(e));
//   }
//   call_connecting(e){
//     this.Message = "Connecting";
//     this.CallState = 1;
//   }

 
//   call_confirmed(e){
//     this.CallState = 4;
//     this.Message = "Connected";
//     let peerconnection = this.Session.connection;
//     peerconnection.on('addstream', (e) => {
//       this.remoteAudioSend.nativeElement.srcObject = e.Stream;
//     })
//  }
 public disconnectCall(): void {
  
  if (this.mySessionDetails) {
    this.mySessionDetails.terminate(); // Terminate the call session
  }
}

public unregisterUser(): void {
  // alert(9)
  // Check if the user agent is registered
  // and send an unregister request
  
  if (this.userAgent) {
    this.userAgent.stop(); // Stop the user agent
    this.userAgent.unregister();
    this.userAgent.on('unregistered', () => {
    });
}
  if (this.userAgent && this.userAgent.isConnected()) {
    this.userAgent.unregister();
    this.mySessionDetails.terminate()
  }
}

public toggleMicrophoneMute(): void {
  this.mySessionDetails.mute()
}
public toggleMicrophoneUNmute(): void{
  this.mySessionDetails.unmute()
}
public toggleMicrophoneHold(): void {
  this.mySessionDetails.hold()
}
public toggleMicrophoneUnhold(): void{
  this.mySessionDetails.unhold()
  this.remoteAudioSend.nativeElement.srcObject= this.mySessionDetails.connection.getRemoteStreams[0];
  this.remoteAudioSend.nativeElement.srcObject = this.mySessionDetails.connection.getRemoteStreams()[0];
  setTimeout(() => {
    this.mySessionDetails.unhold()
  this.remoteAudioSend.nativeElement.srcObject= this.mySessionDetails.connection.getRemoteStreams[0];
  this.remoteAudioSend.nativeElement.srcObject = this.mySessionDetails.connection.getRemoteStreams()[0];
  }, 1000);
}
// Handles incoming call events
private call_session(e: any): void {
  this.Session = e.session;

  this.Session.on('connecting', (e) => this.call_connecting(e));
  this.Session.on('confirmed', (e) => this.call_confirmed(e));
  this.Session.on('ended', (e) => this.call_ended(e));

  this.Session.on('peerconnection', (e) => {
      e.peerconnection.ontrack = (event) => {
          if (event.track.kind === 'video') {
              this.remoteVideoSend.nativeElement.srcObject = event.streams[0];
          } else if (event.track.kind === 'audio') {
              this.remoteAudioSend.nativeElement.srcObject = event.streams[0];
          }
      };
  });
}

call_connecting(e) {
  this.Message = "Connecting";
  this.CallState = 1;
}

call_confirmed(e) {
  this.Message = "Connected";
  this.CallState = 4;

  let peerconnection = this.Session.connection;
  peerconnection.ontrack = (event) => {
      if (event.track.kind === 'video') {
          this.remoteVideoSend.nativeElement.srcObject = event.streams[0];
      } else if (event.track.kind === 'audio') {
          this.remoteAudioSend.nativeElement.srcObject = event.streams[0];
      }
  };
}

// setupMediaStream() {
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ audio: true, video: true })
//       .then((stream) => {
//         // Set local video stream
//         this.localVideoSend.nativeElement.srcObject = stream;
//         // Send local stream to the peer connection
//         if (this.mySessionDetails) {
//           stream.getTracks().forEach(track => this.mySessionDetails.connection.addTrack(track, stream));
//         }
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices.', error);
//       });
//   } else {
//     console.error('Media Devices not supported.');
//   }
// }

call_ended(e) {
  this.Message = "Call ended";
}

}