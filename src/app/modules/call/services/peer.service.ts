import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Peer from 'peerjs';  // Import Peer from peerjs

export interface CallUser {
  peerId: string;
  stream: MediaStream;
}

@Injectable()
export class PeerService {
  public peer: Peer;
  public myPeerId: string;
  public joinUser = new BehaviorSubject<CallUser>(null);
  public leaveUser = new BehaviorSubject<string>(null);
  public localStream: MediaStream;

  constructor() { }

  public openPeer(stream: MediaStream): Promise<string> {
    return new Promise<string>((resolve) => {
      this.initPeer();  // Initialize Peer without passing unnecessary config for now
      this.peer.on('open', (peerId: string) => {
        this.myPeerId = peerId;
        this.handleIncomingCall(stream);
        resolve(peerId);
      });
    });
  }

  public call(anotherPeerId: string, stream: MediaStream): void {
    const call = this.peer.call(anotherPeerId, stream);
    this.handleCall(call, anotherPeerId);
  }

  private handleIncomingCall(stream: MediaStream): void {
    this.peer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (remoteStream) => {
        this.joinUser.next({ peerId: call.peer, stream: remoteStream });
      });
    });
  }

  private handleCall(call: any, anotherPeerId: string): void {
    call.on('stream', (remoteStream) => {
      this.joinUser.next({ peerId: anotherPeerId, stream: remoteStream });
    });
  }

  private initPeer(): void {
    this.peer = new Peer(this.myPeerId, {
      host: '/',
      // host: 'comfy-monstera-3a0f45.netlify.app',
      // host: 'video-calling-1-8uym.onrender.com',
      port: 3001, // config: config
      secure: false  // Enable secure connection (HTTPS)
    });
  }
}
