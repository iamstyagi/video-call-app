import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from 'src/app/demo/service/message';
import { User } from 'src/app/demo/service/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhatsappServiceService {

  _activeUser: User = {
    "id": 1,
    "name": "Ioni Bowcher",
    "image": "ionibowcher.png",
    "status": "active",
    "messages": [
      {
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "ownerId": 1,
        "createdAt": 1652646338240
      },
      {
        "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "ownerId": 1,
        "createdAt": 1652646368718
      },
      {
        "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "ownerId": 123,
        "createdAt": 1652646368718
      },
    ],
    "lastSeen": "2d"
  }
  private emailFoundSource = new Subject<boolean>();
  emailFound$ = this.emailFoundSource.asObservable();


  private activeUser = new BehaviorSubject<User>(this._activeUser);

  activeUser$ = this.activeUser.asObservable();

  constructor(private http: HttpClient) { }
  headers = { 'content-type': 'application/json' }
  baseUrl = environment.apiUrl;
private previousData: any[] = [];

  getChatData(data) {
    return this.http.post<any>(this.baseUrl + '/getWAContacts',data, { headers: this.headers })
      .toPromise()
      .then((response: any) => {
        if (response || response.listContact || response.jsonlistContact) {
          const res: any[] = response.jsonlistContact;
          // const res: any[] = JSON.parse(response.jsonlistContact);
          const users: any[] = res.map(items => {
            const phoneno = items.phoneno;
            const text = items.text;
            const unreadcount = items.unreadcount;
            const inchat = items.inchat;
            const maskphoneno = items.maskphoneno;
            const isfollowup = items.isfollowup;
            const rowid = items.rowid;
            const businessId = items.businessId;

            return {
              phoneNumber: phoneno ? phoneno : null,
              messages: text ? [text] : [],
              unreadcount: unreadcount,
              inchat: inchat,
              maskphoneno : maskphoneno ? maskphoneno : null,
              isfollowup : isfollowup,
              rowid :rowid,
              businessId :businessId
            }
          })

          return users;
        } else {
          return [];
        }
      })
      .catch(error => {
        throw error;
      });
  }
  // getChatData(data) {
  //   return this.http.post<any>(this.baseUrl + '/getWAContacts', data, { headers: this.headers })
  //     .toPromise()
  //     .then((response: any) => {
  //       let users: any[] = [];

  //       // Check if response and jsonlistContact exist
  //       if (response && response.jsonlistContact) {
  //         users = response.jsonlistContact.map(items => {
  //           const phoneno = items.phoneno;
  //           const text = items.text;
  //           const unreadcount = items.unreadcount;
  //           const inchat = items.inchat;
  //           const maskphoneno = items.maskphoneno;
  //           const isfollowup = items.isfollowup;
  //           const rowid = items.rowid;
  //           const businessId = items.businessId;

  //           return {
  //             phoneNumber: phoneno ? phoneno : null,
  //             messages: text ? [text] : [],
  //             unreadcount: unreadcount,
  //             inchat: inchat,
  //             maskphoneno: maskphoneno ? maskphoneno : null,
  //             isfollowup: isfollowup,
  //             rowid: rowid,
  //             businessId: businessId
  //           };
  //         });
  //       }

  //       // If users array is empty, retain the previous data
  //       if (users.length === 0 && this.previousData) {
  //         users = this.previousData;
  //       } else {
  //         // Update the previous data with the new data
  //         this.previousData = users;
  //       }

  //       return users;
  //     })
  //     .catch(error => {
  //       throw error;
  //     });
  // }

  notifyEmailFound(found: boolean) {
    this.emailFoundSource.next(found);
  }
  getChatMessages(data): Observable<any> {
    // return this.http.post<any>(this.baseUrl + '/loadWAChat', data, { headers: this.headers })
    return this.http.post<any>(this.baseUrl + '/whatsappchat', data, { headers: this.headers })
  }


  changeActiveChat(user: any) {
    this._activeUser = user;
    this.activeUser.next(user);
  }

  sendMessage(message: Message) {
    this._activeUser.messages.push(message);
    this.activeUser.next(this._activeUser);
  }


  sendmessage(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/sendWhatsAppMsg', data, { headers: this.headers })
  }
  


  //   sendmessage(data): Observable<any> {
  //   const apiUrl = 'http://192.168.68.198:8090/icallmate-ucp-api-ucp/sendWhatsAppMsg';  // Define the full URL here
  //   return this.http.post<any>(apiUrl, data, { headers: this.headers });
  // }


  //----Save Excel Contact Data--------------------//
  public saveFile(file,campid): Observable<any> {
    let headers = new HttpHeaders();
    const formData = new FormData();
    // formData.append('content', content);
    if (file != null && file.name != null) {
      formData.append('file', file, file.name);
    }
    return this.http.post<any>(this.baseUrl + '/uploadFileWA'+'?campID='+campid, formData, { headers });
  }


  public loadWATemplate(payload: any) {
    return this.http.post(this.baseUrl + '/loadWATemplate', payload, { headers: this.headers })
  }

  public sendWhatsAppTemplate(payload: any) {
    return this.http.post(this.baseUrl + '/sendWhatsAppTemplate', payload, { headers: this.headers })
  }

  public openLoadedChats(data: any) {
    return this.http.post<any>(this.baseUrl + '/loadWAChat', data, { headers: this.headers })
  }
  
  public sessionClose(data:any){
    return this.http.post<any>(this.baseUrl + '/closeChatSession', data, { headers: this.headers })
  }
  
  public getTemplateData(){
    return this.http.get<any>(this.baseUrl + '/getTemplateData', { headers: this.headers })
  }
  
  public searchFromDB(number){
    return this.http.post<any>(this.baseUrl + '/searchWAContact', number, { headers: this.headers })
  }
  
  public loadMetaTemplates(data:any){
    return this.http.post<any>(this.baseUrl + '/loadMetaTemplates', data, { headers: this.headers })
  }
  public loadMediaTemplates(data:any){
    return this.http.post<any>(this.baseUrl + '/loadMediaTemplates', data, { headers: this.headers })
  }
  public loadTextTemplates(data:any){
    return this.http.post<any>(this.baseUrl + '/loadTextTemplates', data, { headers: this.headers })
  }
  
  
  public getTemplates(data){
    return this.http.post<any>(this.baseUrl + '/loadAllTemplates', data, { headers: this.headers })
  }

  public getContacts(data){
    return this.http.post<any>(this.baseUrl + '/loadContactList', data, { headers: this.headers });
  }
  public sendFollowUp(data){
    return this.http.post<any>(this.baseUrl+ '/sendFollowUp',data, { headers: this.headers });
  }
  public getLocationContacts(data){
    return this.http.post<any>(this.baseUrl+ '/loadLocationContactList',data, { headers: this.headers });
  }

  getContactsDetails(params:any):Observable<any>{
    return this.http.get<any>(this.baseUrl + `/getContacts?rowId=${params}`, { headers: this.headers } )
}
getRejectReasonValue(data){
  return this.http.post<any>(this.baseUrl+ '/getRejectReason',data, { headers: this.headers });
}
getDownloadDataNew(data){
  return this.http.post<any>(this.baseUrl+ '/getDownloadWAMedia',data, { headers: this.headers });
}
sendSMSAPI(data){
  return this.http.post<any>(this.baseUrl+ '/getSendSMS',data, { headers: this.headers });
}
sendBusinessContacs(data){
  return this.http.post<any>(this.baseUrl+ '/getSendContact',data, { headers: this.headers });
}
getPollTimerDetails(data){
  return this.http.post<any>(this.baseUrl+ '/getPollTimer',data, { headers: this.headers });
}
messageReadUnread(params:any){
  return this.http.get<any>(this.baseUrl + `/getReadUpdate?rowid=${params}`, { headers: this.headers } )
}
getFaqDeatisl(data){
  return this.http.post<any>(this.baseUrl+ '/getFAQ',data, { headers: this.headers });
}
}
 
    

