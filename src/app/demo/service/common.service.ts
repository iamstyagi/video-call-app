import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormField } from '../../form-field';
import { Subject, Observable, throwError } from "rxjs";
import { Message } from "primeng/api";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  clientid = "";
  callid = "";
  dispid = "0";
  dispremarks = "";
  custremarks = "";
  otherremarks = "";
  cb = "0";
  cbtime = "";
  cb_altno = "0";
  cb_altno_csv = "";
  cb_refno = "";
  cbassignedto = "0";
  nxtnumtype = "0";
  dncl = "0";
  agentid = "";

  constructor(private http: HttpClient) { }
    headers = { 'content-type': 'application/json' }
    baseUrl = environment.apiUrl;

  disposeCallApi() {
    const header = new HttpHeaders({
      // "Postman-Token": "<calculated when request is sent>",
      // "Host": "<calculated when request is sent>",
      // "User-Agent": "PostmanRuntime/7.29.2",
      // "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      // "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
      // "Authorization": "Bearer ",
    });

  let params = 'clientid=' + this.client + '&callid=' + this.call + '&dispid=' + this.disp + '&dispremarks=' + this.dispremark + '&custremarks=' + this.custremark +
  '&otherremarks=' + this.otherremark + '&cb=' + this.Cb + '&cbtime=' + this.cbTime + '&cb_altno=' + this.cb_Altno + '&cb_altno_csv=' + this.cb_Altno_csv +
  '&cb_refno=' + this.cb_Refno + '&cbassignedto=' + this.cbAssignedto + '&nxtnumtype=' + this.nxtNumtype + '&dncl=' + this.Dncl + '&agentid=' + this.agentId;

  return this.http.get('http://192.168.68.20:8080/iCallMateWebSvc' + '/resources/DisposeCall?' + params);
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
  public get cbAssignedto(): string {
    return this.cbassignedto;
  }
  public set cbAssignedto(val: string) {
    this.cbassignedto = val;
  }
  public get nxtNumtype(): string {
    return this.nxtnumtype;
  }
  public set nxtNumtype(val: string) {
    this.nxtnumtype = val;
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
}
