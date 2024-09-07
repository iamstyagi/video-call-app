import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from "rxjs";
import { Message } from "primeng/api";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopbarService {

  constructor(private http: HttpClient) { }
  headers = { 'content-type': 'application/json' }
  baseUrl = environment.apiUrl;

  public setAgentLogin(agentLogout: any) {
    return this.http.post<any>(this.baseUrl + '/setAgentLogin', agentLogout, { 'headers': this.headers });
  }

  // public getsocialData(sourceTypes: any) {
  //   return this.http.get<any>(this.baseUrl + '/getsocialData' + '?sourceTypes=' + sourceTypes)
  // }

  // hitting in every 1 min
  public topbarRedis(paylaod: any) {
    return this.http.get<any>(this.baseUrl + '/topbarRedis?' + 'sourceTypes=' + paylaod.sourceTypes + '&campId=' + paylaod.campId + '&agentId=' + paylaod.agentId + '&Isdb=' + paylaod.Isdb)
  }

  // hitting in every 15 min
  // public topbar(campId: any, agentid) {
  //   return this.http.get<any>(this.baseUrl + '/topbar?' + 'campId=' + campId + '&' + 'agentId='+ agentid)
  // }
}
