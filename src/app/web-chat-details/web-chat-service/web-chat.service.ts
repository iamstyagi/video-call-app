import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebChatService {
  socket: io.Socket;
  // url = 'http://192.168.68.56:8080'
  webChatSocketUrl = environment.webChatSocketUrl
  // baseUrl = 'http://192.168.68.56:8091/ChatApi/'
  webChatBaseUrl = environment.webChatBaseUrl
  // url = 'http://192.168.68.199:8080'
  // baseUrl = 'http://192.168.68.199:8079/ChatApi/'
  agentIDGet:any
  campId:any
  baseUrl1 = environment.apiUrl;
  headers = { 'content-type': 'application/json' }
  loginData:any
  constructor(private http: HttpClient,private httpClient: HttpClient) {
  this.loginData = JSON.parse((localStorage.getItem("loginData")));

    // this.socket = io('http://localhost:3000'); // Replace with your server URL
   this.agentIDGet = sessionStorage.getItem('agentId')
   this.campId = 190
  // this.campId = this.loginData.value[0].campid;
  //  this.requestPermission();
  //  this.campId = sessionStorage.getItem('getDynamicFormFieldsCache')
  }
  connectSocket(){
    this.socket = io.connect(this.webChatSocketUrl, { path: '/webchat'});
    this.socket.on('chatting', (message) => {
    });
  }
  sendMessage(message: any,event:any) {
    this.socket.emit(event, message);
  }
 
   //----Save Excel Contact Data--------------------//
    saveFile(file,newData): Observable<any> {
    let headers = new HttpHeaders();
    const formData = new FormData();
    // formData.append('content', content);
    if (file != null && file.name != null) {
      formData.append('file', file, file.name);
    }
    formData.append('content', newData);

    return this.http.post<any>(`${this.webChatBaseUrl}imageUpload`, formData, { headers });
  }
  uploadFile(file: any,newData:any): Observable<any> {
    let headers = new HttpHeaders();
       const formData = new FormData();
       for (let i = 0; i < file.length; i++) {
           formData.append('file', file[i], file[i].name)
       }
      // if (file != null && file.name != null) {
      //   formData.append('file', file, file.name);
      // }
    formData.append('content', newData);

   return this.http.post(`${this.webChatBaseUrl}imageUpload`, formData,{ headers });
  //  return this.http.post('http://192.168.68.56:8091/ChatApi/imageUpload', formData,{ headers });
   // return this.http.post(this.baseUrl + '/uploadFileInsta', data,{ headers: this.headers });
 }
  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(this.agentIDGet, (data: any) => {
        observer.next(data);
      });
    });
  }
  receiveMessageCustomerDetails(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(`${this.agentIDGet}${this.campId}`, (data: any) => {
        observer.next(data);
      });
    });
  }
  receiveMessageCustomerDetailsNew(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on("0", (data: any) => {
        observer.next(data);
      });
    });
  }
  getCustomerNoDetails(data){
    let headers = new HttpHeaders();
    // return this.http.post('http://192.168.68.56:8091/ChatApi/getAssignNumber', data,{ headers });
    return this.http.post(`${this.webChatBaseUrl}getAssignNumber`, data,{ headers });

  }
  saveCustomerFieldValue(data){
    return this.httpClient.post<any>(`${this.webChatBaseUrl}saveCustomerDetails`,data)
  }

  getCampDeatils(campID: any) {
    // Construct the parameters
    // let params = new HttpParams().set('campaignId', campID);

    // Make the HTTP GET request with the parameters
    return this.httpClient.get<any>(`${this.webChatBaseUrl}getCustomerDetails?campaignId=${campID}`);
    // return this.httpClient.get<any>(`${this.apiUrl}getCustomerDetails`, { params: params });
  }


  saveDetailsCustomer(data){
    return this.httpClient.post<any>(`${this.webChatBaseUrl}checkExistanceCustomer`,data)
  }

  getTemplates(){
    return this.httpClient.get<any>(`${this.webChatBaseUrl}getTemplateDetails`);

  }
  getPhoneBookDetails(){
    return this.httpClient.get<any>(`${this.webChatBaseUrl}getPhoneBook?campId=${this.campId}`);
  }

  sendmessage(data): Observable<any> {
    return this.http.post<any>(this.baseUrl1 + '/sendWhatsAppMsg', data, { headers: this.headers })
  }
  public getLocationContacts(data){
    return this.http.post<any>(this.baseUrl1+ '/loadLocationContactList',data, { headers: this.headers });
  }

  getContactsDetails(params:any):Observable<any>{
    return this.http.get<any>(this.baseUrl1 + `/getContacts?rowId=${params}`, { headers: this.headers } )
}
public getContacts(data){
  return this.http.post<any>(this.baseUrl1 + '/loadContactList', data, { headers: this.headers });
}
requestPermission() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, options);
    notification.onclick = (event) => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      // window.open('http://stackoverflow.com/a/13328397/1269037', '_blank');
    };
  }
}
getFaqDeatisl(data){
  return this.http.post<any>(this.baseUrl1+ '/getFAQ',data, { headers: this.headers });
}
sendSMSAPI(data){
  return this.http.post<any>(this.baseUrl1+ '/getSendSMS',data, { headers: this.headers });
}
sendBusinessContacs(data){
  return this.http.post<any>(this.baseUrl1+ '/getSendContact',data, { headers: this.headers });
}
}
