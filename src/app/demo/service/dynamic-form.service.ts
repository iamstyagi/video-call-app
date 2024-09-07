import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from "rxjs";
import { Message } from "primeng/api";
import { FormField } from '../../form-field';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private http: HttpClient) { }
  headers = { 'content-type': 'application/json' }
  baseUrl = environment.apiUrl;
  private mailUpdate = new Subject();

  // getFormFields(): Observable<FormField> {
  //   return this.http.get<FormField>('assets/formFields.json');
  // }

  getFormFields(dynaCustFieldData: any):Observable<FormField> {
    return this.http.post<FormField>(this.baseUrl + '/getdynacustfield', dynaCustFieldData, { 'headers': this.headers });
  }

  getLeadCustField(leadCustField: any) {
    return this.http.post<FormField>(this.baseUrl + '/getleadcustfield', leadCustField, { 'headers': this.headers });
  }

  getTicketInfo(params:any){
    return this.http.post<any>(this.baseUrl + '/loadTicketRecords', params,{'headers': this.headers})
  }
  getSignature(data:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/loadsmtplist', data, { 'headers': this.headers })
}
saveComposeEmail(data: any): Observable<any>{
  return this.http.post<any>(this.baseUrl + '/saveEmailData', data, { headers: this.headers })
}

emailUpdateSend(){
  this.mailUpdate.next()
}
emailUpdateReceive(){
  return this.mailUpdate.asObservable();
}
getTemplateData(params:any):Observable<any>{
  // return this.http.post<any>( 'http://192.168.68.202:8090/icallmate-ucp-api-ucp' + '/loadTemplates' ,params,{ headers: this.headers } )
  return this.http.post<any>( this.baseUrl + '/loadTemplates' ,params,{ headers: this.headers } )
}
onFileUpload(file:any,camp:any):Observable<any>{
    
    
  let headers = new HttpHeaders();
  const formData = new FormData();
  for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i], file[i].name)
    }
    formData.append('campid', camp)
  return this.http.post<any>(this.baseUrl + '/emailAttachment', formData, { headers });
 
}
getsmtpId(campID:any):Observable<any>{
  return this.http.get<any>(this.baseUrl + '/newEmail' + '?campID=' +campID);
}
getemailList(camp, smtpid){
  return this.http.get<any>(this.baseUrl + '/getemailList'+'?camp='+camp+'&smtpid='+smtpid)
}

getCustomFieldDetails(campid,schlcode,count){
  return this.http.get<any>(this.baseUrl + '/loadCustFieldvalue'+'?campId='+campid+'&searchvalue='+schlcode+'&count='+count)

  // return this.http.post<any>( this.baseUrl + '/loadCustFieldvalue' ,params,{ headers: this.headers } )
}
sendSMSAPI(data){
  return this.http.post<any>(this.baseUrl+ '/getSendSMS',data, { headers: this.headers });
}

sendWebChatInvite(number){
  let SendNumber = `91${number}`
  let url = `https://api.voicensms.in/SMSAPI/webresources/CreateSMSCampaignPost`
  let  data1 ='https://bit.ly/3MuLKNg'
  let data = {
      "filetype":2,
      "msisdn":[SendNumber],
      "language":0,
      "credittype":7,
      "senderid":"GOMRKT",
      "templateid":0,
      "message":`Your OTP is ${data1} Team Go2Market`,
      "ukey":"Dexo51JUYRarejnRPUTHMydap",
      "isrefno":true
  }
  return this.http.post<any>(url,data, { headers: this.headers });

}
}
