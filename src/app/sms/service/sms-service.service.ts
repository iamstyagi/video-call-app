import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsServiceService {
  baseUrl = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  sharedNumber = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  shareMobileNumber(number){
    this.sharedNumber.next(number);
  }

  getSMSContacts(data){
    return this.http.post(this.baseUrl + '/getSMSContacts', data, { headers: this.headers })
  }

  loadSMSChat(number){
    return this.http.post(this.baseUrl + '/loadSMSChat', number, { headers: this.headers });
  }

  sendSMSMsg(data){
    return this.http.post(this.baseUrl + '/sendSMSMsg', data, { headers: this.headers });
  }

}
