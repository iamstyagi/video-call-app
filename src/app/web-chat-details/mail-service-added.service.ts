import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
// import { Mail } from 'src/app/model/mail';
import { Mail } from 'src/app/model/mail'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormField } from 'src/app/form-field';
@Injectable({
  providedIn: 'root'
})
export class MailServiceAddedService {


  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl = environment.apiUrl
  private _mails: Mail[] = [];
  private mails = new BehaviorSubject<Mail[]>(this._mails);
  mails$ = this.mails.asObservable();
  private detailsSubject = new BehaviorSubject<any>(null);
  public details$ = this.detailsSubject.asObservable();
  private mailUpdate = new Subject();
  private outbox = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {
      // this.http.get<any>('assets/demo/data/mail.json')
      //     .toPromise()
      //     .then(res => res.data as Mail[])
      //     .then(data => {
      //         this.updateMails(data);
      //     });
  }
  
  
  getEmailData(data: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/getEmailData', data, { 'headers': this.headers })
  }
  
  getRowData(data: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/onRowSelectInbox', data, { 'headers': this.headers })
  }
  
  getSignature(data:any):Observable<any>{
      return this.http.post<any>(this.baseUrl + '/loadsmtplist', data, { 'headers': this.headers })
  }
  
  composeEmail(campID: any): Observable<any> {
      const apiUrl = `${this.baseUrl}/newEmail?campID=${campID}`;
      return this.http.get<any>(apiUrl);
  }
  
  saveComposeEmail(data: any): Observable<any>{
      return this.http.post<any>(this.baseUrl + '/saveEmailData', data, { headers: this.headers })
  }
  
  shareComposeEmail1(detail: any) {
      this.detailsSubject.next(detail); // Update the BehaviorSubject with the new details
  }
  
  statusOptions(){
      return this.http.get(this.baseUrl + '/getticketstatus');
  }
  
  saveTickets(data){
      return this.http.post<any>(this.baseUrl + '/saveTicketFrom', data, { headers: this.headers })
  }
  
  getTicketHistory(data){
      return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords?campid='+ data.campID + '&' + 'ticketid=' + data.ticketID)
  }
  
  sendSpam(data){
      return this.http.post<any>(this.baseUrl + '/sendSpam', data, { headers: this.headers })
  }
  
  emailUpdateSend(){
      this.mailUpdate.next()
  }
  
  emailUpdateReceive(){
      return this.mailUpdate.asObservable();
  }
  
  
  hideShowOutbod(index){
      this.outbox.next(index)
  }
  
  showOutbox(){
      return this.outbox.asObservable();
  }
  
  
  updateMails(data: Mail[]) {
      this._mails = data;
      this.mails.next(data);
  }
  
  onStar(id: number) {
      this._mails = this._mails.map(m => m.id === id ? ({ ...m, starred: !m.starred }) : m);
      this.mails.next(this._mails);
  }
  
  onArchive(id: number) {
      this._mails = this._mails.map(m => m.id === id ? ({ ...m, archived: !m.archived }) : m);
      this.mails.next(this._mails);
  }
  
  onBookmark(id: number) {
      this._mails = this._mails.map(m => m.id === id ? ({ ...m, important: !m.important }) : m);
      this.mails.next(this._mails);
  }
  
  onDelete(id: number) {
      this._mails = this._mails.filter(m => m.id !== id);
      this.mails.next(this._mails);
  }
  
  onDeleteMultiple(mails: Mail[]) {
      let idArray = mails.map(m => Number(m.id));
      this._mails = this._mails.filter(m => idArray.indexOf(m.id) == -1);
      this.mails.next(this._mails);
  }
  
  onArchiveMultiple(mails: Mail[]) {
      let idArray = mails.map(m => m.id);
  
      for (let i = 0; i < this._mails.length; i++) {
          let mail = this._mails[i];
  
          if (idArray.indexOf(mail.id) !== -1) {
              mail.archived = true;
              this._mails[i] = mail;
          }
      }
  
      this.mails.next(this._mails);
  }
  
