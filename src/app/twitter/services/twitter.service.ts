import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  tweetInbox(data) {
    return this.http.post<any>(this.baseUrl + '/getTwittesData', data, { headers: this.headers });
  }

  selectRow(data) {
    return this.http.post<any>(this.baseUrl + '/onRowTwitterSelectInbox', data, { headers: this.headers })
  }

  saveTickets(data) {
    return this.http.post<any>(this.baseUrl + '/saveTicketFrom', data, { headers: this.headers })
  }

  statusOptions() {
    return this.http.get(this.baseUrl + '/getticketstatus');
  }

  sendReplyTweets(data) {
    return this.http.post<any>(this.baseUrl + '/sendReplyTweets', data, { headers: this.headers })
  }

  getTicketHistory(data) {
    return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords?campid=' + data.campID + '&' + 'ticketid=' + data.ticketID)
  }

  twitterDMnotification(data){
    return this.http.post<any>(this.baseUrl + '/twitteDMNotification', data, { headers: this.headers });
  }
  
  getLiveChats(data): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/getDMChats', data, { headers: this.headers });
  }

  // sendDMmessages(data:any, file: any){
  //   // const params = new HttpParams().set('content', JSON.stringify(data));
  //   // return this.http.post(this.baseUrl + '/sendDMMessage', null, { headers: this.headers, params: params });

  //   const formData = new FormData();
  //   formData.append('content', JSON.stringify(data));
  //   formData.append('file', file, file.name);

  //   return this.http.post(this.baseUrl + '/sendDMMessage', formData);
    
  // }


  sendDMmessages(data: any, file: Blob | any): Observable<any> {
    
    
    
    const formData = new FormData();
    formData.append('content', JSON.stringify(data));
  
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.post(this.baseUrl + '/sendDMMessage', formData);
  }
  

  openDMchat(data){
    return this.http.post<any>(this.baseUrl + '/opentwitterDMChats', data, { headers: this.headers });
  }
  
  
  loadTemplates(data){
    return this.http.post<any>(this.baseUrl + '/loadTemplates', data, { headers: this.headers });
  }

  newTicket(data){
    return this.http.post<any>(this.baseUrl + '/getTweetsPhoneID', data, {headers: this.headers});
  }

}
