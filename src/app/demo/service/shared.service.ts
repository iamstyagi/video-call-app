import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public message = new BehaviorSubject<any>('');
  getMessage = this.message.asObservable();

  public socialMedia = new BehaviorSubject<any>('');
  selectedSocialMedia$ = this.socialMedia.asObservable();

  // private whatsappTicket = new BehaviorSubject<any>('');
  // selectedWhatsappTicket$ = this.whatsappTicket.asObservable();

  // public whatsappTicktingMobileNumber = new Subject<any>();
  // selectedWhatsAppTicketingMobileNumber$ = this.whatsappTicktingMobileNumber.asObservable();
  
  setMessage(msg){
      this.message.next(msg);
  }

  socialMediaDetected(mode){
    this.socialMedia.next(mode);
  }

  // whatsappTicketing(mode) {
  //   this.whatsappTicket.next(mode);
  // }

  // whatsappTicktingMobile(mobile){
  //   this.whatsappTicktingMobileNumber.next(mobile)
  // }
  
}
