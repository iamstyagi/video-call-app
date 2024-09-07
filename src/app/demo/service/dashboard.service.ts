import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from "rxjs";
import { Message } from "primeng/api";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  headers = { 'content-type': 'application/json' }
  baseUrl = environment.apiUrl;
  baseUrlWeb = environment.webChatBaseUrl;


  public getDashboardList(params: any) {
    return this.http.post<any>(this.baseUrl + '/getlistDashboard', params, { 'headers': this.headers });
  }


  public getTicketType(params: any) {
    return this.http.post<any>(this.baseUrl + '/getTicketTypeList', params, { 'headers': this.headers });
  }

  public getTicketHistoryData(params: any) {
    return this.http.post<any>(this.baseUrl + '/getloadTicketStatusRecords', params, { 'headers': this.headers });
  }

  public getTicketTypeWise(params: any) {
    return this.http.post<any>(this.baseUrl + '/showTicketTypWise', params, { 'headers': this.headers });
  }

  
  public getagentaprdetails(agentAprDetails: any) {
    return this.http.post<any>(this.baseUrl + '/getagentaprdetails', agentAprDetails, { 'headers': this.headers });
  }


  public redirectTicketStatusWise(Params:any){
    return this.http.post<any>(this.baseUrl + '/clickTicketStatus', Params, { 'headers': this.headers });
  }
  public getDashboardSummary(params: any) {
    // 
    return this.http.post<any>(this.baseUrl + '/getDashBoardData', params , { 'headers': this.headers });
  }
  public getParentDispositionDetails(campId : any) {
    return this.http.get<any>(this.baseUrl + '/getParentDisposition' +'?campId='+campId );
}
public getSubDispoitionId(campId : any,parentsubid:any) {
  return this.http.get<any>(this.baseUrl + '/getChildDisposition' +'?campId='+campId + '&parentDispID='+parentsubid);
}
public getAgentData(data: any) {
  return this.http.post<any>(this.baseUrl + '/getAgentSummary', data, { 'headers': this.headers });
}

public getWebCatDetailsAgentWise(data:any){
  return this.http.post<any>(this.baseUrlWeb + 'getDashBoardDetails', data, { 'headers': this.headers })
}
}
