import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormField } from 'src/app/form-field';


@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }


  //-------------------------------get Table Data Instagram ------------------------------------//
  getTableData(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/getInstaData', data, { headers: this.headers });
  }

 //-------------------------------------on Click of Row of Insta----------------------------------//
  onRowSelectInsta(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/onRowInstaSelectInbox', data, { headers: this.headers });
  }


  //--------------------------------------comment API------------------------------------------//
  sendComment(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/sendComment', data, { headers: this.headers });
  }

// ticket data
getTicketHistory(data){
  return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords?campid='+ data.campID + '&' + 'ticketid=' + data.ticketID)
}
getFormFields(dynaCustFieldData: any):Observable<FormField> {
  return this.http.post<FormField>(this.baseUrl + '/getdynacustfield', dynaCustFieldData, { 'headers': this.headers });
}
getCustomFieldDetails(campid,schlcode,count){
  return this.http.get<any>(this.baseUrl + '/loadCustFieldvalue'+'?campId='+campid+'&searchvalue='+schlcode+'&count='+count)
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
getTicketInfo(params:any){
  return this.http.post<any>(this.baseUrl + '/loadTicketRecords', params,{'headers': this.headers})
}
getTicketType(campid: any) {
  return this.http.get<any>(this.baseUrl + '/gettickettype' + '?campID=' + campid)
}
getTicketStatus(data: any) {
  return this.http.get<any>(this.baseUrl + '/getticketstatus')
}

getNextTicketType(campID: any, ticketTypeID: any): Observable<any> {
  return this.http.get<any>(this.baseUrl + '/nextList' + '?campID=' + campID + '&ticketTypeID=' + ticketTypeID);
}
}
