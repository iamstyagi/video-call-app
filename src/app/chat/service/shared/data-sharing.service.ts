import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private message = new BehaviorSubject<any>(null);
  private number = new BehaviorSubject<any>(null);
  private chats = new BehaviorSubject<any>(null);
  private emptychats = new BehaviorSubject<any>(null);
  private olddChats = new BehaviorSubject<any>(null);
  private closeSession = new BehaviorSubject<any>(null);
  // private updatedChats = new BehaviorSubject<any>(null)
  private sessionStatus = new BehaviorSubject<any>(null);

  constructor() { }

  sendMessage(data) {
    this.message.next(data);
  }

  receivingMessage() {
    return this.message.asObservable();
  }

  sendMobileNumber(number: any) {
    
    
    this.number.next(number);
  }

  receiveMobileNumber() {
    return this.number.asObservable();
  }


  sendChats() {
    this.chats.next(null);
  }

  getChats(): Observable<any> {
    return this.chats.asObservable();
  }


  
  sendEmptyChats() {
    this.emptychats.next(null);
  }

  getEmptyChats(): Observable<any> {
    return this.emptychats.asObservable();
  }


  sendOldChats(prevId) {
    this.olddChats.next(prevId);
  }

  getOldChats(): Observable<any> {
    return this.olddChats.asObservable();
  }


  // sendingReloadingChats(number: any) {
  //   this.updatedChats.next(number);
  // }

  // gettingReloadingChats() {
  //   return this.updatedChats.asObservable()
  // }

  sendCloseChat(data){
    this.closeSession.next(data);
  }

  getCloseChat(){
    return this.closeSession.asObservable();
  }


  sendSession(session){
    this.sessionStatus.next(session)
  }

  getSession(){
    return this.sessionStatus.asObservable();
  }
}
