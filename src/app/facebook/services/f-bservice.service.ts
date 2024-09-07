import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { FormField } from 'src/app/form-field';

@Injectable({
  providedIn: 'root'
})
export class FBserviceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getDataofLabels(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/getFBData', data, { headers: this.headers });
  }

  // postAssigning(data): Observable<any>{
  //   return this.http.post<any>(this.baseUrl + '/assignFBPost', data, { headers: this.headers });
  // }

  onRowFBSelectInbox(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/onRowFBSelectInbox', data, { headers: this.headers });
  }

  saveFBData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/saveFBData', data, { headers: this.headers });
  }

  loadTicketHistoryRecords(campid, ticketid) {
    return this.http.get(this.baseUrl + '/loadTicketHistoryRecords' + '?' + 'campid=' + campid + '&' + 'ticketid=' + ticketid)
  }

  saveTickets(data) {
    return this.http.post<any>(this.baseUrl + '/saveTicketFrom', data, { headers: this.headers })
  }

  assignFBPost(data) {
    return this.http.post<any>(this.baseUrl + '/assignFBPost', data, { headers: this.headers })
  }

  getFBDetails(campid: any) {
    return this.http.post<any>(this.baseUrl + '/getFBDetails', campid, { headers: this.headers })
  }

  onFileUpload(file: any, campid:any): Observable<any> {


    let headers = new HttpHeaders();
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i], file[i].name)
    }
    return this.http.post<any>(this.baseUrl + '/uploadFileFB'+'?campID='+campid, formData, { headers });

  }


  uploadFile(file: any, campid): Observable<any> {
    let headers = new HttpHeaders();
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i], file[i].name)
    }
    return this.http.post(this.baseUrl + '/uploadFileInsta'+'?campID='+campid, formData, { headers });
    // return this.http.post(this.baseUrl + '/uploadFileInsta', data,{ headers: this.headers });
  }

  saveInstaData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/sendNewPost', data, { headers: this.headers });

    // return this.http.post(this.baseUrl + '/saveFBData', data, { headers: this.headers });
  }


  getUsername(campid): Observable<any>{
    return this.http.get(this.baseUrl + '/getaccountName'+'?campId='+campid)
  }

  // ticket apis
  
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
getLeadCustField(leadCustField: any) {
  return this.http.post<FormField>(this.baseUrl + '/getleadcustfield', leadCustField, { 'headers': this.headers });
}
saveTicketData(params: any): Observable<any> {
  return this.http.post<any>(this.baseUrl + '/saveTicketFrom', params, { 'headers': this.headers })
}

getFormFields(dynaCustFieldData: any):Observable<FormField> {
  return this.http.post<FormField>(this.baseUrl + '/getdynacustfield', dynaCustFieldData, { 'headers': this.headers });
}


// ticket data
getTicketHistory(data){
  return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords?campid='+ data.campID + '&' + 'ticketid=' + data.ticketID)
}

getCustomFieldDetails(campid,schlcode,count){
  return this.http.get<any>(this.baseUrl + '/loadCustFieldvalue'+'?campId='+campid+'&searchvalue='+schlcode+'&count='+count)
}

}