  onSpamMultiple(mails: Mail[]) {
      let idArray = mails.map(m => m.id);
  
      for (let i = 0; i < this._mails.length; i++) {
          let mail = this._mails[i];
  
          if (idArray.indexOf(mail.id) !== -1) {
              mail = { ...mail, spam: true, important: false, starred: false, archived: false };
              this._mails[i] = mail;
          }
      }
  
      this.mails.next(this._mails);
  }
  
  onTrash(id: number) {
      this._mails = this._mails.map(m => m.id === id ? ({ ...m, trash: true }) : m);
      this.mails.next(this._mails);
  }
  
  onSend(mail: Mail) {
      if (!mail.id) {
          mail.id = this.generateId();
      }
      if (!mail.title) {
          mail.title = 'Untitled';
      }
  
      mail.date = this.generateDate();
      this._mails.push(mail);
      this.mails.next(this._mails);
  }
  
  
  generateId() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
  
      return text;
  }
  
  generateDate() {
      return new Date().toDateString().split(' ').slice(1, 4).join(' ');
  }
  
  
  getDownloadLinkOfImage(params:any):Observable<any>{
      return this.http.post<any>(this.baseUrl + '/downloadEmailFiles' , params, { headers: this.headers } )
  }
  
  
  onFileUpload(file:any,campid):Observable<any>{
      
      
      let headers = new HttpHeaders();
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
          formData.append('file', file[i], file[i].name)
        }
        formData.append('campid',campid)
      return this.http.post<any>(this.baseUrl + '/emailAttachment', formData, { headers });
     
  }
  
  getsmtpId(campID:any):Observable<any>{
      return this.http.get<any>(this.baseUrl + '/newEmail' + '?campID=' +campID);
  }
  
  
  getSearchData(params:any):Observable<any>{
      // return this.http.post<any>('http://192.168.68.170:8090/icallmate-ucp-api-ucp' + '/getEmailSearchData' ,params,{ headers: this.headers } )
      return this.http.post<any>(this.baseUrl + '/getEmailSearchData' ,params,{ headers: this.headers } )
  }
  
  
  
  getTemplateData(params:any):Observable<any>{
      // return this.http.post<any>( 'http://192.168.68.202:8090/icallmate-ucp-api-ucp' + '/loadTemplates' ,params,{ headers: this.headers } )
      return this.http.post<any>( this.baseUrl + '/loadTemplates' ,params,{ headers: this.headers } )
  }
  
  getemailList(camp, smtpid){
      return this.http.get<any>(this.baseUrl + '/getemailList'+'?camp='+camp+'&smtpid='+smtpid)
  }
  getTicketInfo(params:any){
      return this.http.post<any>(this.baseUrl + '/loadTicketRecords', params,{'headers': this.headers})
    }
    getTicketStatus(data: any) {
      return this.http.get<any>(this.baseUrl + '/getticketstatus')
    }
  
  
    getTicketType(campid: any) {
      return this.http.get<any>(this.baseUrl + '/gettickettype' + '?campID=' + campid)
    }
    getNextTicketType(campID: any, ticketTypeID: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/nextList' + '?campID=' + campID + '&ticketTypeID=' + ticketTypeID);
    }
    getDynaTicket(params: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/getdynaticketfield', params, { 'headers': this.headers });
    }
    getTicketHistoryData(campid: any, ticketid: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords' + '?campid=' + campid + '&ticketid=' + ticketid);
    }
    getTicketHistoryDataa(params:any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/loadTicketRecords', params,{'headers': this.headers})
      // return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords' + '?campid=' + campid + '&refvalue=' + ticketid);
    }
    getLeadCustField(leadCustField: any) {
      return this.http.post<FormField>(this.baseUrl + '/getleadcustfield', leadCustField, { 'headers': this.headers });
    }
    saveTicketData(params: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/saveTicketFrom', params, { 'headers': this.headers })
    }
  
    getFormFields(dynaCustFieldData: any):Observable<FormField> {
      return this.http.post<FormField>(this.baseUrl + '/getdynacustfield', dynaCustFieldData, { 'headers': this.headers });
    }
}
