import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormField } from '../../form-field';
import { Subject, throwError } from "rxjs";
import { Message } from "primeng/api";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomService {

  clientid = "2";
  callid = "";
  dispid = "";
  dispremarks = "";
  custremarks = "";
  otherremarks = "";
  cb = "";
  cbtime = "";
  cbassignedto = "";
  nxtaltnumtype = "0";
  dncl = "0";
  agentid = "";
  cb_altno = "";
  cb_altno_csv = "";
  cb_refno = "";



  constructor(private http: HttpClient) { 
    if(sessionStorage.getItem('myNewArrayValueSession') && sessionStorage.getItem('extn_set') != 'ACW'){
      this.loadFromSessionStorage()
    }
  }
  headers = { 'content-type': 'application/json' }
  baseUrl = environment.apiUrl;

  private mySubject =  new BehaviorSubject<string>(this.getValueFromSessionStorage());
  myObservable$ = this.mySubject.asObservable();

  private getValueFromSessionStorage(): string {
    return sessionStorage.getItem('myNewArrayValueSession'); // Provide a default if not found
  }
  getFormFields(dynaCustFieldData: any): Observable<FormField> {
    return this.http.post<FormField>(this.baseUrl + '/getdynacustfield', dynaCustFieldData, { 'headers': this.headers });
  }

  getLeadCustField(leadCustField: any) {
    return this.http.post<FormField>(this.baseUrl + '/getleadcustfield', leadCustField, { 'headers': this.headers });
  }


  getdisplevels(dispData: any) {
    return this.http.post<any>(this.baseUrl + '/getdisplevels', dispData, { 'headers': this.headers });
  }



  getCallHistoryData(data: any) {
    return this.http.post<any>(this.baseUrl + '/callhistory', data, { 'headers': this.headers })
  }


  getDispostionDropdown(data: any) {
    return this.http.post<any>(this.baseUrl + '/displist', data, { 'headers': this.headers })
  }


  public disposeCallApiwithoutTicket(payload: any) {
    var agentidsend
    var agentid = sessionStorage.getItem('agentId');
    var callback, displogout, NextAltNumberType, dispremarks, custfeedback, otherrems, assigntoid;
    if (payload.cb === true) {
      callback = 1;
    } else {
      callback = 0;
    }
    if (payload.disposenlogout === true) {
      displogout = 1;
    } else {
      displogout = 0;
    }
    if (!NextAltNumberType) {
      NextAltNumberType = 1;
    }
    if (!payload.dispremarks) {
      dispremarks = "";
    }
    if (!payload.custremarks) {
      custfeedback = "";
    }

    if (!payload.otherremarks) {
      otherrems = "";
    }
    if (!payload.cbassignedto) {
      assigntoid = "";
    }

    
if(payload.cbassignedto==="My Self"){
agentidsend=payload.agentid
}else{
agentidsend =0
}


   
    // let params = 'clientid=' + 0 + '&callid=' + this.call + '&dispid=' + payload.dispid + '&dispremarks=' + dispremarks + '&custremarks=' + custfeedback +
    //   '&otherremarks=' + otherrems + '&cb=' + callback + '&cbtime=' + payload.cbtime + '&cbassignedto=' + assigntoid + '&disposenlogout=' + displogout + '&nxtaltnumtype=' + NextAltNumberType +
    //   '&dncl=' + this.Dncl + '&agentid=' + payload.agentid + '&cb_altno=' + this.cb_Altno + '&cb_altno_csv=' + this.cb_Altno_csv + '&cb_refno=' + this.cb_Refno;

    let params = "%DisposeCall||0|" + payload.fld_phoneno + "|" + payload.agentid + "|" + dispremarks + "|" + payload.dispid + "||" + callback + "|" + payload.cbtime
      + "||0|||" + payload.campid + "|" + agentidsend + "|" + custfeedback + "|" + otherrems + "|0|" + NextAltNumberType + "||" + 0 + "||0|" + "|" + "|" + displogout + "|$"
    sessionStorage.setItem('disposeData', params);
    // return this.http.get<any>(this.baseUrl + '/' + 'disposeCall?' + params);

  }


  public disposeCallApi(selectedAssignedBy, selectedCallBack, payload: any) {
    // let params = 'clientid=' + this.client + '&callid=' + this.call + '&ticketTypeId=' + payload.ticketTypeId +
    //   '&cb=' + selectedCallBack + '&cbtime=' + payload.cbtime + '&cbassignedto=' + selectedAssignedBy + '&nxtaltnumtype=' + this.NextAltNumberType +
    //   '&dncl=' + this.Dncl + '&agentid=' + payload.agentid + '&cb_altno=' + this.cb_Altno + '&cb_altno_csv=' + this.cb_Altno_csv + '&cb_refno=' + this.cb_Refno
    //   + '&campID=' + payload.campid + '&dispid=' + payload.dispid;
    // return this.http.get<any>(this.baseUrl + '/' + 'disposeCall?' + params);

    var isDisposenlogout, agentid, dipsremark, dispid, iscb, cbtime, isdncl, Cbassignedto, Custremarks, Otherremaks, NextAltNumberType, isCb_altno, Callid, Cb_altno_csv
    var agentidsend

    if (!payload.agentid) {
      agentid = '';
    } else {
      agentid = payload.agentid
    }

    if (!payload.dipsremark) {
      dipsremark = '';
    } else {
      dipsremark = payload.dipsremark;

    }

    if (!payload.dispid) {
      dispid = '';
    } else {
      dispid = payload.dispid;

    }

    if (!payload.iscb) {
      iscb = '';
    } else {
      iscb = payload.iscb;

    }

    if (!payload.cbtime) {
      cbtime = '';
    } else {
      cbtime = payload.cbtime;

    }

    if (!payload.isdncl) {
      isdncl = '';
    } else {
      isdncl = payload.isdncl;

    }

    if (!payload.Cbassignedto) {
      Cbassignedto = '';
    } else {
      Cbassignedto = payload.Cbassignedto;

    }

    if (!payload.Custremarks) {
      Custremarks = '';
    } else {
      Custremarks = payload.Custremarks;

    }

    if (!payload.Otherremaks) {
      Otherremaks = '';
    } else {
      Otherremaks = payload.Otherremaks;

    }

    if (!payload.NextAltNumberType) {
      NextAltNumberType = '';
    } else {
      NextAltNumberType = payload.NextAltNumberType;

    }

    if (!payload.isCb_altno) {
      isCb_altno = '';
    } else {
      isCb_altno = payload.isCb_altno;

    }

    if (!payload.Callid) {
      Callid = '';
    } else {
      Callid = payload.Callid;

    }

    if (!payload.Cb_altno_csv) {
      Cb_altno_csv = '';
    } else {
      Cb_altno_csv = payload.Cb_altno_csv;

    }

    if (!payload.isDisposenlogout) {
      isDisposenlogout = false;
    } else {
      isDisposenlogout = payload.isDisposenlogout;

    }
  
    if(payload.Cbassignedto==="My Self"){
      agentidsend=payload.agentid
      }else{
      agentidsend =0
      }


    let params = "%DisposeCall|0|0|0|" + agentid + "|" + dipsremark + "|" + dispid + "||" + iscb + "|" + cbtime + "||" + isdncl + "||||" + agentidsend + "|" + Custremarks + "|" + Otherremaks + "|0|" + NextAltNumberType + "|" + isCb_altno + "|" + Callid + "||" + Cb_altno_csv + "||" + isDisposenlogout + "|$"
    sessionStorage.setItem('disposeData', params);
  }


  public get client(): string {
    return this.clientid;
  }
  public set client(val: string) {
    this.clientid = val;
  }
  public get call(): string {
    return this.callid;
  }
  public set call(val: string) {
    this.callid = val;
  }
  public get disp(): string {
    return this.dispid;
  }
  public set disp(val: string) {
    this.dispid = val;

  }
  public get dispremark(): string {
    return this.dispremarks;
  }
  public set dispremark(val: string) {
    this.dispremarks = val;
  }
  public get custremark(): string {
    return this.custremarks;
  }
  public set custremark(val: string) {
    this.custremarks = val;
  }
  public get otherremark(): string {
    return this.otherremarks;
  }
  public set otherremark(val: string) {
    this.otherremarks = val;
  }
  public get Cb(): string {
    return this.cb;
  }
  public set Cb(val: string) {
    this.cb = val;
  }
  public get cbTime(): string {
    return this.cbtime;
  }
  public set cbTime(val: string) {
    this.cbtime = val;
  }
  public get cbAssignedto(): string {
    return this.cbassignedto;
  }
  public set cbAssignedto(val: string) {
    this.cbassignedto = val;
  }
  public get NextAltNumberType(): string {
    return this.nxtaltnumtype;
  }
  public set NextAltNumberType(val: string) {
    this.nxtaltnumtype = val;
  }
  public get Dncl(): string {
    return this.dncl;
  }
  public set Dncl(val: string) {
    this.dncl = val;
  }
  public get agentId(): string {
    return this.agentid;
  }
  public set agentId(val: string) {
    this.agentid = val;

  }
  public get cb_Altno(): string {
    return this.cb_altno;
  }
  public set cb_Altno(val: string) {
    this.cb_altno = val;
  }
  public get cb_Altno_csv(): string {
    return this.cb_altno_csv;
  }
  public set cb_Altno_csv(val: string) {
    this.cb_altno_csv = val;
  }
  public get cb_Refno(): string {
    return this.cb_refno;
  }
  public set cb_Refno(val: string) {
    this.cb_refno = val;
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

  getPreviousTicketType(campID: any, ticketTypeID: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/previousList' + '?campID=' + campID + '&ticketTypeID=' + ticketTypeID);
  }


  saveTicketData(params: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/saveTicketFrom', params, { 'headers': this.headers })
  }


  getTicketHistoryData(campid: any, ticketid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/loadTicketHistoryRecords' + '?campid=' + campid + '&ticketid=' + ticketid);
  }


  getDynaTicket(params: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/getdynaticketfield', params, { 'headers': this.headers });
  }


  public onTicketSearch(Params: any) {
    return this.http.post<any>(this.baseUrl + '/search', Params, { 'headers': this.headers });
  }


  public onTabWiseSearch(Params: any) {
    return this.http.post<any>(this.baseUrl + '/ontabsearch', Params, { 'headers': this.headers });
  }

  public routeAccordingtoTicket(Params: any) {
    return this.http.post<any>(this.baseUrl + '/onClickSearchForm', Params, { 'headers': this.headers });
  }
  public returnJsonData(campid:any){
    return this.http.get<any>(this.baseUrl + '/gettickettype' + '?campID=' + campid + '&isall=' + true);

  }
  private loadFromSessionStorage() {
    // let dataSession = sessionStorage.getItem('myNewArrayValueSession');
    // // let myArray: any = dataSession;
    const storedValue = this.getValueFromSessionStorage();

    this.mySubject.next(storedValue);
 }
 updateData(newData: any) {
  let currentArray = this.mySubject.getValue();
  // currentArray.push(newData);
  // sessionStorage.setItem('myNewArrayValueSession', currentArray);
  this.mySubject.next(newData);
}
getData() {
  return this.mySubject.asObservable();
}
}


